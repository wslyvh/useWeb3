import moment from 'moment'
import { Company } from 'types/company'
import { Job } from 'types/job'
import { JobServiceInterface } from 'types/services/job-service'
import { JOBS_SINCE_LAST_UPDATED } from 'utils/constants'
import { defaultSlugify } from 'utils/helpers'
import { getJobDepartment } from 'utils/jobs'

const map = new Map()

export class LeverJobService implements JobServiceInterface {
  public async GetCompany(id: string): Promise<Company | undefined> {
    console.log('LeverJobService', 'GetCompay', 'NOT IMPLEMENTED')

    return {
      id: id,
      slug: id,
      title: id,
      description: '',
      body: '',
    } as Company
  }

  public async GetJobs(companyId?: string, maxItems?: number): Promise<Array<Job>> {
    if (!companyId) return []

    try {
      const res = await fetch(`https://api.lever.co/v0/postings/${companyId}?mode=json`)
      const data = await res.json()

      if (!data) return []

      return data
        .map((i: any) => {
          return {
            id: i.id,
            slug: defaultSlugify(i.text),
            title: i.text,
            department: getJobDepartment(i.text),
            description: i.descriptionPlain,
            body: i.description,
            location: i.categories?.location,
            remote: i.categories?.location.toLowerCase().includes('remote') ?? false,
            company: {
              id: companyId,
              title: companyId,
              description: '',
            },
            url: i.applyUrl,
            updated: new Date(i.createdAt).getTime(),
          } as Job
        })
        .filter((job: Job) => moment(job.updated).isAfter(moment().subtract(JOBS_SINCE_LAST_UPDATED, 'd')))
        .sort((a: Job, b: Job) => b.updated - a.updated)
        .slice(0, maxItems ?? 100)
    } catch (e) {
      console.log('LeverJobService', 'Unable to fetch jobs', companyId)
      console.error(e)
    }

    return []
  }
}
