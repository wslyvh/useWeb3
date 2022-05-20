import moment from 'moment'
import { Organization } from 'types/org'
import { Job } from 'types/job'
import { JobServiceInterface } from 'types/services/job-service'
import { JOBS_SINCE_LAST_UPDATED } from 'utils/constants'
import { defaultSlugify, removeHtml } from 'utils/helpers'
import { getJobDepartment, getJobTags } from 'utils/jobs'
import jobData from '../../../data/jobs.json'

export class AngelJobService implements JobServiceInterface {
  public async GetJobs(orgId: string, org: Organization): Promise<Array<Job>> {
    if (!orgId) return []

    try {
      const data: any = jobData
      const angelOrg = data[orgId]
      if (!angelOrg?.jobs) return []

      const jobs = Object.entries(angelOrg.jobs).map((i) => {
        return i[1]
      })

      return jobs
        .map((i: any) => {
          return {
            id: i.id,
            slug: `${String(i.id)}-${defaultSlugify(i.title)}`,
            title: i.title,
            department: getJobDepartment(i.title),
            description: removeHtml(i.description),
            body: i.description,
            location: i.location,
            org: org,
            url: i.url,
            tags: getJobTags(i.title),
            updated: new Date(i.published_on).getTime(),
          } as Job
        })
        .filter((job: Job) => moment(job.updated).isAfter(moment().subtract(JOBS_SINCE_LAST_UPDATED, 'd')))
        .sort((a: Job, b: Job) => b.updated - a.updated)
    } catch (e) {
      console.log('AngelJobService', 'Unable to fetch jobs', orgId)
      console.error(e)
    }

    return []
  }
}
