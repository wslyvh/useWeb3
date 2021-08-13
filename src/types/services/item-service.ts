import { Category } from "types/category";
import { ContentItem } from "types/content-item";

export interface ItemServiceInterface {
  GetCategory(id: string): Promise<Category | undefined>
  GetCategories(): Promise<Array<Category>>
  GetItems(category?: string, featured?: boolean): Promise<Array<ContentItem>>
}
  