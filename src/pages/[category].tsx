import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Main as MainLayout } from 'components/layouts/main'
import { ContentItem } from 'types/content-item'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { SEO } from 'components/SEO'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import styles from './pages.module.scss'
import { MarkdownContentService } from 'services/content'
import { FilteredOverview } from 'components/filtered-overview'

interface Props {
  categories: Array<Category>
  category: Category
  items: Array<ContentItem>
}

interface Params extends ParsedUrlQuery {
  category: string
}

export default function Index(props: Props) {
  if (!props.category) {
    return <></>
  }

  return (
    <NavigationProvider categories={props.categories}>
      <SEO
        title={`Learn from ${props.category.emoji} ${props.category.title}`}
        description={props.category.description}
      />

      <MainLayout className={styles.container} title={props.category.title}>
        <FilteredOverview title={props.category.title} description={props.category.description} items={props.items} />
      </MainLayout>
    </NavigationProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const service = new MarkdownContentService()
  const categories = await service.GetCategories()

  return {
    paths: categories.map((i) => {
      return {
        params: { category: i.id },
      }
    }),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const categoryId = context.params?.category
  if (!categoryId) {
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
