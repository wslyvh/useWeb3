import { Company } from "./company";

export interface Job {
    id: string
    title: string
    description?: string
    body?: string
    location: string
    company: Company
    url: string
    updated: number
}
