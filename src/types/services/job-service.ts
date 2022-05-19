import { Organization } from 'types/org'
import { Job } from 'types/job'

export interface JobServiceInterface {
  GetJobs(orgId: string, org: Organization): Promise<Array<Job>>
}
