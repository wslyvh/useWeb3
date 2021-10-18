import { Company } from 'types/company'
import { Job } from 'types/job'
import { JobServiceInterface } from 'types/services/job-service'
import { JOBS_FILTER, JOBS_GREENHOUSE, JOBS_LEVER } from 'utils/constants'
import { GreenhouseJobService, LeverJobService } from './jobs/index'

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
          const greenhouseJobs = JOBS_GREENHOUSE.map(item => greenhouseService.GetJobs(item))

          // Lever
          const leverService = new LeverJobService()
          const leverJobs = JOBS_LEVER.map(item => leverService.GetJobs(item))
          
          // Get all jobs
          const jobs = (await Promise.all([greenhouseJobs, leverJobs].flat())).flat()

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