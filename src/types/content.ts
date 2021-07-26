export interface BaseContentType {
    title: string
    description: string
    authors: Array<string>
    year?: number
    featured?: boolean
    level: 'all' | 'beginner' | 'intermediate' | 'advanced'
    tags: Array<string>
    url: string
    body?: string
    type?: string
}
