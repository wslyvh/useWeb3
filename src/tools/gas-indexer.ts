import * as dotenv from 'dotenv'
import { Index } from 'services/indexer'

dotenv.config()

run()

async function run() {
  console.log('Run Gas indexer')

  await Promise.all([Index('mainnet'), Index('polygon'), Index('optimism'), Index('arbitrum')])

  console.log('Done!')
}
