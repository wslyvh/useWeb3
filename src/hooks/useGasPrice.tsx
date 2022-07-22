import { getDefaultProvider } from '@ethersproject/providers'
import { formatUnits } from '@ethersproject/units'
import { useEffect, useState } from 'react'
import { useInterval } from './useInterval'

export function useGasPrice(interval: number = 15000) {
  const [gasPrice, setGasPrice] = useState<number>(0)
  const [priorityFee, setPriorityFee] = useState<number>(0)

  useEffect(() => {
    async function asyncEffect() {
      await trySetPrice()
    }

    asyncEffect()
  }, [])

  useInterval(async () => {
    await trySetPrice()
  }, interval)

  async function trySetPrice() {
    try {
      const provider = getDefaultProvider()
      const feeData = await provider.getFeeData()

      if (feeData.maxFeePerGas && feeData.maxPriorityFeePerGas) {
        const gasPrice = Math.round(Number(formatUnits(feeData.maxFeePerGas, 'gwei')))
        const priorityFee = Math.round(Number(formatUnits(feeData.maxPriorityFeePerGas, 'gwei')) * 10) / 10

        setGasPrice(gasPrice)
        setPriorityFee(priorityFee)
      }
    } catch (e) {
      // Unable to fetch fee data
    }
  }

  return { gasPrice, priorityFee }
}
