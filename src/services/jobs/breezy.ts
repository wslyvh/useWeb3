import { Company } from 'types/company'
import { Job } from 'types/job'
import { JobServiceInterface } from 'types/services/job-service'

const map = new Map()

export class BreezyJobService implements JobServiceInterface {
  public async GetCompany(id: string): Promise<Company | undefined> {
    console.log('BreezyJobService', 'GetCompay', 'NOT IMPLEMENTED')

    return {
      id: id,
      title: id,
      description: '',
      body: ''
    } as Company
  }

  public async GetJobs(companyId?: string): Promise<Array<Job>> {
    if (!companyId) return []

    try {
      const res = await fetch(`https://${companyId}.breezy.hr/json`)
      const data = await res.json()
      return data.map((i: any) => {
          return {
            id: String(i.id),
            title: i.name,
            location: i.location.name,
            company: {
                id: i.company.friendly_id,
                title: i.company.name,
                description: ''
            }, 
            url: i.url,
            updated: new Date(i.published_date).getTime()
          } as Job
      })
    } catch (e) {
      console.log('BreezyJobService', 'Unable to fetch jobs', companyId)
      console.error(e)
    }

    return []
  }
}