import { Category } from './category'

export interface ContentItem {
  id: string
  title: string
  description: string
  content: string
  authors: Array<string>
  date?: number
  levels: Array<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>
  tags: Array<string>
  languages: Array<string>
  url: string
  alternateUrl?: string
  featured?: boolean
  category: Category
  dateAdded: number
}
