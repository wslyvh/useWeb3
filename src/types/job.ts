import { Department, Tag, Type } from 'utils/jobs'
import { Organization } from './org'

export interface Job {
  id: string
  slug: string
  title: string
  department: Department
  description: string
  body: string
  contentType?: 'markdown' | 'html' // default = text
  location: string
  remote: boolean
  org: Organization
  url: string
  type?: Type
  minSalary?: number
  maxSalary?: number
  tags: Tag[]
  updated: number
  featured?: boolean
  featuredUntil?: number
}

export const defaultJob: Job = {
  id: '',
  slug: '',
  title: '',
  department: 'Engineering',
  description: '',
  body: '',
  location: 'Remote',
  remote: true,
  type: 'Full-time',
  org: {} as Organization,
  url: '',
  updated: new Date().getTime(),
  tags: [],
}
