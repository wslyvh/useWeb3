import { useEffect, useState } from 'react'
import { useInterval } from './useInterval'

export function useEtherPrice() {
  const [price, setPrice] = useState<number>(0)

  useEffect(() => {
    async function asyncEffect() {
      await trySetPrice()
    }

    asyncEffect()
  }, [])

  useInterval(async () => {
    console.log('Updating price', price)
    await trySetPrice()
  }, 30000)

  async function trySetPrice() {
    try {
      const response = await fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
      const body = await response.json()
      setPrice(body.USD)
      return
    } catch (e) {
      // Unable to fetch price from cryptocompare..
    }

    try {
      const response = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=ETH')
      const body = await response.json()
      setPrice(body.data.rates.USDC)
      return
    } catch (e) {
      // Unable to fetch price from coinbase..
    }
  }

  return price
}
