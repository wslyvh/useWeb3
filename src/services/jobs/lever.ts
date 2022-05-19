import moment from 'moment'
import { Organization } from 'types/org'
import { Job } from 'types/job'
import { JobServiceInterface } from 'types/services/job-service'
import { JOBS_SINCE_LAST_UPDATED } from 'utils/constants'
import { defaultSlugify } from 'utils/helpers'
import { getJobDepartment } from 'utils/jobs'

const map = new Map()

export class LeverJobService implements JobServiceInterface {
  public async GetJobs(orgId: string, org: Organization): Promise<Array<Job>> {
    if (!orgId) return []

    try {
      const res = await fetch(`https://api.lever.co/v0/postings/${orgId}?mode=json`)
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
            org: org,
            url: i.applyUrl,
            updated: new Date(i.createdAt).getTime(),
          } as Job
        })
        .filter((job: Job) => moment(job.updated).isAfter(moment().subtract(JOBS_SINCE_LAST_UPDATED, 'd')))
        .sort((a: Job, b: Job) => b.updated - a.updated)
    } catch (e) {
      console.log('LeverJobService', 'Unable to fetch jobs', orgId)
      console.error(e)
    }

    return []
  }
}
