import Airtable from 'airtable'
import  moment from 'dayjs'
import { Company } from 'types/company'
import { Job } from 'types/job'
import { JobServiceInterface } from 'types/services/job-service'
import { JOBS_SINCE_LAST_UPDATED } from 'utils/constants'

export class AirtableJobService implements JobServiceInterface {
  private client: Airtable
  private base: Airtable.Base

  constructor() {
    if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_API_KEY) {
      throw new Error('Airtable API Base or Key not set.');
    }

    this.client = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
    this.base = this.client.base(process.env.AIRTABLE_API_BASE ?? '')
  }
  
  public async GetCompany(id: string): Promise<Company | undefined> {
    try {
      const records = await this.base('Companies').select({
        filterByFormula: `SEARCH("${id}", {Slug})`,
      }).all()

      // TODO: Not used yet. Map fields correctly.. 
      return records.map((source) => {
        return {
          id: source.fields['Slug'],
          title: source.fields['Name'],
          description: source.fields['Name'],
          body: source.fields['Name']
        } as Company
      }).find((i) => !!i)
    } catch (e) {
      console.log('GetCompany', 'Unable to fetch company', id)
      console.error(e)
    }
  }

  public async GetJobs(companyId?: string, maxItems?: number): Promise<Array<Job>> {
    try {
      const records = await this.base('Jobs').select({
        filterByFormula: companyId ? `AND(
          ({Active})
          ({Company Slug} = "${companyId}")
        )` : `AND(
          ({Active})
        )`
      }).all()

      return records.map((source) => {
        let job = {
          id: source.fields['Slug'],
          title: source.fields['Title'],
          description: source.fields['Description'],
          body: source.fields['Body'],
          location: source.fields['Location'],
          company: {
            id: (source.fields['Company Slug'] as string[])[0],
            title: (source.fields['Company Name'] as string[])[0],
            description: (source.fields['Company Description'] as string[])[0],
            body: (source.fields['Company Description'] as string[])[0]
          }, 
          url: source.fields['External Url'],
          updated: new Date(source.fields['Updated'] as string).getTime(),
          featured: false
        } as Job

        if (source.fields['Featured']) {
          job.featuredUntil = new Date(source.fields['Featured'] as string).getTime()
          job.featured = job.featuredUntil >= new Date().getTime()
        }

        return job
      }).filter((job: Job) => moment(job.updated).isAfter(moment().subtract(JOBS_SINCE_LAST_UPDATED, 'd')))
        .sort((a: Job, b: Job) => b.updated - a.updated)
        .slice(0, maxItems ?? 100)
    } catch (e) {
      console.log('AirtableJobService', 'Unable to fetch jobs', companyId)
      console.error(e)
    }
    
    return []
  }
}