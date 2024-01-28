import * as dotenv from 'dotenv'
import fetch from 'cross-fetch'
import { MarkdownContentService } from '../services/content'
import { SendTweet } from 'utils/twitter'

dotenv.config()

console.log('Tweet top resources')
run()

const EXCLUDE = ['https://github.com/wslyvh/useWeb3/tree/main/content']

async function run() {
  // Top resources / outside clicks
  const response = await fetch(
    `https://plausible.io/api/v1/stats/breakdown?site_id=useweb3.xyz&period=7d&property=event:props:url&filters=event:name==Outbound+Link%3A+Click`,
    {
      headers: { Authorization: `Bearer ${process.env.PLAUSIBLE_API_KEY}` },
    }
  )
  const body = await response.json()
  const stats = body.results.splice(0, 10)

  // Most popular pages
  const responsePopular = await fetch('https://plausible.io/api/v1/stats/breakdown?site_id=useweb3.xyz&period=7d&property=event:page&limit=20', {
    headers: { Authorization: `Bearer ${process.env.PLAUSIBLE_API_KEY}` },
  })
  const bodyPopular = await responsePopular.json()
  const pagesPopular = bodyPopular.results
    .filter((i: any) => i.page !== '/' && !i.page.startsWith('/jobs/') && !i.page.startsWith('/gas') && i.page.split('/').length > 2)
    .map((i: any) => {
      return {
        url: i.page,
        visitors: i.visitors,
      }
    })

  const combined = [...stats, pagesPopular]
    .flat()
    .sort((a: any, b: any) => b.visitors - a.visitors)
    .map((i: any) => i.url)
    .filter((i: any) => !EXCLUDE.includes(i))
    .splice(0, 5)

  const service = new MarkdownContentService()
  const items = await service.GetItems()

  let text = `Most popular last week 🚀\n\n`
  for (let index = 0; index < combined.length; index++) {
    const resource = items.find((i) => i.url === combined[index] || i.url.endsWith(combined[index]) || i.id === combined[index].split('/').pop())
    if (resource) {
      text += `${index + 1}. ${resource.title} ${resource.authors.join(' ')} \n`
    } else {
      text += `${index + 1}. ${combined[index]} \n`
    }
  }

  await SendTweet(text)
}
