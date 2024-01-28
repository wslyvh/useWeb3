import { TwitterApi } from 'twitter-api-v2'

export async function SendTweet(text: string) {
  const client = new TwitterApi({
    appKey: process.env.TWITTER_CONSUMER_KEY ?? '',
    appSecret: process.env.TWITTER_CONSUMER_SECRET ?? '',
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  })

  try {
    const resp = await client.v2.tweet(text)
    if (resp.errors) {
      console.log('Unable to post Twitter update..')
      console.error(resp.errors)
    }
    if (resp.data.id) {
      console.log(`https://twitter.com/useWeb3/status/${resp.data.id}`)
    }
  } catch (e) {
    console.log('Unable to post Twitter update..')
    console.error(e)
  }
}

export async function SendTweets(texts: string[]) {
  const client = new TwitterApi({
    appKey: process.env.TWITTER_CONSUMER_KEY ?? '',
    appSecret: process.env.TWITTER_CONSUMER_SECRET ?? '',
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  })

  try {
    const resp = await client.v2.tweetThread(texts)
    if (resp[0]?.data.id) {
      console.log(`https://twitter.com/useWeb3/status/${resp[0]?.data.id}`) // OP
    }
  } catch (e) {
    console.log('Unable to post Twitter update..')
    console.error(e)
  }
}
