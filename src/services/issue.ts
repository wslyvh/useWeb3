import moment from 'moment'
import { Issue, Repository } from 'types/issue'

if (!process.env.GITHUB_TOKEN) {
  throw new Error('Github API Token not set.')
}

const cache = new Map()
const perPage = 100
const since = moment().subtract(1, 'year').format('YYYY-MM-DD')
const orgs = ['ethereum', 'privacy-scaling-explorations']
const orgString = `+org%3A${orgs.join('+org%3A')}`

// Search Repositories by topic (Ethereum)
// https://api.github.com/search/repositories?q=topic:Ethereum archived:false&type=Repositories&per_page=100

// Search issues by Orgs
// https://api.github.com/search/issues?q=is:issue%20state:open%20org:wslyvh%20org:efdevcon

// label:"help wanted"
// label:"good first issue"

// created:>2022-01-01
// updated:>2022-06-01

// no:assignee

// sort:reactions
// sort:reactions-+1
// sort:author-date
// sort:updated (or updated-asc)

// PSE
// is:open is:issue org:privacy-scaling-explorations no:assignee label:"help wanted","good first issue" sort:reactions-+1
// https://github.com/issues?q=is%3Aopen+is%3Aissue+org%3Aprivacy-scaling-explorations+label%3A%22help+wanted%22%2C%22good+first+issue%22+sort%3Areactions-%2B1+

// More info
// https://docs.github.com/en/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax#query-for-dates
// https://docs.github.com/en/search-github/searching-on-github/searching-issues-and-pull-requests#search-by-number-of-comments

export async function GetRepos(): Promise<Repository[]> {
  const cacheKey = `issues.GetRepos`
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }

  let repos: Repository[] = []
  let currentPage: number | undefined = 1

  while (currentPage) {
    const url = `https://api.github.com/search/repositories?q=topic:Ethereum%20archived:false%20good-first-issues:%3E0%20is:public%20stars:%3E=10%20pushed:%3E${since}&type=Repositories&per_page=${perPage}&page=${currentPage}`
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })

    const body = await response.json()
    repos.push(
      ...body.items.map((i: any) => {
        return {
          id: i.id,
          name: i.name,
          description: i.description,
          url: i.html_url,
          owner: {
            id: i.owner.id,
            login: i.owner.login,
            avatarUrl: i.owner.avatar_url,
            url: i.owner.html_url,
          },
          stargazers: i.stargazers_count,
          forks: i.forks,
          primaryLanguage: i.language,
        }
      })
    )

    if (body.total_count >= currentPage * perPage) {
      currentPage = currentPage + 1
    } else {
      currentPage = undefined
    }
  }

  return repos
}

export async function GetIssues(): Promise<Issue[]> {
  const cacheKey = `issues.GetIssues`
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }

  let issues: Issue[] = []
  let currentPage: number | undefined = 1

  while (currentPage) {
    const url = `https://api.github.com/search/issues?q=is%3Aopen+is%3Aissue${orgString}+label%3A%22help+wanted%22%2C%22good+first+issue%22+sort%3Acreated&per_page=${perPage}&page=${currentPage}`
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })

    const body = await response.json()
    issues.push(
      ...body.items.map((i: any) => {
        return {
          id: i.id,
          number: i.number,
          title: i.title,
          body: i.body,
          url: i.html_url,
          labels: i.labels.map((l: any) => {
            return { name: l.name, color: l.color }
          }),
          author: {
            id: i.user.id,
            login: i.user.login,
            avatarUrl:
              i.user.avatar_url ??
              'https://camo.githubusercontent.com/6e2f6de0032f63dd90d46812bcc47c1519ee78c4e095733ec35a964901b1274d/68747470733a2f2f302e67726176617461722e636f6d2f6176617461722f35316334663761346261326430393962326261396630343830333264643734613f643d68747470732533412532462532466769746875622e6769746875626173736574732e636f6d253246696d6167657325324667726176617461727325324667726176617461722d757365722d3432302e706e6726723d6726733d3634',
            url: i.user.html_url,
          },
          createdAt: new Date(i.created_at).getTime(),
          updatedAt: new Date(i.updated_at).getTime(),
        }
      })
    )

    if (body.total_count >= currentPage * perPage) {
      currentPage = currentPage + 1
    } else {
      currentPage = undefined
    }
  }

  return issues.filter((i) => moment(i.updatedAt).isAfter(since))
}
