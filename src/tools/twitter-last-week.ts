import * as dotenv from 'dotenv'
import { SendTweet } from 'utils/twitter'

dotenv.config()

console.log('Tweet about last week')
run()

async function run() {
  const dayOfMonth = new Date().getDate()
  if (dayOfMonth < 15 || dayOfMonth > 21) return

  await SendTweet(`What is the coolest thing you did last week in Web3?`)
}
