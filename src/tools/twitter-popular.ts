import * as dotenv from 'dotenv'
import fetch from 'cross-fetch'
import { MarkdownContentService } from '../services/content'
import { SendTweet } from 'utils/twitter'

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

  await SendTweet(text)
}
