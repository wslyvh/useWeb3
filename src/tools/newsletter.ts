import * as dotenv from 'dotenv'
import moment from 'moment'
import { GetIssues } from 'services/issue'
import { MarkdownContentService } from '../services/content'
import { Issue } from 'types/issue'
import { GetJobsByOrganization } from 'services/jobs'
import { google } from 'googleapis'

dotenv.config()

const since = moment.utc().subtract(30, 'day')
const upcoming = moment.utc().add(30, 'day')
const googleApiKey = process.env.GOOGLE_API_KEY
const sheetId = '1NEu_FCc1hnGAuRgPmbXXpf0h2lCrCOlMKbbFEqgkVDQ'

console.log('Get Latest resources for newsletter')
console.log()
run()

async function run() {
  console.log('Generating Newsletter items since', since.toISOString())
  console.log()

  console.log('## GM ☀️')
  console.log(`Hi! Welcome to the Web3 Newsletter! 👋`)
  console.log()

  console.log('### 🛠️ Project Updates')
  console.log()

  console.log('### 🗞️ News')
  console.log()

  await latestResources()

  await latestJobs()

  console.log(`### 🔥 Trending`)
  // https://github.com/trending/solidity?since=monthly
  console.log(
    '**useful-solidity-patterns** - This repo is an ongoing collection of useful, and occasionally clever, solidity/EVM patterns that actually get used in the wild. These bite-sized guides are written in approachable terms so engineers of all skill levels can understand them. Every guide comes with a concise, self-contained, working code example and tests to demonstrate the pattern. New patterns are added regularly.'
  )
  console.log('<LINK>')
  console.log()

  await latestIssues()

  console.log('### 🤝 Connect')
  console.log(
    'Follow [@useWeb3](https://twitter.com/useWeb3) on Twitter for more regular updates, the latest items and learning about Web3 development. Follow [@wslyvh](https://twitter.com/wslyvh) for building in Web3, open-source software, decentralization and other updates in the ecosystem.'
  )
  console.log()

  await upcomingEvents()

  console.log('### 🌱 Support useWeb3')
  console.log(
    'useWeb3 has a diverse, globally distributed community of Web3-/crypto curious. A technical audience, including designers, researchers and other builders (e.g community builders, content creators, founders, etc..). If you want to support, sponsor or collaborate, check out https://www.useweb3.xyz/support'
  )
}

async function latestResources() {
  const service = new MarkdownContentService()
  const categories = await service.GetCategories()
  const items = await service.GetItems()
  const recent = items.filter((i) => moment(i.dateAdded) >= since)

  console.log(`### 📚 Resources`)
  console.log(`Here are the latest resources for you to learn about Web3`)
  console.log()

  for (const item of recent) {
    const category = categories.find((i) => i.id === item.category.id)
    console.log(`- ${category?.emoji} ${item.title} https://www.useweb3.xyz/${item.category.id}/${item.id}`)
  }

  console.log()
}

async function latestIssues() {
  const issues = await GetIssues(since)

  const repos = issues.reduce((accumulator: any, issue: Issue) => {
    const repo = issue.repository
    if (accumulator[repo.nameWithOwner]) {
      accumulator[repo.nameWithOwner].count += 1
    } else {
      accumulator[repo.nameWithOwner] = {
        repo: repo,
        count: 1,
      }
    }
    return accumulator
  }, {})
  const sorted = Object.keys(repos)
    .map((i) => repos[i])
    .sort((a: any, b: any) => b.count - a.count)

  console.log(`### ✨ Contribute`)
  console.log()

  sorted
    .filter((i) => i.count > 1)
    .forEach((i) => {
      if (i.repo.nameWithOwner.includes('hyperledger') && !i.repo.nameWithOwner.includes('besu')) return

      console.log(`- **${i.repo.nameWithOwner}** (main language: ${i.repo.primaryLanguage.name}), ${i.count} new issues\n${i.repo.url}/contribute`)
    })

  console.log()
}

async function latestJobs() {
  const efJobs = await GetJobsByOrganization('ethereumfoundation')
  // const featured = TODO: Get Featured Jobs

  console.log(`### 💼 Jobs`)
  console.log()

  efJobs.forEach((i) => {
    console.log(`- ${i.title}, ${i.org.title} https://www.useweb3.xyz/org/${i.org.id}/${i.slug}`)
  })

  console.log()
  console.log('Browse all open jobs at https://www.useweb3.xyz/jobs')
  console.log('Have a job opening? Add your jobs at https://www.useweb3.xyz/jobs/post and reach hundreds of thousands of Web3 builders.')
  console.log()
}

async function upcomingEvents() {
  if (!googleApiKey || !sheetId) return console.warn('googleApiKey or sheetId not set')

  const sheets = google.sheets({
    version: 'v4',
    auth: process.env.GOOGLE_API_KEY,
  })
  const sheetsResponse = await sheets.spreadsheets.get({
    spreadsheetId: sheetId,
  })
  const sheetNames = sheetsResponse.data?.sheets?.map((i: any) => i.properties.title)
  const sheet = sheetNames ? sheetNames[0] : ''
  if (!sheet) return console.log('No sheet')

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${sheet}!A1:1000`,
  })

  const data = response.data?.values
  if (!data) {
    console.log('No Data')
    return
  }

  const events = data
    .slice(5)
    .map((i: any) => {
      // 0: '', 1: Title, 2: Start, 3: End, 4: Location, 5: Link, 6: Twitter, 7: TG/Discord
      if (!i[1] || !i[2] || !i[3]) return
      if (i[2].includes('TBD') || i[3].includes('TBD') || i[4].includes('TBD')) return

      let start, end
      try {
        start = moment(`${i[2]} 2023`)
        end = moment(`${i[3]} 2023`)
      } catch (e) {
        return
      }
      if (!start || start.format('MMM DD') === 'Invalid date' || !end || end.format('MMM DD') === 'Invalid date') {
        return
      }

      if (start.isBefore(upcoming)) {
        return {
          title: i[1],
          start: start,
          end: end,
          location: i[4],
          link: i[5],
          twitter: i[6],
        }
      }
    })
    .filter((i) => !!i)

  console.log()
  console.log('### 📅 Upcoming Events')
  events.forEach((i: any) => {
    console.log(`- **${i.title}**, ${i.start.format('MMM DD')} https://${i.link ?? i.twitter}`)
  })
  console.log()
}
