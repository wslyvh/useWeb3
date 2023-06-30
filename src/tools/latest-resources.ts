import * as dotenv from 'dotenv'
import moment from 'moment'
import { MarkdownContentService } from '../services/content'
import { SendTweet, SendTweets } from 'utils/twitter'

dotenv.config()

console.log('Get Latest resources')
run()

async function run() {
  const since = moment.utc().subtract(7, 'day')

  const service = new MarkdownContentService()
  const categories = await service.GetCategories()
  const items = await service.GetItems()
  const recent = items.filter((i) => moment(i.dateAdded).isAfter(since))

  console.log('New Resources since', since.toISOString(), recent.length)
  console.log('')

  // If no items - don't post
  if (recent.length === 0) return

  // If just 1 item, but as single tweet
  if (recent.length === 1) {
    const item = recent[0]
    const category = categories.find((i) => i.id === item.category.id)

    await SendTweet(`NEW Resource added ✨\n\n
    ${category?.emoji} ${item.title}
    by ${item.authors.join(' ')}
    
    ${item.url}`)
    return
  }

  // If multiple items. Sent thread, with each resource as separate Tweet
  const tweets = recent.map((item, index) => {
    const category = categories.find((i) => i.id === item.category.id)
    return `${category?.emoji} ${item.title}
by ${item.authors.join(' ')}

${index + 1}/${recent.length}

${item.url}`
  })
  await SendTweets([`Recently added resources ✨\n\n👇`, ...tweets])
}
