import { Category } from "types/category";
import { ContentItem } from "types/content-item";

export interface ItemServiceInterface {
  GetCategory(id: string): Promise<Category | undefined>
  GetCategories(): Promise<Array<Category>>
  GetItem(category: string, slug: string): Promise<ContentItem | undefined>
  GetItems(category?: string, featured?: boolean): Promise<Array<ContentItem>>
  GetItemsByTag(tag?: string): Promise<Array<ContentItem>>
}
  