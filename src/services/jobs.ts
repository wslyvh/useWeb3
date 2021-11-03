import { Company } from 'types/company'
import { Job } from 'types/job'
import { JobServiceInterface } from 'types/services/job-service'
import { JOBS_BREEZY, JOBS_GREENHOUSE, JOBS_LEVER, JOBS_WORKABLE } from 'utils/constants'
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

    public async GetJobs(companyId?: string, maxItems?: number): Promise<Array<Job>> {
      let jobs = new Array<Job>()
      const breezyService = new BreezyJobService()
      const greenhouseService = new GreenhouseJobService()
      const leverService = new LeverJobService()
      const workableService = new WorkableJobService()

        try {
          if (companyId) {
            const breezy = JOBS_BREEZY.some(i => i === companyId)
            if (breezy) jobs = await breezyService.GetJobs(companyId, maxItems)
            
            const greenhouse = JOBS_GREENHOUSE.some(i => i === companyId)
            if (greenhouse) jobs = await greenhouseService.GetJobs(companyId, maxItems)

            const lever = JOBS_LEVER.some(i => i === companyId)
            if (lever) jobs = await leverService.GetJobs(companyId, maxItems)

            const workable = JOBS_WORKABLE.some(i => i === companyId)
            if (workable) jobs = await workableService.GetJobs(companyId, maxItems)
          }
          else {
            const breezyJobs = JOBS_BREEZY.map(item => breezyService.GetJobs(item, maxItems))
            const greenhouseJobs = JOBS_GREENHOUSE.map(item => greenhouseService.GetJobs(item, maxItems))
            const leverJobs = JOBS_LEVER.map(item => leverService.GetJobs(item, maxItems))          
            const workableJobs = JOBS_WORKABLE.map(item => workableService.GetJobs(item, maxItems))
            
            // Get all jobs
            jobs = (await Promise.all([breezyJobs, greenhouseJobs, leverJobs, workableJobs].flat())).flat()
          }

          return jobs
            .filter(i => companyId ? i.company.id === companyId : true)
            .sort((a, b) => b.updated - a.updated)
        } catch (e) {
          console.log('GetJobs', 'Unable to fetch jobs', companyId)
          console.error(e)
        }
    
        return []
    }
}