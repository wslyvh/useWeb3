import { Company } from './company'

export interface Job {
  id: string // slug
  title: string
  department: 'Engineering' | 'Product' | 'Sales' | 'Marketing' | 'People' | 'Operations' | 'Non-Tech' | 'Other'
  description?: string
  body?: string
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
