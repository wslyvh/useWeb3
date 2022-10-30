import * as dotenv from 'dotenv'
import moment from 'moment'
import { GetIssues } from 'services/issue'
import { MarkdownContentService } from '../services/content'
import { Issue } from 'types/issue'
import { GetJobsByOrganization } from 'services/jobs'

const since = moment.utc().subtract(30, 'day')
dotenv.config()
console.log('Get Latest resources for newsletter')
console.log()
run()

async function run() {
  latestResources()
  latestItems()
  latestJobs()
}

async function latestResources() {
  const service = new MarkdownContentService()
  const categories = await service.GetCategories()
  const items = await service.GetItems()
  const recent = items.filter((i) => moment(i.dateAdded) >= since)

  console.log(`New resources ✨`)
  console.log('Resources since', since.toISOString(), recent.length)
  console.log('')

  for (const item of recent) {
    const category = categories.find((i) => i.id === item.category.id)
    console.log(`${category?.emoji} ${item.title} https://www.useweb3.xyz/${item.category.id}/${item.id}`)
  }

  console.log('---\n')
}

async function latestItems() {
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

  console.log(`New Items ✨`)
  console.log('Issues since', since.toISOString(), issues.length)
  console.log('')

  sorted
    .filter((i) => i.count > 1)
    .forEach((i) => {
      console.log(`${i.repo.nameWithOwner} (main language: ${i.repo.primaryLanguage.name}), ${i.count} new issues ${i.repo.url}/contribute`)
    })

  console.log('---\n')
}

async function latestJobs() {
  const efJobs = await GetJobsByOrganization('ethereumfoundation')
  // const featured = TODO: Get Featured Jobs

  console.log(`New Jobs ✨`)
  console.log('Jobs since', since.toISOString(), efJobs.length)
  console.log('')

  efJobs.forEach((i) => {
    console.log(`${i.title}, ${i.org.title} https://www.useweb3.xyz/org/${i.org.id}/${i.slug}`)
  })

  console.log('---\n')
}
