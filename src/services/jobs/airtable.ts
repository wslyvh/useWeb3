import Airtable from 'airtable'
import moment from 'moment'
import { Organization } from 'types/org'
import { Job } from 'types/job'
import { JobServiceInterface } from 'types/services/job-service'
import { JOBS_SINCE_LAST_UPDATED } from 'utils/constants'
import { defaultSlugify, isEmail } from 'utils/helpers'
import { getJobTags } from 'utils/jobs'

export class AirtableJobService implements JobServiceInterface {
  private client: Airtable
  private base: Airtable.Base

  constructor() {
    if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_API_KEY) {
      throw new Error('Airtable API Base or Key not set.')
    }

    this.client = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
    this.base = this.client.base(process.env.AIRTABLE_API_BASE ?? '')
  }

  public async GetJobs(orgId: string, org: Organization): Promise<Array<Job>> {
    try {
      const records = await this.base('OrgJobs')
        .select({
          filterByFormula: `AND(
            ({Active}),
            ({orgId} = "${orgId}")
          )`,
        })
        .all()

      return records
        .map((source) => {
          const applicationUrl = (source.fields['External Url'] as string) ?? ''
          let job = {
            id: String(source.fields['ID']),
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
          job.tags = getJobTags(job.title)

          return job
        })
        .filter((job: Job) => moment(job.updated).isAfter(moment().subtract(JOBS_SINCE_LAST_UPDATED, 'd')))
        .sort((a: Job, b: Job) => b.updated - a.updated)
    } catch (e) {
      console.log('AirtableJobService', 'Unable to fetch jobs', orgId)
      console.error(e)
    }

    return []
  }
}
