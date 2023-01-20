import * as dotenv from 'dotenv'
import moment from 'moment'
import { GetIssues } from '../services/issue'
import { truncate } from '../utils/helpers'
const Twit = require('twit')

dotenv.config()

console.log('Get latest issues')
run()

async function run() {
  const twitterClient = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  })

  const since = moment.utc().subtract(7, 'day')
  const issues = await GetIssues(since)
  console.log('Issues since', since.toISOString(), issues.length)
  console.log('')

  if (issues.length === 0) {
    console.log('No new issues..')
    return
  }
  
  // Send 1st tweet
  let text = `Contribute to open-source Web3 projects ✨\n\n`
  text += `Make your first contribution to any of these 'good first'-issues below 🌈\n\n`
  text += `${issues.length} new issues this week 🛠️`
  console.log(text)

  let replyTo = ''
  const response = await twitterClient.post('statuses/update', { status: text })
  if (response.err) {
    console.log('Unable to post Twitter update..')
    console.error(response.err)
  }
  if (response.data) {
    replyTo = response.data.id_str
  }

  // Sent tweet per issue
  for (let i = 0; i < issues.length; i++) {
    await new Promise((r) => setTimeout(r, 1000))

    console.log(`Issue #${i}. Replying to ${replyTo}`)
    const item = issues[i]
    let body = `➡️ ${item.repository.nameWithOwner}\n\n`
    if (item.repository.primaryLanguage.name) {
      body += `Main language: #${item.repository.primaryLanguage.name}`
    }

    const remainingLength = 280 - (body.length + 25 + 15) // domain + extra/spacing/numbering
    const reply = `${i + 1}. ${truncate(item.title, remainingLength)}\n\n${body}\n\n${item.url}`
    const response = await twitterClient.post('statuses/update', {
      status: reply,
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

  // Sent last tweet
  await new Promise((r) => setTimeout(r, 1000))
  text = `These are just the latest from last week..\n\n`
  text += `Browse more than +500 #OpenSource 'Good first'-issues on core protocol, developer tooling, infra, SDKs, consensus and execution clients, L2's, etc. 🛠️\n\n`
  text += `https://www.useweb3.xyz/contribute`
  console.log(text)

  const responseLast = await twitterClient.post('statuses/update', {
    status: text,
    in_reply_to_status_id: replyTo,
    auto_populate_reply_metadata: true,
  })
  if (responseLast.err) {
    console.log('Unable to post Twitter update..')
    console.error(responseLast.err)
  }
}
