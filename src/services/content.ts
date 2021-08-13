
import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter';
import { ContentItem } from 'types/content-item';

const baseFolder = 'src/content'

export function getCategories(): Array<string> {
    const contentDirectory = join(process.cwd(), baseFolder)
    const dirs = fs.readdirSync(contentDirectory, { withFileTypes: true })
        .filter(i => i.isDirectory())
        .map(i => i.name)

    return dirs    
}

export function getItemsPerCategory(category: string): Array<ContentItem> {
    const categoryDirection = join(process.cwd(), baseFolder, category)
    const files = fs.readdirSync(categoryDirection, { withFileTypes: true })
        .filter(i => i.isFile() && i.name.endsWith('.md'))
    const items = files.map(i => {
        const fullPath = join(categoryDirection, i.name)
        const content = fs.readFileSync(fullPath, 'utf8')
        if (!content) {
            console.log('File has no content..', i.name)
        }
        
        if (content) {
            const doc = matter(content)
            return { 
                ...doc.data,
                type: category,
                body: doc.content
            } as ContentItem
        }
    }).filter(i => !!i) as Array<ContentItem> 
    
    return items
}