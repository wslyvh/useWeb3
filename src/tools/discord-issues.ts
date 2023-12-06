import * as dotenv from 'dotenv'
import fetch from 'cross-fetch'
import moment from 'moment'
import { GetIssues } from '../services/issue'
import { getTimeLog, writeTimeLog } from 'utils/log'

dotenv.config()

console.log('Post latest issues to Discord')
run()

async function run() {
  const lastRun = getTimeLog('good-first.txt')
  const since = moment(lastRun ?? moment())
  const sinceIsoString = since.toISOString()
  const issues = await GetIssues(since)
  console.log('Issues since', sinceIsoString, issues.length)
  console.log('')

  const url = `https://discord.com/api/webhooks/${process.env.DISCORD_ID}/${process.env.DISCORD_TOKEN}`
  for (let i = 0; i < issues.length; i++) {
    const item = issues[i]

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `New 'good first'-issue at **${item.repository.nameWithOwner}** ✨
*${item.repository.description}*

Main language: ${item.repository.primaryLanguage.name}
${item.url}`,
      }),
    })
    if (res.status !== 200 && res.status !== 204) {
      console.log('Unable to post Discord update..')
      console.error(res)
    }

    await new Promise((r) => setTimeout(r, 1000))
  }

  writeTimeLog('good-first.txt', moment().toISOString())
}
