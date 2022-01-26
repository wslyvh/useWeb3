import  moment from 'dayjs'
import { Company } from 'types/company'
import { Job } from 'types/job'
import { JobServiceInterface } from 'types/services/job-service'
import { JOBS_FILTER, JOBS_SINCE_LAST_UPDATED } from 'utils/constants'
import { removeHtml } from 'utils/helpers'

const map = new Map()

export class WrkJobService implements JobServiceInterface {
  public async GetCompany(id: string): Promise<Company | undefined> {
    console.log('WrkJobService', 'GetCompay', 'NOT IMPLEMENTED')

    return {
      id: id,
      title: id,
      description: '',
      body: ''
    } as Company
  }

  public async GetJobs(companyId?: string, maxItems?: number): Promise<Array<Job>> {
    if (!companyId) return []

    try {
      const res = await fetch(`https://hire.wrk.xyz/api/v1/public/organizations/${companyId}/jobs/`)
      const data = await res.json()

      const jobs = await Promise.all(data.items?.map(async (i: any) => {        
        const response = await fetch(`https://hire.wrk.xyz/api/v1/public/organizations/${companyId}/jobs/${i.id}`)
        const job = await response.json()
        
        return {
          id: String(job.id),
          title: job.title,
          description: removeHtml(job.description),
          body: job.description,
          location: job.remoteness_pretty ?? job.country,
          company: {
              id: companyId,
              title: job.organization_name,
              description: '',
              body: ''
          },
          url: job.job_post_url,
          updated: new Date(job.published_at).getTime()
        } as Job
    }) as Array<Job>)

    return jobs.filter((job: Job) => JOBS_FILTER.some(f => job.title.toLowerCase().includes(f)))
    .filter((job: Job) => moment(job.updated).isAfter(moment().subtract(JOBS_SINCE_LAST_UPDATED, 'd')))
    .sort((a: Job, b: Job) => b.updated - a.updated)
    .slice(0, maxItems ?? 100)
    } catch (e) {
      console.log('WrkJobService', 'Unable to fetch jobs', companyId)
      console.error(e)
    }

    return []
  }
}