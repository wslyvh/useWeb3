import { Category } from "types/category"
import { ContentItem } from "types/content-item"
import { Count } from "types/count"

export interface ItemServiceInterface {
  GetCategory(id: string): Promise<Category | undefined>
  GetCategories(): Promise<Array<Category>>
  GetTags(): Promise<Array<Count>>
  GetItem(category: string, slug: string): Promise<ContentItem | undefined>
  GetItems(category?: string, featured?: boolean): Promise<Array<ContentItem>>
  GetItemsByTag(tag?: string): Promise<Array<ContentItem>>
}
  