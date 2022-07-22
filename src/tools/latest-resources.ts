import * as dotenv from 'dotenv'
import moment from 'moment'
import { MarkdownContentService } from '../services/content'
const Twit = require('twit')

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

  const twitterClient = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  })

  // If just 1 item, but as single tweet
  if (recent.length === 1) {
    const item = recent[0]
    const category = categories.find((i) => i.id === item.category.id)

    const text = `NEW Resource added ✨\n\n
${category?.emoji} ${item.title}
by ${item.authors.join(' ')}

${item.url}`

    const response = await twitterClient.post('statuses/update', { status: text })
    if (response.err) {
      console.log('Unable to post Twitter update..')
      console.error(response.err)
    }
    if (response.data) {
      console.log(`https://twitter.com/useWeb3/status/${response.data.id_str}`)
    }

    return
  }

  // If multiple items. Sent thread, with each resource as separate Tweet

  // 1st tweet
  let text = `Recently added resources ✨\n\n`
  text += `x/${recent.length} 👇`

  let replyTo = ''
  const response = await twitterClient.post('statuses/update', { status: text })
  if (response.err) {
    console.log('Unable to post Twitter update..')
    console.error(response.err)
  }
  if (response.data) {
    replyTo = response.data.id_str
  }

  // Resource tweets
  for (let i = 0; i < recent.length; i++) {
    const item = recent[i]
    const category = categories.find((i) => i.id === item.category.id)

    const text = `${category?.emoji} ${item.title}
by ${item.authors.join(' ')}

${i + 1}/${recent.length}

${item.url}`

    const response = await twitterClient.post('statuses/update', {
      status: text,
      in_reply_to_status_id: replyTo,
      auto_populate_reply_metadata: true,
    })
    if (response.err) {
      console.log('Unable to post Twitter update..')
      console.error(response.err)
    }
    if (response.data) {
      replyTo = response.data.id_str
    }
  }
}
