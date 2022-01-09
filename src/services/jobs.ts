import { Company } from 'types/company'
import { Job } from 'types/job'
import { JobServiceInterface } from 'types/services/job-service'
import { JOBS_BREEZY, JOBS_GREENHOUSE, JOBS_LEVER, JOBS_WORKABLE, JOBS_WRK } from 'utils/constants'
import { AirtableJobService, BreezyJobService, GreenhouseJobService, LeverJobService, WorkableJobService, WrkJobService } from './jobs/index'

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
      const airtableService = new AirtableJobService()
      const breezyService = new BreezyJobService()
      const greenhouseService = new GreenhouseJobService()
      const leverService = new LeverJobService()
      const workableService = new WorkableJobService()
      const wrkService = new WrkJobService()

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

          const wrk = JOBS_WRK.some(i => i === companyId)
          if (wrk)
            jobs = await wrkService.GetJobs(companyId, maxItems)

          // Check Airtable last. Doesn't have constant company list
          if (!breezy && !greenhouse && !lever && !workable && !wrk) {
            jobs = await airtableService.GetJobs(companyId, maxItems)
          }
        }
        else {
          const breezyJobs = JOBS_BREEZY.map(item => breezyService.GetJobs(item, maxItems))
          const greenhouseJobs = JOBS_GREENHOUSE.map(item => greenhouseService.GetJobs(item, maxItems))
          const leverJobs = JOBS_LEVER.map(item => leverService.GetJobs(item, maxItems))
          const workableJobs = JOBS_WORKABLE.map(item => workableService.GetJobs(item, maxItems))
          const wrkJobs = JOBS_WRK.map(item => wrkService.GetJobs(item, maxItems))
          const airtableJobs = airtableService.GetJobs(undefined, maxItems)
          
          // Get all jobs
          jobs = (await Promise.all([breezyJobs, greenhouseJobs, leverJobs, workableJobs, wrkJobs, airtableJobs].flat())).flat()
        }

        return jobs
          .filter(i => companyId ? i.company.id === companyId : true)
          .sort((a, b) => b.updated - a.updated)
          .sort((a, b) => a.featured ? (b.featuredUntil ?? 0) - (a.featuredUntil ?? 0) : 1)
      } catch (e) {
        console.log('GetJobs', 'Unable to fetch jobs', companyId)
        console.error(e)
      }
  
      return []
    }
}