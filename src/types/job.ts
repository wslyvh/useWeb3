import { Company } from "./company";

export interface Job {
    id: string // slug 
    title: string
    description?: string
    body?: string
    location: string
    company: Company
    url: string
    updated: number
    featured: boolean
    featuredUntil?: number
}
