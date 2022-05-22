import Airtable from 'airtable'
import moment from 'moment'
import { Organization } from 'types/org'
import { Job } from 'types/job'
import { JobServiceInterface } from 'types/services/job-service'
import { toJob } from 'services/jobs'
import { DAYS_JOBS_LISTED_FEATURED } from 'utils/jobs'

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
        .map((source) => toJob(source, org))
        .filter((job: Job) => moment(job.updated).isAfter(moment().subtract(DAYS_JOBS_LISTED_FEATURED, 'd')))
        .sort((a: Job, b: Job) => b.updated - a.updated)
    } catch (e) {
      console.log('AirtableJobService', 'Unable to fetch jobs', orgId)
      console.error(e)
    }

    return []
  }
}
