import moment from 'moment'
import { Job } from 'types/job'
import { Organization } from 'types/org'
import { JobServiceInterface } from 'types/services/job-service'
import { defaultSlugify } from 'utils/helpers'
import { DAYS_JOBS_LISTED_DEFAULT, getJobDepartment, getJobTags, Type } from 'utils/jobs'

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
            slug: `${String(i.id)}-${defaultSlugify(i.name)}`,
            title: i.name,
            department: getJobDepartment(i.name),
            description: `Apply for the role of ${i.name} at ${org.title}. ${org.description}`,
            body: `${org.body}`,
            location: i.location.name,
            remote: i.location.is_remote ?? false,
            type: getJobType(i),
            org: org,
            url: i.url,
            tags: getJobTags(i.name),
            updated: new Date(i.published_date).getTime(),
          } as Job
        })
        .filter((job: Job) => moment(job.updated).isAfter(moment().subtract(DAYS_JOBS_LISTED_DEFAULT, 'd')))
        .sort((a: Job, b: Job) => b.updated - a.updated)
    } catch (e) {
      console.log('BreezyJobService', 'Unable to fetch jobs', orgId)
      console.error(e)
    }

    return []
  }
}

function getJobType(source: any): Type {
  if (!source.type?.id) return ''
  if (source.type.id.toLowerCase().includes('full')) return 'Full-time'
  if (source.type.id.toLowerCase().includes('part')) return 'Part-time'
  if (source.type.id.toLowerCase().includes('contract')) return 'Contract'
  if (source.type.id.toLowerCase().includes('intern')) return 'Internship'
  if (source.type.id.toLowerCase().includes('volunteer')) return 'Volunteer'

  return ''
}

// Example
// ==

// [{
//   "id": "48c2ad06ef91",
//   "friendly_id": "48c2ad06ef91-developer-relations",
//   "name": "Developer Relations",
//   "url": "https://the-graph.breezy.hr/p/48c2ad06ef91-developer-relations",
//   "published_date": "2021-09-27T19:31:56.249Z",
//   "type": {
//     "id": "fullTime",
//     "name": "Full-Time"
//   },
//   "location": {
//     "is_remote": true,
//     "country": {
//       "id": "worldwide",
//       "name": "Worldwide"
//     },
//     "name": "Anywhere, worldwide",
//     "city": "Anywhere"
//   },
//   "department": "Business",
//   "company": {
//     "name": "Edge & Node",
//     "logo_url": null,
//     "friendly_id": "the-graph"
//   }
// }, {
//   "id": "14abb5491e99",
//   "friendly_id": "14abb5491e99-developer-success-lead",
//   "name": "Developer Success Lead",
//   "url": "https://the-graph.breezy.hr/p/14abb5491e99-developer-success-lead",
//   "published_date": "2021-11-01T20:59:15.348Z",
//   "type": {
//     "id": "fullTime",
//     "name": "Full-Time"
//   },
//   "location": {
//     "country": {
//       "id": "worldwide",
//       "name": "Worldwide"
//     },
//     "is_remote": true,
//     "name": "Anywhere, worldwide",
//     "city": "Anywhere"
//   },
//   "department": "Engineering",
//   "company": {
//     "name": "Edge & Node",
//     "logo_url": null,
//     "friendly_id": "the-graph"
//   }
// }]
