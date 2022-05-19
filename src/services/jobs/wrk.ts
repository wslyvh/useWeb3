import moment from 'moment'
import { Organization } from 'types/org'
import { Job } from 'types/job'
import { JobServiceInterface } from 'types/services/job-service'
import { JOBS_SINCE_LAST_UPDATED } from 'utils/constants'
import { defaultSlugify, removeHtml } from 'utils/helpers'
import { getJobDepartment } from 'utils/jobs'

const map = new Map()

export class WrkJobService implements JobServiceInterface {
  public async GetJobs(orgId: string, org: Organization): Promise<Array<Job>> {
    if (!orgId) return []

    try {
      const res = await fetch(`https://hire.wrk.xyz/api/v1/public/organizations/${orgId}/jobs/`)
      const data = await res.json()

      if (!data.items || data.items.length === 0) return []

      const jobs = await Promise.all(
        data.items?.map(async (i: any) => {
          const response = await fetch(`https://hire.wrk.xyz/api/v1/public/organizations/${orgId}/jobs/${i.id}`)
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
            org: org,
            url: job.job_post_url,
            updated: new Date(job.published_at).getTime(),
          } as Job
        }) as Array<Job>
      )

      return jobs
        .filter((job: Job) => moment(job.updated).isAfter(moment().subtract(JOBS_SINCE_LAST_UPDATED, 'd')))
        .sort((a: Job, b: Job) => b.updated - a.updated)
    } catch (e) {
      console.log('WrkJobService', 'Unable to fetch jobs', orgId)
      console.error(e)
    }

    return []
  }
}
