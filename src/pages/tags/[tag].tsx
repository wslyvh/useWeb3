import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Main as MainLayout } from 'components/layouts/main'
import { ContentItem } from 'types/content-item'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { SEO } from 'components/SEO'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import styles from '../pages.module.scss'
import { MarkdownContentService } from 'services/content'
import { FilteredOverview } from 'components/filtered-overview'

interface Props {
  categories: Array<Category>
  tag: string
  items: Array<ContentItem>
}

interface Params extends ParsedUrlQuery {
  tag: string
}

export default function Index(props: Props) {
  if (!props.tag) {
    return <></>
  }

  return (
    <NavigationProvider categories={props.categories}>
      <SEO title={`Explore #${props.tag} resources`} />

      <MainLayout className={styles.container} title={`#${props.tag}`}>
        <FilteredOverview title={props.tag} items={props.items} />
      </MainLayout>
    </NavigationProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const service = new MarkdownContentService()
  const tags = await service.GetTags()

  return {
    paths: tags.map(i => {
      return {
        params: { tag: i.key }
      }
    }),
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const tag = context.params?.tag
  if (!tag) {
    return {
      props: null,
      notFound: true,
    }
  }
  
  const service = new MarkdownContentService()
  const categories = await service.GetCategories()
  const items = await service.GetItemsByTag(tag)
  
  return {
    props: {
      categories,
      tag,
      items
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD
  }
}
