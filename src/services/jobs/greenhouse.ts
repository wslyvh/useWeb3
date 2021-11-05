import moment from 'moment'
import { Company } from 'types/company'
import { Job } from 'types/job'
import { JobServiceInterface } from 'types/services/job-service'
import { JOBS_FILTER, JOBS_SINCE_LAST_UPDATED } from 'utils/constants'
import { isCacheExpired, removeHtml } from 'utils/helpers'

const map = new Map()

export class GreenhouseJobService implements JobServiceInterface {
  public async GetCompany(id: string): Promise<Company | undefined> {
    const key = `GreenhouseJobService:GetCompany?id=${id}`
    if (map.has(key) && !isCacheExpired(map, key)) {
      return map.get(key)[0]
    }

    try {
      const res = await fetch(`https://boards-api.greenhouse.io/v1/boards/${id}`)
      const data = await res.json()

      if (data) {
        const company = {
          id: id,
          title: data.name,
          description: removeHtml(data.content),
          body: data.content
        } as Company

        map.set(key, [company, Date.now()])
        return company
      }
      
    } catch (e) {
      console.log('GreenhouseJobService', 'Unable to fetch company', id)
      console.error(e)
    }

    return undefined
  }

  public async GetJobs(companyId?: string, maxItems?: number): Promise<Array<Job>> {
    if (!companyId) return []

    try {
      const res = await fetch(`https://boards-api.greenhouse.io/v1/boards/${companyId}/jobs`)
      const data = await res.json()
      
      if (!data) return []
      let company = await this.GetCompany(companyId)
      if (!company) {
        company = {
          id: companyId,
          title: companyId,
          description: '',
          body: ''
        }
      }

      const jobs = await Promise.all(data.jobs?.map(async (i: any) => {
          const response = await fetch(`https://boards-api.greenhouse.io/v1/boards/${companyId}/jobs/${i.id}`)
          const job = await response.json()
          
          return {
            id: String(i.id),
            title: i.title,
            description: removeHtml(job.content),
            body: job.content,
            location: i.location.name,
            company: company, 
            url: i.absolute_url,
            updated: new Date(i.updated_at).getTime()
          } as Job
      }) as Array<Job>)

      return jobs.filter((job: Job) => JOBS_FILTER.some(f => job.title.toLowerCase().includes(f)))
        .filter((job: Job) => moment(job.updated).isAfter(moment().subtract(JOBS_SINCE_LAST_UPDATED, 'd')))
        .sort((a: Job, b: Job) => b.updated - a.updated)
        .slice(0, maxItems ?? 100)
    } catch (e) {
      console.log('GreenhouseJobService', 'Unable to fetch jobs', companyId)
      console.error(e)
    }

    return []
  }
}