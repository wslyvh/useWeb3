import Airtable from 'airtable'
import { Organization } from 'types/org'
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

  public async CreateOrg(org: Organization): Promise<string> {
    const response = await this.base('Orgs').create({
      title: org.title,
      id: org.id,
      ATS: org.ATS,
      description: org.description,
      body: org.body,
      website: org.website,
      twitter: org.twitter,
      github: org.github,
      externalBoardUrl: org.externalBoardUrl,
      logo: [
        {
          url: org.logo,
        } as any,
      ],
    })

    if (!response.id) {
      console.log('Unable to create org')
      return ''
    }

    return response.id
  }

  public async CreateJob(job: Job): Promise<string> {
    const response = await this.base('OrgJobs').create({
      Title: job.title,
      Body: job.body,
      Description: job.description,
      Location: job.location,
      'External Url': job.url,
      Active: false,
      Remote: job.remote,
      Department: job.department,
      Type: job.type,
      'Min Salary': job.minSalary,
      'Max Salary': job.maxSalary,
      org: [job.org.recordId || job.org.id],
    })

    if (!response.id) {
      console.log('Unable to create job')
      return ''
    }

    return response.id
  }

  public async GetOrder(id: string): Promise<Order | undefined> {
    const source = await this.base('Orders').find(id)

    if (source) {
      return {
        id: source.id,
        name: source.fields['Name'],
        email: source.fields['Email'],
        address: source.fields['Address'],
        type: source.fields['Type'],
        tx: source.fields['Tx'],
        jobId: source.fields['Job Title'],
        orgName: source.fields['Org Name'],
        created: new Date(source.fields['Created'] as string).getTime(),
        invoiceNr: source.fields['Invoice Nr'],
      } as Order
    }

    return undefined
  }

  public async CreateOrder(order: Order): Promise<string> {
    const response = await this.base('Orders').create({
      Name: order.name,
      Email: order.email,
      Address: order.address,
      Type: order.type,
      Tx: order.tx,
      OrgJobs: [order.jobId],
    })

    if (!response.id) {
      console.log('Unable to create job')
      return ''
    }

    return response.id
  }
}
