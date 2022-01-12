
import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { Category } from 'types/category'
import { ContentItem } from 'types/content-item'

const baseFolder = 'content'

export function GetCategories(): Array<Category> {
    const dir = join(process.cwd(), baseFolder)
    const dirs = fs.readdirSync(dir, { withFileTypes: true }).filter(i => i.isDirectory())

    return dirs.map(i => {
        const fullPath = join(dir, i.name, 'metadata.json')
        const content = fs.readFileSync(fullPath, 'utf8')

        if (!content) {
            console.log('File has no content..', i.name)
        }
        
        return JSON.parse(content) as Category
    })
}

export function GetCategory(id: string): Category | undefined {
    return GetCategories().find(i => i.id === id)
}

export function GetItems(category: string, featured?: boolean): Array<ContentItem> {
    const cat = GetCategory(category)
    if (!cat) return[]
    
    const dir = join(process.cwd(), baseFolder, category)
    const files = fs.readdirSync(dir, { withFileTypes: true }).filter(i => i.isFile() && i.name.endsWith('.md'))

    const items = files.map(i => {
        const fullPath = join(dir, i.name)
        const content = fs.readFileSync(fullPath, 'utf8')

        if (!content) {
            console.log('File has no content..', i.name)
        }

        const doc = matter(content)
        return { 
            ...doc.data,
            id: i.name.replace('.md', ''),
            featured: doc.data.featured ?? false,
            date: new Date(doc.data.date as string).getTime(),
            content: doc.content,
            category: cat
        } as ContentItem
    }).filter(i => !!i) 
    
    return items.filter(i => featured ? i.featured === featured : true)   
}
