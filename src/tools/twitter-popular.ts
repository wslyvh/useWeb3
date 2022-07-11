import * as dotenv from 'dotenv'
import fetch from 'cross-fetch'
import { MarkdownContentService } from '../services/content'
const Twit = require('twit')

dotenv.config()

console.log('Tweet most popular resources')
run()

async function run() {
  const service = new MarkdownContentService()
  const response = await fetch('https://plausible.io/api/v1/stats/breakdown?site_id=useweb3.xyz&period=7d&property=event:page&limit=10', {
    headers: { Authorization: `Bearer ${process.env.PLAUSIBLE_API_KEY}` },
  })

  const body = await response.json()
  const stats = body.results
    .filter((i: any) => i.page !== '/')
    .map((i: any) => i.page.split('/').filter((i: any) => !!i))
    .filter((i: string[]) => i.length === 1)
    .splice(0, 5)
    .flat()

  let text = `Most popular last week 🔥\n\n`
  for (const item of stats) {
    if (item === 'gas') {
      text += `- ⛽ Gas Tracker \n`
    } else if (item === 'contribute') {
      text += `- ✨ Contribute to OSS \n`
    } else if (item === 'jobs') {
      text += `- 💼 Web3 Jobs \n`
    } else if (item.endsWith('-jobs')) {
      const category = item.replace('-jobs', '')
      text += `- 💼 ${category.charAt(0).toUpperCase() + category.slice(1)} Jobs \n`
    } else {
      const category = await service.GetCategory(item)
      text += `- ${category?.emoji} ${category?.title} \n`
    }
  }

  const twitterClient = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  })
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
