import * as dotenv from 'dotenv'
import { MarkdownContentService } from '../services/content'

dotenv.config()

console.log('List Awesome resources')
run()

async function run() {
  const service = new MarkdownContentService()
  const categories = await service.GetCategories()

  // Categories
  // Books, Code challenges, Courses, Earn, Games, Guides
  // Movies, Podcasts, Starter Kits, Tools, Videos, Websites
  for (let c = 0; c < categories.length; c++) {
    const category = categories[c]
    console.log(`${category.title} ${category.emoji}`)
    console.log(category.description)
    console.log()

    const items = await service.GetItems(category.id)
    items.forEach((item) => {
      console.log(`- ${item.title} - ${item.url}`)
    })
    console.log()
  }

  categories.forEach(async (category) => {})
}
