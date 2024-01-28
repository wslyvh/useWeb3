import dotenv from 'dotenv'
import { MarkdownContentService } from '../services/content'
import { AddToGithub } from 'utils/github'
import { defaultSlugify } from 'utils/helpers'

dotenv.config()

console.log('List Awesome resources')
run()

async function run() {
  const service = new MarkdownContentService()
  const categories = await service.GetCategories()

  // Categories
  // Books, Code challenges, Courses, Earn, Games, Guides
  // Movies, Podcasts, Starter Kits, Tools, Videos, Websites
  let readme = ''
  readme += '# Awesome Web3 Resources 🛠️\n'
  readme +=
    'Explore the latest resources and get familiar with the core concepts and fundamentals. Learning from tutorials, courses, books, videos or code challenges and start building!'
  readme += '\n\n'

  readme += 'Want to see more awesomeness? Check out our [website](https://www.useweb3.xyz/) or follow us on [Twitter](https://twitter.com/useWeb3).'
  readme += '\n\n'

  // Generate contents
  readme += '## Contents \n'
  categories.forEach((cat) => {
    // slugify replaces '&' with and '-' replacing as empty for header titles
    readme += `- [${cat.title}](#${defaultSlugify(cat.title).replace('and', '')}-)\n`
  })
  readme += '\n\n'

  // Generate categories & items
  for (let c = 0; c < categories.length; c++) {
    const category = categories[c]
    readme += `## ${category.title} ${category.emoji} \n`
    readme += category.description
    readme += '\n\n'

    const items = await service.GetItems(category.id)
    items.forEach((item) => {
      readme += `- ${item.title} - ${item.url} \n`
    })
    readme += '\n\n'
  }

  // console.log('README', readme)
  await AddToGithub('README.md', readme)
}
