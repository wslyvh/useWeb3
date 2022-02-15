import { Company } from './company'

export interface Job {
  id: string // slug
  title: string
  department: 'Engineering' | 'Product' | 'Sales' | 'Marketing' | 'People' | 'Operations' | 'Non-Tech' | 'Other'
  description?: string
  body?: string
  location: string
  remote?: boolean
  parttime?: boolean
  company: Company
  url: string
  updated: number
  featured: boolean
  featuredUntil?: number
}
