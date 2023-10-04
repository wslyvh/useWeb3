import { formatUnits } from '@ethersproject/units'
import { useEffect, useState } from 'react'
import { useInterval } from './useInterval'
import { GetRpcProvider } from 'utils/providers'
import { getDefaultProvider } from '@ethersproject/providers'

export function useGasPrice(network: string = '', interval: number = 12000) {
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
      const provider = !network ? getDefaultProvider() : GetRpcProvider(network as any)
      const feeData = await provider.getFeeData()
      console.log('FEE DATA', feeData)

      if (feeData.gasPrice && feeData.maxPriorityFeePerGas) {
        const gasPrice = Math.round(Number(formatUnits(feeData.gasPrice, 'gwei')) * 100) / 100
        const priorityFee = Math.round(Number(formatUnits(feeData.maxPriorityFeePerGas, 'gwei')) * 10) / 10

        setGasPrice(gasPrice)
        setPriorityFee(priorityFee)
      }
    } catch (e) {
      console.log('ERROR', e)
      console.log('UNABLE TO FETCH')
      // Unable to fetch fee data
    }
  }

  return { gasPrice, priorityFee }
}
