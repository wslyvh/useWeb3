import * as dotenv from 'dotenv'
const Twit = require('twit')

dotenv.config()

console.log('Tweet about last week')
run()

async function run() {
  const dayOfMonth = new Date().getDate()
  if (dayOfMonth < 15 || dayOfMonth > 21) return

  const twitterClient = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  })

  const text = `What is the coolest thing you did last week in Web3?`

  try {
    twitterClient.post('statuses/update', { status: text }, function (err: any, data: any, response: any) {
      if (err) {
        console.log('Unable to post Twitter update..')
        console.error(err)
      } else {
        console.log('Update posted to Twitter..')
        console.log(`https://twitter.com/useWeb3/status/${data.id_str}`)
      }
    })
  } catch (e) {
    console.log('Unable to post Twitter update..')
    console.error(e)
  }
}
