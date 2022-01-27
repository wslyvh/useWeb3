import fs from 'fs'
import moment from 'dayjs'
import { AirtableItemService } from './services/airtable'
import * as dotenv from 'dotenv'
dotenv.config()

console.log('Airtabe -> to markdown migration..')
run()

async function run() {
  const service = new AirtableItemService()

  // Categories
  console.log('Getting all categories..')
  const categories = await service.GetCategories()
  console.log('Categories to migrate', categories.length)

  const baseFolder = 'content'
  categories.forEach((category) => {
    const dir = baseFolder + '/' + category.id
    if (!fs.existsSync(dir)) {
      console.log('Create dir', dir)
      fs.mkdirSync(dir)
    }

    if (!fs.existsSync(`${dir}/metadata.json`)) {
      console.log('Create metadata file...')
      fs.writeFileSync(`${dir}/metadata.json`, JSON.stringify(category, null, 4))
    }
  })
  console.log('Categories finished!')

  // Items
  console.log('Getting all items..')
  const items = await service.GetItems()
  console.log('Items to migrate', items.length, items[0])

  items.forEach((item) => {
    const file = `${baseFolder}/${item.category.id}/${item.id}.md`
    const attributes = Object.entries(item)
    let markdown = `---${attributes.reduce((acc, [key, value], index) => {
      if (key === 'id' || key === 'category' || key === 'content' || key === 'created') return (acc += '')
      if (key === 'featured') {
        if (value) {
          return (acc += `\n${key}: true`)
        } else {
          return (acc += '')
        }
      }

      if (typeof value === 'number') {
        const date = new Date(value)
        return (acc += `\n${key}: ${moment(date).format('YYYY-MM-DD')}`)
      }
      if (typeof value === 'undefined') return (acc += `\n${key}: ''`)
      if (typeof value === 'string') return (acc += `\n${key}: "${value.trim().replace('"', "'")}"`)
      if (typeof value === 'object' && Array.isArray(value)) {
        return (acc += `\n${key}: [${value.map((item) => `"${item}"`)}]`)
      }

      return (acc += `\n${key}: "${value}"`)
    }, '')}\n---\n`

    const content = attributes.find((i) => i[0] === 'content')
    if (content && content.length > 1 && content[1]) {
      markdown += `\n${content[1]}`
    }

    console.log('Creating file...', `${item.id}.md`)
    fs.writeFileSync(file, markdown)
  })
  console.log('Items finished!')
}
