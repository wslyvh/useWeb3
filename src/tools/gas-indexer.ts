import * as dotenv from 'dotenv'
import { Cleanup, Index } from 'services/indexer'

dotenv.config()

run()

async function run() {
  console.log('Run Gas indexer')

  await Promise.all([Index('mainnet'), Index('polygon'), Index('optimism'), Index('arbitrum')])

  await Promise.all([Cleanup('polygon'), Cleanup('optimism'), Cleanup('arbitrum')])

  console.log('All done!')
}
