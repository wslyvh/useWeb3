import { Company } from 'types/company'
import { Job } from 'types/job'
import {
  AirtableJobService,
  AngelJobService,
  BreezyJobService,
  GreenhouseJobService,
  LeverJobService,
  RecruiteeJobService,
  WorkableJobService,
  WrkJobService,
} from './jobs/index'

const cache = new Map()

// add company details in same table, description, image, website, Github, etc.
const mockCompanies = [
  { id: 'gnosis', name: 'Gnosis', type: 'Greenhouse' },
  { id: 'openzeppelin', name: 'OpenZeppelin', type: 'Greenhouse' },
  { id: 'ethereumfoundation', name: 'Ethereum Foundation', type: 'Lever' },
  { id: 'aragon', name: 'Aragon', type: 'Lever' },
  { id: 'the-graph', name: 'the Graph', type: 'Breezy' },
  { id: 'immunefi', name: 'Immunefi', type: 'Breezy' },
]

export async function GetCompanies(filter?: any): Promise<Company[]> {
  return []
}

export async function GetCompany(id: string): Promise<Company | undefined> {
  return undefined
}

// - query by org
// - query by department
// - query by tags
// - query by remote
// - query by part-time
export async function GetJobs(org?: string, filter?: any): Promise<Job[]> {
  const cacheKey = `jobs.getjobs:${org ?? 'all'}`
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }

  const companies = mockCompanies // GetCompanies()

  const airtableService = new AirtableJobService()
  const angelService = new AngelJobService()
  const breezyService = new BreezyJobService()
  const greenhouseService = new GreenhouseJobService()
  const leverService = new LeverJobService()
  const recruiteeService = new RecruiteeJobService()
  const workableService = new WorkableJobService()
  const wrkService = new WrkJobService()

  const jobs = (
    await Promise.all(
      companies.map(async (i) => {
        if (i.type === 'Greenhouse') {
          return greenhouseService.GetJobs(i.id)
        }
        if (i.type === 'Lever') {
          return leverService.GetJobs(i.id)
        }
        if (i.type === 'Breezy') {
          return breezyService.GetJobs(i.id)
        }

        return []
      })
    )
  ).flat()

  console.log('JOBS', jobs)

  return jobs.filter((i) => i !== undefined)
}

// PAGES // FEATURES
// ===

// 1. Post job (DONE)
// => /jobs/post

// 2. Show all jobs // paginated
// => /jobs/[page]

// 3. Show all jobs by tags // paginated
// tags could be:
// - department (e.g. engineering, product, sales)
// - skills (e.g. front-end, devops, solidity, etc.)
// - location (e.g. remote
// - full-/part-time
// => /jobs/t/[tag]/[page]

// 4. Show all jobs by company // paginated
// => /jobs/c/[company]/[page]

// 5. Show job details (DONE)
// => /jobs/c/[company]/[job]

// Nextjs
// get all jobs, incl. filters, company details, etc.
// => cache them / so all other calls can query from that same list
