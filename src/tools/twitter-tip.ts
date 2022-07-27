import * as dotenv from 'dotenv'
import { GetRandomTip } from '../services/tips'
const Twit = require('twit')

dotenv.config()

console.log('Tweet random tip')
run()

async function run() {
  const twitterClient = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  })

  const text = await GetRandomTip()
  
  if (text) {
    const response = await twitterClient.post('statuses/update', { status: text })
    if (response.err) {
      console.log('Unable to post Twitter update..')
      console.error(response.err)
    }
    if (response.data) {
      console.log(`https://twitter.com/useWeb3/status/${response.data.id_str}`)
    }
  }
}
