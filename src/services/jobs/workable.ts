import moment from 'moment'
import { Organization } from 'types/org'
import { Job } from 'types/job'
import { JobServiceInterface } from 'types/services/job-service'
import { JOBS_SINCE_LAST_UPDATED } from 'utils/constants'
import { defaultSlugify, removeHtml } from 'utils/helpers'
import { getJobDepartment } from 'utils/jobs'

const map = new Map()

export class WorkableJobService implements JobServiceInterface {
  public async GetJobs(orgId: string, org: Organization): Promise<Array<Job>> {
    if (!orgId) return []

    try {
      const res = await fetch(`https://www.workable.com/api/accounts/${orgId}?details=true`)
      const data = await res.json()

      return data.jobs
        .map((i: any) => {
          return {
            id: String(i.shortcode),
            slug: defaultSlugify(i.title),
            title: i.title,
            department: getJobDepartment(i.title),
            description: removeHtml(i.description),
            body: i.description,
            location: i.country && i.city ? `${i.city}, ${i.country}` : '',
            remote: i.telecommuting ?? false,
            org: org,
            url: i.url,
            updated: new Date(i.published_on).getTime(),
          } as Job
        })
        .filter((job: Job) => moment(job.updated).isAfter(moment().subtract(JOBS_SINCE_LAST_UPDATED, 'd')))
        .sort((a: Job, b: Job) => b.updated - a.updated)
    } catch (e) {
      console.log('WorkableJobService', 'Unable to fetch jobs', orgId)
      console.error(e)
    }

    return []
  }
}
