import * as dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { getMin, getMax, getAverage, getMedian, toRoundedGwei, getEthPrice } from 'utils/gas'
import { GasFee } from 'types/gas'
import { GetRpcProvider } from 'utils/providers'

dotenv.config()

const defaultBlockLimit = 10
export type NETWORKS = 'mainnet' | 'polygon' | 'optimism' | 'arbitrum'

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.warn('SUPABASE_URL or SUPABASE_KEY env variables are not set.')
}

if (!process.env.INFURA_KEY) {
  console.warn('INFURA_KEY env variable is not set.')
}

if (!process.env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
  console.warn('NEXT_PUBLIC_ALCHEMY_API_KEY env variable is not set.')
}

export async function Index(network: NETWORKS = 'mainnet') {
  console.log(`[${network}] Start indexing..`)

  const db = CreateDbClient()
  const provider = GetRpcProvider(network)

  const currentBlock = await provider.getBlockNumber()
  const lastProcessedBlock = await db.from(network).select('*').order('blockNr', { ascending: false }).limit(1)
  const runUntil =
    lastProcessedBlock.data && lastProcessedBlock.data.length > 0 ? lastProcessedBlock.data[0].blockNr : null || currentBlock - defaultBlockLimit
  console.log(`[${network}] Process blocks # ${runUntil} / ${currentBlock}`)

  let blockNr = currentBlock
  while (blockNr >= runUntil) {
    console.log(`[${network}] # ${blockNr}`)

    const block = await provider.getBlockWithTransactions(blockNr)
    const fees = block.transactions.map((i) => toRoundedGwei(i.maxFeePerGas)).filter((i) => i > 0)
    const ethPrice = await getEthPrice()

    const record = {
      blockNr: block.number,
      baseFee: toRoundedGwei(block.baseFeePerGas),
      gasLimit: block.gasLimit.toNumber(),
      gasUsed: block.gasUsed.toNumber(),
      txCount: block.transactions.length,
      min: getMin(fees),
      max: getMax(fees),
      avg: getAverage(fees),
      median: getMedian(fees),
      ethPrice: ethPrice,
    }

    // console.log(`[${network}] Add to db`, record)
    const response = await db.from(network).upsert([record])
    if (response.error) {
      console.log(`[${network}] Unable to save block # ${blockNr}`, record)
      throw new Error(response.error.message)
    }

    blockNr--
  }

  console.log(`[${network}] Completed.`)
  return
}

export async function Cleanup(network: NETWORKS = 'mainnet') {
  console.log(`[${network}] Start cleanup..`)

  const db = CreateDbClient()
  try {
    // delete all records where created_at is older than 14 days
    const since = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
    console.log(`[${network}] Delete records older than ${since}`)
    const { data, error } = await db.from(network).delete().lte('created_at', since)

    if (error) {
      console.error('Error:', error)
      throw new Error(error.message)
    }

    console.log('Data deleted!')
    return data
  } catch (error) {
    console.error('Error:', error)
  }
}

export async function GetGasData(network: NETWORKS = 'mainnet') {
  console.log('Get GasData', network)
  const daily = await GetAverage('day', 1, network)
  const hourly = await GetAverage('hour', 24, network)

  if (!daily || daily.length === 0) {
    throw new Error('Unable to fetch daily average')
  }
  if (!hourly || hourly.length === 0) {
    throw new Error('Unable to fetch hourly average')
  }

  return {
    lastDay: daily[0],
    lastHour: hourly[0],
    fees: hourly,
  }
}

export async function GetAverage(period: 'hour' | 'day', limit: number = 24, network: NETWORKS = 'mainnet') {
  console.log(`[${network}] Get average by ${period}`)

  const db = CreateDbClient()

  try {
    const { data, error } = await db.from(`gasdata_${network}_${period}`).select('*').limit(limit)

    if (error) {
      console.error('Error:', error)
      throw new Error(error.message)
    }

    return data as GasFee[]
  } catch (error) {
    console.error('Error:', error)
  }
}

export function CreateDbClient() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    throw new Error('SUPABASE_URL or SUPABASE_KEY env variables are not set.')
  }

  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
}
