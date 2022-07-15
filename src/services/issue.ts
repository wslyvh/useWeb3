import moment from 'moment'
import { Issue, Repository } from 'types/issue'

if (!process.env.GITHUB_TOKEN) {
  throw new Error('Github API Token not set.')
}

const cache = new Map()
const since = moment().subtract(1, 'year').format('YYYY-MM-DD')
const orgs = [
  // Protocol
  'ethereum',
  // Applied ZK
  'privacy-scaling-explorations', 'semaphore-protocol', 'zkopru-network', 'quadratic-funding', 'web3well', 'Zokrates',
  // Dev tooling & infra
  'NomicFoundation', 'dethcrypto', 'crytic', 'scaffold-eth', 'blockchain-etl', 'ethereum-lists', 'ChainAgnostic', 'Web3Modal', 'TrueFiEng', 'goerli', 'WalletConnect',
  // Libs & SDKs
  'eth-brownie', 'dapphub', 'foundry-rs', 'vyperlang', 'ethereumjs', 'ethers-io', 'web3ui', 'web3p', 'web3j',
  // CL
  'prysmaticlabs', 'sigp', 'ConsenSys', 'status-im', 'ChainSafe', // Prysm, Lighthouse, Teku, Nimbus, lodestar
  // EL:
  'ledgerwatch', 'NethermindEth', 'hyperledger', // 'ethereum' (geth), Erigon, Nethermind, Besu
  // L2/scalability: 
  'l2beat', 'ethereum-optimism', 'OffchainLabs', 'matter-labs', 'hermeznetwork', 'maticnetwork', 'AztecProtocol',
]
const orgString = `org:${orgs.join(' org:')}`

// Github docs
// https://docs.github.com/en/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax#query-for-dates
// https://docs.github.com/en/search-github/searching-on-github/searching-issues-and-pull-requests#search-by-number-of-comments

export async function GetRepos(): Promise<Repository[]> {
  const cacheKey = `issues.GetRepos`
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }

  let repos: Repository[] = []
  let cursor: string | undefined = ''

  while (cursor !== undefined) {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      // good-first-issues:>0
      // help-wanted-issues:>0
      // stars:>10 // 100 // 10000
      body: JSON.stringify({
        query: `{
          search(
            first: 5, 
            ${cursor}
            query: "topic:Ethereum is:public archived:false good-first-issues:>0 stars:>10 pushed:>${since} sort:created",
            type: REPOSITORY
          ) {
            repositoryCount
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
            nodes {
              ... on Repository {
                id
                name
                nameWithOwner
                description
                stargazerCount
                forkCount
                primaryLanguage {
                  name
                  color
                }
                url
                createdAt
                updatedAt
                pushedAt
                owner {
                  id
                  login
                  avatarUrl
                  url
                }
              }
            }
          }
        }`,
      }),
    })

    const body: any = await response.json()
    repos.push(
      ...body.data.search.nodes
        .filter((i: any) => !!i.id)
        .map((i: any) => {
          return {
            ...i,
            createdAt: new Date(i.createdAt).getTime(),
            updatedAt: new Date(i.updatedAt).getTime(),
            pushedAt: new Date(i.pushedAt).getTime(),
          }
        })
    )

    if (body.data.search.pageInfo.hasNextPage) {
      cursor = `after: "${body.data.search.pageInfo.endCursor}"`
    } else {
      cursor = undefined
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
  let cursor: string | undefined = ''

  while (cursor !== undefined) {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `{
          search(
            first: 100, 
            ${cursor}
            query: "${orgString} is:open is:issue label:\\"good first issue\\",\\"help wanted\\" created:>${since} sort:created",
            type: ISSUE
          ) {
            issueCount
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
            nodes {
              ... on Issue {
                id
                number
                title
                body
                url
                createdAt
                updatedAt
                author {
                  ... on User {
                    id
                    login
                    avatarUrl
                    url
                  }
                }
                comments {
                  totalCount
                }
                labels(first: 20) {
                  totalCount
                  nodes {
                    name
                    color
                  }
                }
                repository {
                  ... on Repository {
                    id
                    name
                    nameWithOwner
                    description
                    stargazerCount
                    forkCount
                    primaryLanguage {
                      name
                      color
                    }
                    url
                    createdAt
                    updatedAt
                    pushedAt
                    owner {
                      id
                      login
                      avatarUrl
                      url
                    }
                  }
                }
              }
            }
          }
        }`,
      }),
    })

    const body: any = await response.json()
    issues.push(
      ...body.data.search.nodes
        .filter((i: any) => !!i.id)
        .map((i: any) => {
          return {
            ...i,
            commentsCount: i.comments.totalCount,
            labels: i.labels?.nodes
              ? i.labels.nodes.map((l: any) => {
                return { name: l.name, color: l.color }
              })
              : [],
            author: i.author
              ? i.author
              : {
                id: 'ghost',
                login: 'Deleted user',
                avatarUrl: 'https://avatars.githubusercontent.com/u/10137?v=4',
                url: 'https://github.com/ghost',
              },
            repository: {
              ...i.repository,
            },
            createdAt: new Date(i.createdAt).getTime(),
            updatedAt: new Date(i.updatedAt).getTime(),
          }
        })
    )

    if (body.data.search.pageInfo.hasNextPage) {
      cursor = `after: "${body.data.search.pageInfo.endCursor}"`
    } else {
      cursor = undefined
    }
  }

  return issues
}
