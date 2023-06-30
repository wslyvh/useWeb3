import * as dotenv from 'dotenv'
import { GetRandomTip } from '../services/tips'
import { SendTweet } from 'utils/twitter'

dotenv.config()

console.log('Tweet random tip')
run()

async function run() {
  const text = await GetRandomTip()

  if (text) {
    await SendTweet(text)
  }
}
