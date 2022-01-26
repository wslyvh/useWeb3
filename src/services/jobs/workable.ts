import  moment from 'dayjs'
import { Company } from 'types/company'
import { Job } from 'types/job'
import { JobServiceInterface } from 'types/services/job-service'
import { JOBS_FILTER, JOBS_SINCE_LAST_UPDATED } from 'utils/constants'
import { removeHtml } from 'utils/helpers'

const map = new Map()

export class WorkableJobService implements JobServiceInterface {
  public async GetCompany(id: string): Promise<Company | undefined> {
    console.log('WorkableJobService', 'GetCompay', 'NOT IMPLEMENTED')

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
      const res = await fetch(`https://www.workable.com/api/accounts/${companyId}?details=true`)
      const data = await res.json()

      return data.jobs.map((i: any) => {
          return {
            id: String(i.shortcode),
            title: i.title,
            description: removeHtml(i.description),
            body: i.description,
            location: i.country && i.city ? `${i.city}, ${i.country}` : '',
            company: {
                id: companyId,
                title: data.name,
                description: removeHtml(data.description),
                body: data.description
            }, 
            url: i.url,
            updated: new Date(i.published_on).getTime()
          } as Job
      }).filter((job: Job) => JOBS_FILTER.some(f => job.title.toLowerCase().includes(f)))
        .filter((job: Job) => moment(job.updated).isAfter(moment().subtract(JOBS_SINCE_LAST_UPDATED, 'd')))
        .sort((a: Job, b: Job) => b.updated - a.updated)
        .slice(0, maxItems ?? 100)
    } catch (e) {
      console.log('WorkableJobService', 'Unable to fetch jobs', companyId)
      console.error(e)
    }

    return []
  }
}