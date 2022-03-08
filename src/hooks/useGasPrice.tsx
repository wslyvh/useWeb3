import { getDefaultProvider } from '@ethersproject/providers'
import { formatUnits } from '@ethersproject/units'
import { useEffect, useState } from 'react'
import { useInterval } from './useInterval'

export function useGasPrice(interval: number = 15000) {
  const [price, setPrice] = useState<number>(0)

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

      if (feeData && feeData.maxFeePerGas) {
        const price = Math.round(Number(formatUnits(feeData.maxFeePerGas, "gwei")))
        setPrice(price)
      }
    } catch (e) {
      // Unable to fetch fee data
    }
  }

  return price
}
