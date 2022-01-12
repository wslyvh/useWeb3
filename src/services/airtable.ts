import Airtable, { FieldSet } from 'airtable'
import { Category } from 'types/category'
import { ContentItem } from 'types/content-item'
import { Count } from 'types/count'
import { ItemServiceInterface } from 'types/services/item-service'

export class AirtableItemService implements ItemServiceInterface {
    private client: Airtable
    private base: Airtable.Base
  
    constructor() {
        if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_API_KEY) {
            throw new Error('Airtable API Base or Key not set.');
        }

        this.client = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
        this.base = this.client.base(process.env.AIRTABLE_API_BASE ?? '')
    }

    public async GetCategory(id: string): Promise<Category | undefined> {
        try {
          const records = await this.base('Category').select({
            filterByFormula: `SEARCH("${id}", {Slug})`,
          }).all()
    
          return records.map((i) => this.toCategory(i)).find((i) => !!i)
        } catch (e) {
          console.log('GetCategory', 'Unable to fetch category', id)
          console.error(e)
        }
    }
    
    public async GetCategories(): Promise<Array<Category>> {
        try {
          const records = await this.base('Category').select({
            filterByFormula: `({Items})`,
          }).all()
    
          return records.map((i) => this.toCategory(i)).sort((a, b) => a.title.localeCompare(b.title))
        } catch (e) {
          console.log('GetCategories', 'Unable to fetch categories')
          console.error(e)
        }
    
        return []
    }

    public async GetTags(): Promise<Array<Count>> {
        try {
          const records = await this.base('Items').select({
            fields: ['Tags'],
            filterByFormula: `AND(
                ({Status} = 'Accepted'),
                ({Tags})
              )
          `}).all()
    
          const initial: {[key: string]: number} = {}
          const tags = records.map((i) => i.fields['Tags'] as string[])
          const reduced = tags.flat().reduce((acc: {[key: string]: number}, tag: string) => {
            acc[tag] ? acc[tag] += 1 : acc[tag] = 1
            return acc
          }, initial)

          return Object.keys(reduced).map(i => {
            return { 
              key: i,
              count: reduced[i]
            } as Count
          }).sort((a, b) => b.count - a.count)
        } catch (e) {
          console.log('GetTags', 'Unable to fetch tags')
          console.error(e)
        }
    
        return []
    }

    public async GetItem(category: string, slug: string): Promise<ContentItem | undefined> {
        try {
            const records = await this.base('Items').select({
                filterByFormula: `AND(
                    ({Status} = 'Accepted'),
                    ({Category Slug} = "${category}"),
                    ({Slug} = "${slug}")
                  )
            `}).all()

            return records.map((i) => this.toItem(i)).find((i) => !!i)
        } catch (e) {
          console.log('GetItem', 'Unable to fetch item', category, slug)
          console.error(e)
        }

        return undefined
    }

    public async GetItems(category?: string, featured?: boolean): Promise<Array<ContentItem>> {
        try {
            const records = await this.base('Items').select({
                filterByFormula: `AND(
                    ({Status} = 'Accepted')
                    ${category ? `, ({Category Slug} = "${category}")` : ''}
                    ${featured ? `, ({Featured})` : ''}
                    )
            `}).all()
    
            return records.map((i) => this.toItem(i))
        } catch (e) {
          console.log('GetItems', 'Unable to fetch items', category, featured)
          console.error(e)
        }
    
        return []
    }

    public async GetItemsByTag(tag: string): Promise<Array<ContentItem>> {
        try {
            const records = await this.base('Items').select({
                filterByFormula: `AND(
                    ({Status} = 'Accepted'),
                    (FIND(", ${tag.toLowerCase()}, ", ", " & LOWER(ARRAYJOIN(Tags)) & ", ") > 0)
                  )
            `}).all()
    
            return records.map((i) => this.toItem(i))
        } catch (e) {
          console.log('GetItems', 'Unable to fetch items by tag', tag)
          console.error(e)
        }
    
        return []
    }

    private toCategory(source: Airtable.Record<FieldSet>): Category {
      return {
        id: source.fields['Slug'],
        title: source.fields['Title'],
        description: source.fields['Description'] ?? '',
        emoji: source.fields['Emoji'] ?? ''
      } as Category
    }
    
    private toItem(source: Airtable.Record<FieldSet>): ContentItem {
      let item: ContentItem = {
          id: source.fields['Slug'],
          title: source.fields['Title'],
          description: source.fields['Description'],
          authors: source.fields['Authors'] ? source.fields['Authors'] as string[] : [],
          level: source.fields['Level'],
          tags: source.fields['Tags'] ? source.fields['Tags'] as string[] : [],
          url: source.fields['Url'],
          featured: source.fields['Featured'] ?? false,
          category: {
            id: source.fields['Category Slug'] ? (source.fields['Category Slug'] as string[])[0]: '',
            title: source.fields['Category Title'] ? (source.fields['Category Title'] as string[])[0]: ''
          },
          created: new Date(source._rawJson.createdTime as string).getTime()
      } as ContentItem

      if (source.fields['Date']) item.date = new Date(source.fields['Date'] as string).getTime()
      if (source.fields['Content']) item.content = source.fields['Content'] as string
      if (source.fields['Alternate Url']) item.alternateUrl = source.fields['Alternate Url'] as string
      
      return item
    }
}