import moment from 'dayjs'
import { Company } from 'types/company'
import { Job } from 'types/job'
import { JobServiceInterface } from 'types/services/job-service'
import { JOBS_FILTER, JOBS_SINCE_LAST_UPDATED } from 'utils/constants'
import { isCacheExpired, removeHtml } from 'utils/helpers'

const map = new Map()

export class RecruiteeJobService implements JobServiceInterface {
  public async GetCompany(id: string): Promise<Company | undefined> {
    console.log('RecruiteeJobService', 'GetCompay', 'NOT IMPLEMENTED')

    return {
      id: id,
      title: id,
      description: '',
      body: '',
    } as Company
  }

  public async GetJobs(companyId?: string, maxItems?: number): Promise<Array<Job>> {
    if (!companyId) return []

    try {
      const res = await fetch(`https://${companyId}.recruitee.com/api/offers/`)
      const data = await res.json()

      return data.offers
        .map((i: any) => {
          return {
            id: String(i.id),
            title: i.title,
            description: removeHtml(i.description),
            body: i.description,
            location: i.location,
            company: {
              id: companyId,
              title: i.company_name,
              description: '',
            },
            url: i.careers_url,
            updated: new Date(i.published_at).getTime(),
          } as Job
        })
        .filter((job: Job) => JOBS_FILTER.some((f) => job.title.toLowerCase().includes(f)))
        .filter((job: Job) => moment(job.updated).isAfter(moment().subtract(JOBS_SINCE_LAST_UPDATED, 'd')))
        .sort((a: Job, b: Job) => b.updated - a.updated)
        .slice(0, maxItems ?? 100)
    } catch (e) {
      console.log('RecruiteeJobService', 'Unable to fetch jobs', companyId)
      console.error(e)
    }

    return []
  }
}
