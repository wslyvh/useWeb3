import Airtable, { FieldSet } from 'airtable'
import { Company } from 'types/company'
import { Job } from 'types/job'
import { Order } from 'types/order'

export class AirtableService {
  private client: Airtable
  private base: Airtable.Base

  constructor() {
    if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_API_KEY) {
      throw new Error('Airtable API Base or Key not set.')
    }

    this.client = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
    this.base = this.client.base(process.env.AIRTABLE_API_BASE ?? '')
  }

  public async GetCompanies(): Promise<Array<Company>> {
    try {
      const records = await this.base('Companies')
        .select({
          filterByFormula: `({Disabled} = FALSE())`,
        })
        .all()

      return records.map((i) => this.toCompany(i)).sort((a, b) => a.title.localeCompare(b.title))
    } catch (e) {
      console.log('GetCompanies', 'Unable to fetch companies')
      console.error(e)
    }

    return []
  }

  public async CreateCompany(company: Company): Promise<string> {
    const response = await this.base('Companies').create({
      Name: company.title,
      Description: company.description,
      Body: company.body,
      Website: company.website,
      Twitter: company.twitter,
      Github: company.github,
      'Board Url': company.externalJobBoard,
      Logo: [
        {
          url: company.logo,
        } as any,
      ],
    })

    if (!response.id) {
      console.log('Unable to create job')
      return ''
    }

    return response.id
  }

  public async CreateJob(job: Job): Promise<string> {
    const response = await this.base('Jobs').create({
      Title: job.title,
      Body: job.body,
      Description: job.description,
      Location: job.location,
      'External Url': job.url,
      Active: false,
      Remote: job.remote,
      Department: job.department,
      'Min Salary': job.minSalary,
      'Max Salary': job.maxSalary,
      Company: [job.company.id],
    })

    if (!response.id) {
      console.log('Unable to create job')
      return ''
    }

    return response.id
  }

  public async CreateOrder(order: Order): Promise<string> {
    const response = await this.base('Orders').create({
      Name: order.name,
      Email: order.email,
      Address: order.address,
      Type: order.type,
      Tx: order.tx,
      Jobs: [order.jobId],
    })

    if (!response.id) {
      console.log('Unable to create job')
      return ''
    }

    return response.id
  }

  private toCompany(source: Airtable.Record<FieldSet>): Company {
    return {
      id: source.id,
      title: source.fields['Name'],
      description: source.fields['Description'],
      body: source.fields['Body'],
      logo: (source.fields['Logo'] as any[])?.length > 0 ? (source.fields['Logo'] as any[])[0].url : '',
      website: source.fields['Website'],
      twitter: source.fields['Twitter'],
      github: source.fields['Github'],
      externalJobBoard: source.fields['Board Url'],
    } as Company
  }
}
