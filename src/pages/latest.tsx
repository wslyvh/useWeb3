import React from 'react'
import { GetStaticProps } from 'next'
import { ContentItem } from 'types/content-item'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { SEO } from 'components/SEO'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import styles from './pages.module.scss'
import { MarkdownContentService } from 'services/content'
import { FilteredOverview } from 'components/filtered-overview'
import moment from 'moment'
import { TopnavLayout } from 'components/layouts/topnav'

interface Props {
  categories: Array<Category>
  items: Array<ContentItem>
}

export default function Index(props: Props) {
  const title = 'Recently added'
  const description = 'Here you can find the latest, most recently added resources to the site.'
  return (
    <NavigationProvider categories={props.categories}>
      <SEO title={`${title} resources`} divider="⏱️" description={description} />

      <TopnavLayout className={styles.container} title={title}>
        <FilteredOverview title={title} description={description} items={props.items} />
      </TopnavLayout>
    </NavigationProvider>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const service = new MarkdownContentService()
  const categories = await service.GetCategories()
  const items = await service.GetItems()

  return {
    props: {
      categories,
      items: items.filter((i) => moment(i.dateAdded) >= moment().subtract(30, 'days')),
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  }
}
