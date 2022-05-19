import moment from 'moment'
import { Organization } from 'types/org'
import { Job } from 'types/job'
import { JobServiceInterface } from 'types/services/job-service'
import { JOBS_SINCE_LAST_UPDATED } from 'utils/constants'
import { defaultSlugify, removeHtml } from 'utils/helpers'
import { getJobDepartment } from 'utils/jobs'

const map = new Map()

export class GreenhouseJobService implements JobServiceInterface {
  public async GetJobs(orgId: string, org: Organization): Promise<Array<Job>> {
    if (!orgId) return []

    try {
      const res = await fetch(`https://boards-api.greenhouse.io/v1/boards/${orgId}/jobs`)
      const data = await res.json()

      if (!data) return []

      const jobs = await Promise.all(
        data.jobs?.map(async (i: any) => {
          const response = await fetch(`https://boards-api.greenhouse.io/v1/boards/${orgId}/jobs/${i.id}`)
          const job = await response.json()

          return {
            id: String(i.id),
            slug: defaultSlugify(i.title),
            title: i.title,
            department: getJobDepartment(i.title),
            description: removeHtml(job.content),
            body: job.content,
            location: i.location.name,
            remote: i.location.name.toLowerCase().includes('remote'),
            org: org,
            url: i.absolute_url,
            updated: new Date(i.updated_at).getTime(),
          } as Job
        }) as Array<Job>
      )

      return jobs
        .filter((job: Job) => moment(job.updated).isAfter(moment().subtract(JOBS_SINCE_LAST_UPDATED, 'd')))
        .sort((a: Job, b: Job) => b.updated - a.updated)
    } catch (e) {
      console.log('GreenhouseJobService', 'Unable to fetch jobs', orgId)
      console.error(e)
    }

    return []
  }
}
