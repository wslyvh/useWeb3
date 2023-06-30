import * as dotenv from 'dotenv'
import { SendTweet } from 'utils/twitter'

dotenv.config()

console.log('Tweet on first Monday of the month')
run()

async function run() {
  const dayOfMonth = new Date().getDate()
  if (dayOfMonth > 7) return

  await SendTweet(`
gm ☀️

What are you all working on this week? 🤓`)
}
