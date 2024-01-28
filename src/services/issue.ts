import moment from 'moment'
import * as dotenv from 'dotenv'
import fetch from 'cross-fetch'
import { Issue, Repository } from 'types/issue'

dotenv.config()

if (!process.env.ISSUES_GITHUB_TOKEN) {
  throw new Error('Github API Token not set.')
}

const cache = new Map()
const defaultSince = moment().subtract(1, 'year')
const orgs = [
  // Protocol
  'ethereum',
  // Applied ZK
  'privacy-scaling-explorations',
  'semaphore-protocol',
  'zkopru-network',
  'quadratic-funding',
  'web3well',
  'Zokrates',
  // Dev tooling & infra
  'NomicFoundation',
  'dethcrypto',
  'crytic',
  'trailofbits',
  'scaffold-eth',
  'blockchain-etl',
  'ethereum-lists',
  'ChainAgnostic',
  'Web3Modal',
  'TrueFiEng',
  'WalletConnect',
  'smartcontractkit',
  'TrueBlocks',
  'OpenZeppelin',
  'blockscout',
  'otterscan',
  'lambdaclass',
  'ethereum-attestation-service',
  'RevokeCash',
  'ensdomains',
  'wslyvh',
  'gobitfly',
  'waku-org',
  'ethereum-push-notification-service',
  // Libs & SDKs
  'eth-brownie',
  'dapphub',
  'foundry-rs',
  'vyperlang',
  'ethereumjs',
  'ethers-io',
  'web3',
  'web3ui',
  'web3p',
  'web3j',
  'wagmi-dev',
  'wevm',
  'ApeWorX',
  'Nethereum',
  // CL
  'prysmaticlabs',
  'sigp',
  'ConsenSys',
  'status-im',
  'ChainSafe', // Prysm, Lighthouse, Teku, Nimbus, lodestar
  // EL:
  'ledgerwatch',
  'NethermindEth',
  'paradigmxyz',
  'hyperledger', // 'ethereum' (geth), Erigon, Nethermind, Besu
  // L2/scalability:
  'l2beat',
  'ethereum-optimism',
  'ArbitrumFoundation',
  'OffchainLabs',
  'matter-labs',
  'hermeznetwork',
  'maticnetwork',
  'AztecProtocol',
  'base-org',
  'scroll-tech',
  'coinbase',
  'FuelLabs',
  'starkware-libs',
  '0xPolygon',
  '0xPolygonHermez',
]
const orgString = `org:${orgs.join(' org:')}`

// Github docs
// https://docs.github.com/en/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax#query-for-dates
// https://docs.github.com/en/search-github/searching-on-github/searching-issues-and-pull-requests#search-by-number-of-comments

export async function GetRepos(since: moment.Moment = defaultSince): Promise<Repository[]> {
  const cacheKey = `issues.GetRepos-since:${since.format('YYYY-MM-DD')}`
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
        Authorization: `Bearer ${process.env.ISSUES_GITHUB_TOKEN}`,
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
            query: "topic:Ethereum is:public archived:false good-first-issues:>0 stars:>10 pushed:>${since.format('YYYY-MM-DD')} sort:created",
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

  cache.set(cacheKey, repos)
  return repos
}

export async function GetIssues(since: moment.Moment = defaultSince): Promise<Issue[]> {
  const cacheKey = `issues.GetIssues-since:${since.toISOString()}`
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
        Authorization: `Bearer ${process.env.ISSUES_GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `{
          search(
            first: 100, 
            ${cursor}
            query: "${orgString} is:open is:issue label:\\"good first issue\\",\\"help wanted\\" created:>${since.toISOString()} sort:created",
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

  cache.set(cacheKey, issues)
  return issues
}
