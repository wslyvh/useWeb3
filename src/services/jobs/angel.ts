import moment from 'moment'
import { Company } from 'types/company'
import { Job } from 'types/job'
import { JobServiceInterface } from 'types/services/job-service'
import { JOBS_SINCE_LAST_UPDATED } from 'utils/constants'
import { defaultSlugify, removeHtml } from 'utils/helpers'
import { getJobDepartment } from 'utils/jobs'
import jobData from '../../../data/jobs.json'

export class AngelJobService implements JobServiceInterface {
  public async GetCompany(id: string): Promise<Company | undefined> {
    console.log('AngelJobService', 'GetCompay', 'NOT IMPLEMENTED')

    return {
      id: id,
      slug: id,
      title: id,
      description: '',
      body: '',
    } as Company
  }

  public async GetJobs(companyId?: string, maxItems?: number): Promise<Array<Job>> {
    if (!companyId) return []

    const data: any = jobData
    const company = data[companyId]
    if (!company.jobs) return []

    const jobs = Object.entries(company.jobs).map((i) => {
      return i[1]
    })

    return jobs
      .map((i: any) => {
        return {
          id: i.id,
          slug: defaultSlugify(i.title),
          title: i.title,
          department: getJobDepartment(i.title),
          description: removeHtml(i.description),
          body: i.description,
          location: i.location,
          company: {
            id: companyId,
            title: company.name,
            description: removeHtml(company.content),
            body: company.content,
          },
          url: i.url,
          updated: new Date(i.published_on).getTime(),
        } as Job
      })
      .filter((job: Job) => moment(job.updated).isAfter(moment().subtract(JOBS_SINCE_LAST_UPDATED, 'd')))
      .sort((a: Job, b: Job) => b.updated - a.updated)
      .slice(0, maxItems ?? 100)
  }
}
