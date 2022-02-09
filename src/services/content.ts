import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { Category } from 'types/category'
import { ContentItem } from 'types/content-item'
import { Count } from 'types/count'
import { ItemServiceInterface } from 'types/services/item-service'

const baseFolder = 'content'

export class MarkdownContentService implements ItemServiceInterface {
  public async GetCategory(id: string): Promise<Category | undefined> {
    return (await this.GetCategories()).find((i) => i.id === id)
  }

  public async GetCategories(): Promise<Array<Category>> {
    const dir = join(process.cwd(), baseFolder)
    const dirs = fs
      .readdirSync(dir, { withFileTypes: true })
      .filter(
        (i) =>
          i.isDirectory() &&
          fs.readdirSync(join(dir, i.name), { withFileTypes: true }).some((i) => i.isFile() && i.name.endsWith('.md'))
      )

    return dirs.map((i) => {
      const fullPath = join(dir, i.name, 'metadata.json')
      const content = fs.readFileSync(fullPath, 'utf8')

      if (!content) {
        console.log('File has no content..', i.name)
      }

      return JSON.parse(content) as Category
    })
  }

  public async GetTags(): Promise<Array<Count>> {
    const items = await this.GetItems()
    const initial: { [key: string]: number } = {}
    const tags = items.map((i) => i.tags)
    const reduced = tags.flat().reduce((acc: { [key: string]: number }, tag: string) => {
      acc[tag] ? (acc[tag] += 1) : (acc[tag] = 1)
      return acc
    }, initial)

    return Object.keys(reduced)
      .map((i) => {
        return {
          key: i,
          count: reduced[i],
        } as Count
      })
      .sort((a, b) => b.count - a.count)
  }

  public async GetLanguages(): Promise<Array<Count>> {
    const items = await this.GetItems()
    const initial: { [key: string]: number } = {}
    const languages = items.map((i) => i.languages)
    const reduced = languages.flat().reduce((acc: { [key: string]: number }, lang: string) => {
      acc[lang] ? (acc[lang] += 1) : (acc[lang] = 1)
      return acc
    }, initial)

    return Object.keys(reduced)
      .map((i) => {
        return {
          key: i,
          count: reduced[i],
        } as Count
      })
      .sort((a, b) => b.count - a.count)
  }

  public async GetItem(category: string, slug: string): Promise<ContentItem | undefined> {
    const cat = await this.GetCategory(category)
    const filePath = join(process.cwd(), baseFolder, category, slug + '.md')
    const content = fs.readFileSync(filePath, 'utf8')

    if (!cat || !content) {
      console.log('File has no content..', filePath)
      return undefined
    }

    return this.toItem(content, slug, cat)
  }

  public async GetItems(category?: string, featured?: boolean): Promise<Array<ContentItem>> {
    let items = new Array<ContentItem>()
    let categories = await this.GetCategories()
    if (category) {
      categories = categories.filter((i) => i.id === category)
    }

    categories.forEach((cat) => {
      const dir = join(process.cwd(), baseFolder, cat.id)
      const files = fs.readdirSync(dir, { withFileTypes: true }).filter((i) => i.isFile() && i.name.endsWith('.md'))

      const itemsByCategory = files
        .map((i) => {
          const fullPath = join(dir, i.name)
          const content = fs.readFileSync(fullPath, 'utf8')

          if (!content) {
            console.log('File has no content..', i.name)
          }

          const slug = i.name.replace('.md', '')
          return this.toItem(content, slug, cat)
        })
        .filter((i) => !!i)

      items = items.concat(itemsByCategory)
    })

    return items.filter((i) => (featured ? i.featured === featured : true))
  }

  public async GetItemsByTag(tag: string): Promise<Array<ContentItem>> {
    const items = await this.GetItems()
    return items.filter(
      (i) =>
        i.tags.some((x) => x.toLowerCase() === tag.toLowerCase()) ||
        i.languages.some((x) => x.toLowerCase() === tag.toLowerCase())
    )
  }

  private toItem(source: string, slug: string, cat: Category): ContentItem {
    const doc = matter(source)
    return {
      ...doc.data,
      id: slug,
      featured: doc.data.featured ?? false,
      date: new Date(doc.data.date as string).getTime(),
      dateAdded: new Date(doc.data.dateAdded as string).getTime(),
      url: doc.data.url ?? `/${cat.id}/${slug}`,
      content: doc.content,
      category: cat,
    } as ContentItem
  }
}
