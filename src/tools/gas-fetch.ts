import * as dotenv from 'dotenv'
import { GasPriceService } from 'services/gas'

dotenv.config()

console.log('Collect latest gas prices')
run()

async function run() {
  const service = new GasPriceService()
  await service.SaveCurrentGasprice()
}
