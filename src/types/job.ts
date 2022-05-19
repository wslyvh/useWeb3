import { Organization } from './org'

export interface Job {
  id: string
  slug: string
  title: string
  department: 'Engineering' | 'Product' | 'Sales' | 'Marketing' | 'People' | 'Operations' | 'Non-Tech' | 'Other'
  description?: string
  body?: string
  asMarkdown?: boolean
  location: string
  remote: boolean
  parttime?: boolean
  minSalary?: number
  maxSalary?: number
  org: Organization
  url: string
  updated: number
  featured?: boolean
  featuredUntil?: number
}

export const defaultJob = {
  id: '',
  slug: '',
  title: '',
  department: 'Engineering' as
    | 'Engineering'
    | 'Product'
    | 'Sales'
    | 'Marketing'
    | 'People'
    | 'Operations'
    | 'Non-Tech'
    | 'Other',
  description: '',
  body: '',
  location: 'Remote',
  remote: true,
  org: {} as Organization,
  url: '',
  updated: new Date().getTime(),
}
