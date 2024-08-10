import { GasFee } from 'types/gas'

export type NETWORKS = 'mainnet' | 'polygon' | 'optimism' | 'arbitrum' | 'base'

export async function GetGasData(network: NETWORKS = 'mainnet') {
  console.log('Get GasData', network)

  try {
    const res = await fetch(`https://www.ethgastracker.com/api/gas/history/${network}?apiKey=${process.env.ETHGAS_API_KEY}`)
    const body = await res.json()
    const blocks = body.data.blocks
    const average = blocks.map((i: GasFee) => i.baseFee).reduce((a: number, b: number) => a + b, 0) / blocks.length

    return {
      lastHour: Math.round(average * 100) / 100,
      fees: body.data.blocks,
    }
  } catch (error) {
    console.error('Error:', error)
  }

  return {
    lastHour: 0,
    fees: [],
  }
}

export async function GetAverage(period: 'hour' | 'day', limit: number = 24, network: NETWORKS = 'mainnet') {
  console.log(`[${network}] Get average by ${period}`)

  try {
    const res = await fetch(`https://www.ethgastracker.com/api/gas/average/${network}?apiKey=${process.env.ETHGAS_API_KEY}`)
    const body = await res.json()
    return body.data.data
  } catch (error) {
    console.error('Error:', error)
  }
}
