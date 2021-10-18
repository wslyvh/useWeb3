import { Company } from 'types/company'
import { Job } from 'types/job'
import { JobServiceInterface } from 'types/services/job-service'
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

  public async GetJobs(companyId?: string): Promise<Array<Job>> {
    if (!companyId) return []

    try {
      const res = await fetch(`https://boards-api.greenhouse.io/v1/boards/${companyId}/jobs`)
      const data = await res.json()
      
      if (!data) return []
      const company = await this.GetCompany(companyId)

      return data.jobs?.map((i: any) => {
          return {
            id: String(i.internal_job_id),
            title: i.title,
            location: i.location.name,
            company: company ? company : {
                id: companyId,
                title: companyId,
                description: ''
            }, 
            url: i.absolute_url,
            updated: new Date(i.updated_at).getTime()
          } as Job
      })
    } catch (e) {
      console.log('GreenhouseJobService', 'Unable to fetch jobs', companyId)
      console.error(e)
    }

    return []
  }
}