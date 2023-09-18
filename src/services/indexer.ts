import * as dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { getMin, getMax, getAverage, getMedian, toRoundedGwei, getEthPrice } from 'utils/gas'

dotenv.config()

const defaultBlockLimit = 10
type NETWORKS = 'mainnet' | 'polygon' | 'optimism' | 'arbitrum'

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.warn('SUPABASE_URL or SUPABASE_KEY env variables are not set.')
}

if (!process.env.INFURA_KEY) {
  console.warn('INFURA_KEY env variable is not set.')
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

  return
}

export function CreateDbClient() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    throw new Error('SUPABASE_URL or SUPABASE_KEY env variables are not set.')
  }

  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
}

export function GetRpcProvider(network: NETWORKS = 'mainnet') {
  if (!process.env.INFURA_KEY) {
    throw new Error('INFURA_KEY env variable is not set.')
  }

  if (network === 'arbitrum') {
    return new StaticJsonRpcProvider(`https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_KEY}`)
  }
  if (network === 'optimism') {
    return new StaticJsonRpcProvider(`https://optimism-mainnet.infura.io/v3/${process.env.INFURA_KEY}`)
  }
  if (network === 'polygon') {
    return new StaticJsonRpcProvider(`https://polygon-mainnet.infura.io/v3/${process.env.INFURA_KEY}`)
  }

  return new StaticJsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`)
}
