import moment from 'moment'
import { Company } from 'types/company'
import { Job } from 'types/job'
import { JobServiceInterface } from 'types/services/job-service'
import { JOBS_BREEZY, JOBS_FILTER, JOBS_GREENHOUSE, JOBS_LEVER, JOBS_SINCE_LAST_UPDATED, JOBS_WORKABLE } from 'utils/constants'
import { BreezyJobService } from './jobs/breezy'
import { GreenhouseJobService, LeverJobService } from './jobs/index'
import { WorkableJobService } from './jobs/workable'

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
          // Breezy
          const breezyService = new BreezyJobService()
          const breezyJobs = JOBS_BREEZY.map(item => breezyService.GetJobs(item))

          // Greenhouse
          const greenhouseService = new GreenhouseJobService()
          const greenhouseJobs = JOBS_GREENHOUSE.map(item => greenhouseService.GetJobs(item))

          // // Lever
          const leverService = new LeverJobService()
          const leverJobs = JOBS_LEVER.map(item => leverService.GetJobs(item))
          
          // Breezy
          const workableService = new WorkableJobService()
          const workableJobs = JOBS_WORKABLE.map(item => workableService.GetJobs(item))
          
          // Get all jobs
          const jobs = (await Promise.all([breezyJobs, greenhouseJobs, leverJobs, workableJobs].flat())).flat()

          return jobs.filter(job => {
              return JOBS_FILTER.some(f => job.title.toLowerCase().includes(f))
          }).filter(i => moment(i.updated).isAfter(moment().subtract(JOBS_SINCE_LAST_UPDATED, 'd')))
        } catch (e) {
          console.log('GetJobs', 'Unable to fetch jobs', companyId)
          console.error(e)
        }
    
        return []
    }
}