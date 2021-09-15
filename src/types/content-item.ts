import { Category } from "./category";

export interface ContentItem {
    id: string
    title: string
    description: string
    content?: string
    authors: Array<string>
    date?: number
    level: 'All' | 'Beginner' | 'Intermediate' | 'Advanced'
    tags: Array<string>
    url: string
    alternateUrl?: string
    featured?: boolean
    category: Category
    created: number
}