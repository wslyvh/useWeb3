import Airtable, { Record, FieldSet } from 'airtable'
import { Organization } from 'types/org'
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
import { defaultSlugify, isEmail } from 'utils/helpers'
import { getJobTags } from 'utils/jobs'

if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_API_KEY) {
  throw new Error('Airtable API Base or Key not set.')
}

const cache = new Map()
const client: Airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
const base: Airtable.Base = client.base(process.env.AIRTABLE_API_BASE ?? '')

export async function GetOrganizations(): Promise<Organization[]> {
  const cacheKey = `jobs.GetOrganizations`
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }
  try {
    const records = await base('Orgs').select().all()

    const orgs = records.map((source) => toOrganization(source))
    cache.set(cacheKey, orgs)
    return orgs
  } catch (e) {
    console.log('GetOrganizations', 'Unable to fetch orgs')
    console.error(e)
  }

  return []
}

export async function GetOrganization(id: string): Promise<Organization | undefined> {
  const cacheKey = `jobs.GetOrganization:${id}`
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }
  try {
    const records = await base('Orgs')
      .select({
        filterByFormula: `SEARCH("${id}", {id})`,
      })
      .all()

    if (records.length > 0) {
      const org = records.map((source) => toOrganization(source)).find((i) => i.id === id)
      if (org) {
        cache.set(cacheKey, org)
        return org
      }
    }
  } catch (e) {
    console.log('GetOrganization', 'Unable to fetch org', id)
    console.error(e)
  }

  console.log(`Org '${id}' not found`)
}

export async function GetFeaturedJob(recordId: string): Promise<Job | undefined> {
  const source = await base('OrgJobs').find(recordId)

  if (source) {
    return toJob(source)
  }
}

// - query by org
// - query by department
// - query by tags
// - query by remote
// - query by part-time
export async function GetJobs(): Promise<Job[]> {
  const cacheKey = `jobs.GetJobs:all`
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }

  const orgs = await GetOrganizations()
  const jobs = (await Promise.all(orgs.map(getJobsByOrg))).flat()

  return jobs
    .filter((i) => i !== undefined)
    .sort((a, b) => b.updated - a.updated)
    .sort((a, b) => (a.featured ? (b.featuredUntil ?? 0) - (a.featuredUntil ?? 0) : 1))
}

export async function GetJobsByOrganization(orgId: string): Promise<Job[]> {
  const cacheKey = `jobs.GetJobsByOrganization:${orgId}`
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }

  const org = await GetOrganization(orgId)
  if (org) {
    return await getJobsByOrg(org)
  }

  return []
}

async function getJobsByOrg(org: Organization): Promise<Job[]> {
  const airtableService = new AirtableJobService()
  const angelService = new AngelJobService()
  const breezyService = new BreezyJobService()
  const greenhouseService = new GreenhouseJobService()
  const leverService = new LeverJobService()
  const recruiteeService = new RecruiteeJobService()
  const workableService = new WorkableJobService()
  const wrkService = new WrkJobService()

  const airtableJobs = airtableService.GetJobs(org.id, org)
  let atsJobs: Promise<Job[]> = Promise.resolve([])

  if (org.ATS === 'Angel') {
    atsJobs = angelService.GetJobs(org.id, org)
  }
  if (org.ATS === 'Breezy') {
    atsJobs = breezyService.GetJobs(org.id, org)
  }
  if (org.ATS === 'Greenhouse') {
    atsJobs = greenhouseService.GetJobs(org.id, org)
  }
  if (org.ATS === 'Lever') {
    atsJobs = leverService.GetJobs(org.id, org)
  }
  if (org.ATS === 'Recruitee') {
    atsJobs = recruiteeService.GetJobs(org.id, org)
  }
  if (org.ATS === 'Workable') {
    atsJobs = workableService.GetJobs(org.id, org)
  }
  if (org.ATS === 'Wrk') {
    atsJobs = wrkService.GetJobs(org.id, org)
  }

  return (await Promise.all([airtableJobs, atsJobs])).flat()
}

export function toOrganization(source: Record<FieldSet>): Organization {
  let org = {
    id: source.fields['id'],
    title: source.fields['title'],
    description: source.fields['description'],
    body: source.fields['body'] ?? '',
    ATS: source.fields['ATS'] ?? 'Other',
  } as Organization

  if (source.fields['logo'] && Array.isArray(source.fields['logo']) && (source.fields['logo'] as any[]).length > 0) {
    org.logo = (source.fields['logo'] as any[])[0].url
  }
  if (source.fields['website']) {
    org.website = (source.fields['website'] as string) ?? ''
  }
  if (source.fields['twitter']) {
    org.twitter = (source.fields['twitter'] as string) ?? ''
  }
  if (source.fields['github']) {
    org.github = (source.fields['github'] as string) ?? ''
  }
  if (source.fields['externalBoardUrl']) {
    org.externalBoardUrl = source.fields['externalBoardUrl'] as string
  } else {
    switch (org.ATS) {
      case 'Angel':
        org.externalBoardUrl = `https://angel.co/company/${org.id}/jobs`
        break
      case 'Breezy':
        org.externalBoardUrl = `https://${org.id}.breezy.hr/`
        break
      case 'Greenhouse':
        org.externalBoardUrl = `https://boards.greenhouse.io/${org.id}/`
        break
      case 'Lever':
        org.externalBoardUrl = `https://jobs.lever.co/${org.id}/`
        break
      case 'Recruitee':
        org.externalBoardUrl = `https://${org.id}.recruitee.com`
        break
      case 'Workable':
        org.externalBoardUrl = `https://apply.workable.com/${org.id}/`
        break
      case 'Wrk':
        org.externalBoardUrl = `https://jobs.wrk.xyz/${org.id}`
        break
    }
  }

  return org
}

export function toJob(source: Record<FieldSet>, org?: Organization): Job {
  const applicationUrl = (source.fields['External Url'] as string) ?? ''
  let job = {
    id: String(source.fields['Slug']),
    slug: `${String(source.fields['ID'])}-${defaultSlugify(source.fields['Title'] as string)}`,
    title: source.fields['Title'],
    department: source.fields['Department'],
    description: source.fields['Description'],
    body: source.fields['Body'],
    contentType: 'markdown',
    location: source.fields['Location'],
    remote: source.fields['Remote'] ?? false,
    org: org,
    url: isEmail(applicationUrl)
      ? `mailto:${applicationUrl}?subject=Apply for ${source.fields['Title']} (useWeb3)`
      : applicationUrl,
    tags: getJobTags(source.fields['Title'] as string),
    type: source.fields['Type'],
    updated: source.fields['Date']
      ? new Date(source.fields['Date'] as string).getTime()
      : new Date(source.fields['Updated'] as string).getTime(),
  } as Job

  if (source.fields['Featured']) {
    job.featuredUntil = new Date(source.fields['Featured'] as string).getTime()
    job.featured = job.featuredUntil >= new Date().getTime()
  }
  if (source.fields['Min Salary'] !== undefined) {
    job.minSalary = source.fields['Min Salary'] as number
  }
  if (source.fields['Max Salary'] !== undefined) {
    job.maxSalary = source.fields['Max Salary'] as number
  }

  return job
}
