import fetch from 'cross-fetch'
import { formatUnits } from '@ethersproject/units'

export function toRoundedGwei(value: any) {
  return Math.round(Number(formatUnits(value ?? 0, 'gwei')) * 100) / 100
}

export function getMin(numbers: Array<number>) {
  if (numbers.length === 0) return 0

  return numbers.sort((a, b) => a - b)[0]
}

export function getMax(numbers: Array<number>) {
  if (numbers.length === 0) return 0

  return numbers.sort((a, b) => b - a)[0]
}

export function getAverage(numbers: Array<number>) {
  return Math.round((numbers.reduce((a, b) => a + b) / numbers.length) * 100) / 100
}

export function getMedian(numbers: Array<number>) {
  let middle = Math.floor(numbers.length / 2)
  numbers = [...numbers].sort((a, b) => a - b)
  return numbers.length % 2 !== 0 ? numbers[middle] : (numbers[middle - 1] + numbers[middle]) / 2
}

export async function getEthPrice() {
  try {
    const response = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=ETH')
    const body = await response.json()

    if (body.data.rates.USD) {
      return body.data.rates.USD
    }
  } catch (e) {
    console.log('Unable to fetch price from coinbase..')
  }

  try {
    const response = await fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
    const body = await response.json()

    if (body.USD) {
      return body.usdPrice
    }
  } catch (e) {
    console.log('Unable to fetch price from cryptocompare..')
  }

  return -1
}
