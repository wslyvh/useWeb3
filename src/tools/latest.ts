import * as dotenv from 'dotenv'
import moment from 'moment'
import { MarkdownContentService } from '../services/content'
const Twit = require('twit')

dotenv.config()

console.log('Get Latest resources')
run()

async function run() {
  const since = moment.utc().subtract(60, 'day')
  const service = new MarkdownContentService()
  const categories = await service.GetCategories()
  const items = await service.GetItems()
  const recent = items.filter((i) => moment(i.dateAdded) >= since)
  console.log('Resources since', since.toISOString(), recent.length)
  console.log('')

  let text = `New resources ✨\n\n`
  // for (const item of recent) {
  //   const category = categories.find((i) => i.id === item.category.id)
  //   text += `${category?.emoji} ${item.title} ${item.authors.join(' ')} \n`
  //   text += `https://www.useweb3.xyz/${item.category} \n`
  // }
  for (const item of recent) {
    const category = categories.find((i) => i.id === item.category.id)
    text += `${category?.emoji} ${item.title}\n`
    text += `https://www.useweb3.xyz/${item.category.id}/${item.id}\n`
  }

  console.log(text)
}
