import moment from 'moment'
import { Job } from 'types/job'
import { Organization } from 'types/org'
import { JobServiceInterface } from 'types/services/job-service'
import { JOBS_SINCE_LAST_UPDATED } from 'utils/constants'
import { defaultSlugify } from 'utils/helpers'
import { getJobDepartment } from 'utils/jobs'

const map = new Map()

export class BreezyJobService implements JobServiceInterface {
  public async GetJobs(orgId: string, org: Organization): Promise<Array<Job>> {
    if (!orgId) return []

    try {
      const res = await fetch(`https://${orgId}.breezy.hr/json`)
      const data = await res.json()
      return data
        .map((i: any) => {
          return {
            id: String(i.id),
            slug: defaultSlugify(i.name),
            title: i.name,
            department: getJobDepartment(i.name),
            location: i.location.name,
            remote: i.location.is_remote ?? false,
            org: org,
            url: i.url,
            updated: new Date(i.published_date).getTime(),
          } as Job
        })
        .filter((job: Job) => moment(job.updated).isAfter(moment().subtract(JOBS_SINCE_LAST_UPDATED, 'd')))
        .sort((a: Job, b: Job) => b.updated - a.updated)
    } catch (e) {
      console.log('BreezyJobService', 'Unable to fetch jobs', orgId)
      console.error(e)
    }

    return []
  }
}
