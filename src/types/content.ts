export interface BaseContentType {
    title: string
    description: string
    type: string
    level?: 'all' | 'beginner' | 'intermediate' | 'advanced'
    url: string
    body?: string
}