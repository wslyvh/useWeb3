import Airtable from 'airtable';
import slugify from 'slugify';
import { Category } from 'types/category';
import { ContentItem } from 'types/content-item';
import { ItemServiceInterface } from 'types/services/item-service';

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
    
          const categories = records.map((i) => {
            return {
                id: i.fields['Slug'],
                title: i.fields['Title'],
                description: i.fields['Description'] ?? '',
                emoji: i.fields['Emoji'] ?? ''
            } as Category
          })
          return categories.find((i) => !!i)
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
    
          return records.map((i) => {
            return {
                id: i.fields['Slug'],
                title: i.fields['Title'],
                description: i.fields['Description'] ?? '',
                emoji: i.fields['Emoji'] ?? ''
            } as Category
          }).sort((a, b) => a.title.localeCompare(b.title))
        } catch (e) {
          console.log('GetCategories', 'Unable to fetch categories')
          console.error(e)
        }
    
        return []
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
    
            return records.map((i) => {
                const title = i.fields['Title'] as string
                return {
                    id: slugify(title),
                    title: title,
                    description: i.fields['Description'],
                    content: i.fields['Content'],
                    authors: i.fields['Authors'] ? i.fields['Authors'] as string[] : [],
                    date: i.fields['Date'] ? new Date(i.fields['Date'] as string).getTime() : new Date(0),
                    level: i.fields['Level'],
                    tags: i.fields['Tags'] ? i.fields['Tags'] as string[] : [],
                    url: i.fields['Url'],
                    featured: i.fields['Featured'] ?? false,
                    category: {
                      id: i.fields['Category Slug'] ? (i.fields['Category Slug'] as string[])[0]: '',
                      title: i.fields['Category Title'] ? (i.fields['Category Title'] as string[])[0]: ''
                    }
                } as ContentItem
            })
        } catch (e) {
          console.log('GetItems', 'Unable to fetch items', category, featured)
          console.error(e)
        }
    
        return []
    }
}