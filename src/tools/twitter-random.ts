import * as dotenv from 'dotenv'
import { MarkdownContentService } from '../services/content'
import { SendTweet } from 'utils/twitter'

dotenv.config()

console.log('Tweet random resource')
run()

async function run() {
  const service = new MarkdownContentService()
  const categories = await service.GetCategories()
  const items = await service.GetItems()

  const item = items[Math.floor(Math.random() * items.length)]
  const category = categories.find((i) => i.id === item.category.id)

  const text = `
${category?.emoji} ${item.title}
by ${item.authors.join(' ')}

Check it out at 👇
${item.url}`

  await SendTweet(text)
}
