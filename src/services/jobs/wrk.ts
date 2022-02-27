import moment from 'moment'
import { Company } from 'types/company'
import { Job } from 'types/job'
import { JobServiceInterface } from 'types/services/job-service'
import { JOBS_SINCE_LAST_UPDATED } from 'utils/constants'
import { defaultSlugify, removeHtml } from 'utils/helpers'
import { getJobDepartment } from 'utils/jobs'

const map = new Map()

export class WrkJobService implements JobServiceInterface {
  public async GetCompany(id: string): Promise<Company | undefined> {
    console.log('WrkJobService', 'GetCompay', 'NOT IMPLEMENTED')

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
      const res = await fetch(`https://hire.wrk.xyz/api/v1/public/organizations/${companyId}/jobs/`)
      const data = await res.json()

      const jobs = await Promise.all(
        data.items?.map(async (i: any) => {
          const response = await fetch(`https://hire.wrk.xyz/api/v1/public/organizations/${companyId}/jobs/${i.id}`)
          const job = await response.json()

          return {
            id: String(job.id),
            slug: defaultSlugify(job.title),
            title: job.title,
            department: getJobDepartment(job.title),
            description: removeHtml(job.description),
            body: job.description,
            location: job.remoteness_pretty ?? job.display_location,
            remote: job.remoteness_pretty?.toLowerCase().includes('remote') ?? false,
            company: {
              id: companyId,
              title: job.organization_name,
              description: '',
              body: '',
            },
            url: job.job_post_url,
            updated: new Date(job.published_at).getTime(),
          } as Job
        }) as Array<Job>
      )

      return jobs
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
