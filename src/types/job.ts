import { Company } from './company'

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
  minSalary?: number
  maxSalary?: number
  company: Company
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
  company: {} as Company,
  url: '',
  updated: new Date().getTime(),
}
