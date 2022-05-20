import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { ContentItem } from 'types/content-item'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { SEO } from 'components/SEO'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import styles from './pages.module.scss'
import { MarkdownContentService } from 'services/content'
import { FilteredOverview } from 'components/filtered-overview'
import { Job } from 'types/job'
import { TopnavLayout } from 'components/layouts/topnav'

interface Props {
  categories: Array<Category>
  category?: Category
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
        title={`Web3 ${props.category.title}`}
        divider={props.category.emoji}
        description={props.category.description}
      />

      <TopnavLayout
        className={styles.container}
        title={`Web3 ${props.category.title}`}
        action={{
          href: `https://github.com/wslyvh/useWeb3/tree/main/content/${props.category.id}`,
          text: `Submit ${
            props.category.title.endsWith('s') ? props.category.title.slice(0, -1) : props.category.title
          }`,
        }}>
        <FilteredOverview title={props.category.title} description={props.category.description} items={props.items} />
      </TopnavLayout>
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
  const categoryId = context.params?.category ?? ''
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
      jobs: new Array<Job>(),
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  }
}
