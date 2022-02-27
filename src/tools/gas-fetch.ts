import * as dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { JsonRpcProvider } from '@ethersproject/providers'

dotenv.config()

console.log('Collect latest gas prices')
run()

type GasPrice = {
  id: number
  baseFee: number
  prioritySlow: number
  priorityNormal: number
  priorityFast: number
  created: string
}

async function run() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY
  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase variables not configured..')
    return
  }

  const historicalBlocks = 24
  const provider = new JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`)
  const eth_feeHistory = await provider.send('eth_feeHistory', [historicalBlocks, 'latest', [1, 50, 90]])

  const latestBaseFees = eth_feeHistory.baseFeePerGas.map((i: any) => Number(i))
  const medianBaseFee = getMedian(latestBaseFees)
  const baseFee = (medianBaseFee / 1e9).toFixed(2)
  console.log('Base Fee (in gwei)', baseFee)

  const slowFees = eth_feeHistory.reward.map((x: any) => Number(x[0]))
  const prioritySlow = (getMedian(slowFees) / 1e9).toFixed(2)
  const normalFees = eth_feeHistory.reward.map((x: any) => Number(x[1]))
  const priorityNormal = (getMedian(normalFees) / 1e9).toFixed(2)
  const fastFees = eth_feeHistory.reward.map((x: any) => Number(x[2]))
  const priorityFast = (getMedian(fastFees) / 1e9).toFixed(2)
  console.log('Priority Fees (slow, normal, fast)', prioritySlow, priorityNormal, priorityFast)

  const supabase = createClient(supabaseUrl, supabaseKey)
  const insert = await supabase.from('gas').insert([
    {
      baseFee,
      prioritySlow,
      priorityNormal,
      priorityFast,
    },
  ])

  if (insert.error) {
    console.log('Unable to save fee history..')
    throw new Error(insert.error.message)
  }

  // const query = await supabase.from<GasPrice>('gas').select('*')
  // console.log('QUERY', query.data)
}

function getMedian(numbers: Array<number>) {
  let middle = Math.floor(numbers.length / 2)
  numbers = [...numbers].sort((a, b) => a - b)
  return numbers.length % 2 !== 0 ? numbers[middle] : (numbers[middle - 1] + numbers[middle]) / 2
}
