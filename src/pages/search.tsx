import React from 'react'
import { ParsedUrlQuery } from 'querystring'
import { ContentItem } from 'types/content-item'
import { GetStaticProps } from 'next'
import { Category } from 'types/category'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import { MarkdownContentService } from 'services/content'

import { Main as MainLayout } from 'components/layouts/main'
import { NavigationProvider } from 'context/navigation'
import styles from './pages.module.scss'
import { Featured } from 'components/featured'
import { SEO } from 'components/SEO'

interface Props {
  categories: Array<Category>
  items: Array<ContentItem>
}

interface Params extends ParsedUrlQuery {
  category: string
}

export default function Search(props: Props) {
  return (
    <NavigationProvider categories={props.categories}>
      <SEO
        title='Search for content in useWeb3'
        description='Find the latest Web3, Solidity, Ethereum, developer, engineering, product &amp; software jobs in the Web3 ecosystem.'
      />
      <MainLayout className={styles.container} title='Search'>
        <article>
          <p>
            Find the latest Web3, Solidity, Ethereum, developer, engineering, product &amp; software jobs in the Web3
            ecosystem.
          </p>
        </article>

        <main>
          <Featured type='rows'>
            <div>TEST</div>
          </Featured>
        </main>
      </MainLayout>
    </NavigationProvider>
  )
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const category_ids = [
    'videos',
    'tutorials',
    'starter-kits',
    'podcasts',
    'movies',
    'guides',
    'courses',
    'code-challenges',
    'books',
  ]

  const categoryId = 'videos'
  if (category_ids.length <= 0) {
    return {
      props: null,
      notFound: true,
    }
  }

  const service = new MarkdownContentService()
  const category = await service.GetCategory(categoryId)
  if (!category) {
    return {
      props: null,
      notFound: true,
      revalidate: DEFAULT_REVALIDATE_PERIOD,
    }
  }

  const categories = await service.GetCategories()
  const items = await service.GetItems(categoryId, false)
  console.log(items)
  return {
    props: {
      key: categoryId,
      categories,
      category,
      items,
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  }
}
