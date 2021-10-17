import { Company } from 'types/company'
import { Job } from 'types/job'
import { JobServiceInterface } from 'types/services/job-service'
import { JOBS_FILTER, JOBS_GREENHOUSE } from 'utils/constants'
import { GreenhouseJobService } from './jobs/greenhouse'

export class JobService implements JobServiceInterface {  
    public async GetCompany(id: string): Promise<Company | undefined> {
        try {
          
        } catch (e) {
          console.log('GetCompany', 'Unable to fetch company', id)
          console.error(e)
        }

        return undefined
    }

    public async GetJobs(companyId?: string): Promise<Array<Job>> {
        try {
          // Greenhouse
          const greenhouseService = new GreenhouseJobService()
          const ghMap = JOBS_GREENHOUSE.map(item => greenhouseService.GetJobs(item))
          const jobs = (await Promise.all(ghMap)).flat()

          return jobs.filter(job => {
              return JOBS_FILTER.some(f => job.title.toLowerCase().includes(f))
          })
        } catch (e) {
          console.log('GetJobs', 'Unable to fetch jobs', companyId)
          console.error(e)
        }
    
        return []
    }
}