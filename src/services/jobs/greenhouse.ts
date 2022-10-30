import moment from 'moment'
import fetch from 'cross-fetch'
import { Organization } from 'types/org'
import { Job } from 'types/job'
import { JobServiceInterface } from 'types/services/job-service'
import { defaultSlugify, removeHtml } from 'utils/helpers'
import { DAYS_JOBS_LISTED_DEFAULT, getJobDepartment, getJobTags } from 'utils/jobs'

const map = new Map()

export class GreenhouseJobService implements JobServiceInterface {
  public async GetJobs(orgId: string, org: Organization): Promise<Array<Job>> {
    if (!orgId) return []

    try {
      const res = await fetch(`https://boards-api.greenhouse.io/v1/boards/${orgId}/jobs`)
      const data = await res.json()
      if (!data || !!data.error) return []

      const jobs = await Promise.all(
        data.jobs?.map(async (i: any) => {
          const response = await fetch(`https://boards-api.greenhouse.io/v1/boards/${orgId}/jobs/${i.id}`)
          const job = await response.json()

          return {
            id: String(i.id),
            slug: `${String(i.id)}-${defaultSlugify(i.title)}`,
            title: i.title,
            department: getJobDepartment(i.title),
            description: removeHtml(job.content),
            body: job.content,
            contentType: 'html',
            location: i.location.name,
            remote: i.location.name.toLowerCase().includes('remote'),
            org: org,
            url: i.absolute_url,
            tags: getJobTags(i.title),
            updated: new Date(i.updated_at).getTime(),
          } as Job
        }) as Array<Job>
      )

      return jobs
        .filter((job: Job) => moment(job.updated).isAfter(moment().subtract(DAYS_JOBS_LISTED_DEFAULT, 'd')))
        .sort((a: Job, b: Job) => b.updated - a.updated)
    } catch (e) {
      console.log('GreenhouseJobService', 'Unable to fetch jobs', orgId)
      console.error(e)
    }

    return []
  }
}

// EXAMPLE
// ==

// {
// absolute_url: 'https://boards.greenhouse.io/edgeandnode/jobs/4012532005',
// data_compliance: [ { type: 'gdpr', requires_consent: false, retention_period: null } ],
// internal_job_id: 4016498005,
// location: { name: 'Remote' },
// metadata: [],
// id: 4012532005,
// updated_at: '2022-05-08T21:37:37-04:00',
// requisition_id: '10',
// title: 'Technical Writer',
// content: '',
// departments: [
//   {
//     id: 4012177005,
//     name: 'Product Marketing',
//     child_ids: [],
//     parent_id: null
//   }
// ],
// offices: [
//   {
//     id: 4003055005,
//     name: 'Remote',
//     location: null,
//     child_ids: [],
//     parent_id: null
//   }
// ]
// }
