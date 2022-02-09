import { Company } from 'types/company'
import { Job } from 'types/job'

export interface JobServiceInterface {
  GetCompany(id: string): Promise<Company | undefined>
  GetJobs(companyId?: string, maxItems?: number): Promise<Array<Job>>
}
