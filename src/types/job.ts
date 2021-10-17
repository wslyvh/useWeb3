import { Company } from "./company";

export interface Job {
    id: string
    title: string
    description?: string
    location: string
    company: Company
    url: string
    updated: number
}
