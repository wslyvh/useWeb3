import { Company } from 'types/company'
import { Job } from 'types/job'
import { JobServiceInterface } from 'types/services/job-service'
import { isCacheExpired, removeHtml } from 'utils/helpers'

const map = new Map()

export class LeverJobService implements JobServiceInterface {
  public async GetCompany(id: string): Promise<Company | undefined> {
    console.log('LeverJobService', 'GetCompay', 'NOT IMPLEMENTED')

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
      const res = await fetch(`https://api.lever.co/v0/postings/${companyId}?mode=json`)
      const data = await res.json()
      
      if (!data) return []

      return data.map((i: any) => {
          return {
            id: i.id,
            title: i.text,
            description: i.descriptionPlain,
            body: i.description,
            location: i.categories?.location,
            company: {
                id: companyId,
                title: companyId,
                description: ''
            }, 
            url: i.applyUrl,
            updated: new Date(i.createdAt).getTime()
          } as Job
      })
    } catch (e) {
      console.log('LeverJobService', 'Unable to fetch jobs', companyId)
      console.error(e)
    }

    return []
  }
}