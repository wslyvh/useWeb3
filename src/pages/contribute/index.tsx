import React from 'react'
import { ParsedUrlQuery } from 'querystring'
import { ContentItem } from 'types/content-item'
import { GetStaticProps } from 'next'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { DEFAULT_MAX_ITEMS, DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import styles from '../pages.module.scss'
import { MarkdownContentService } from 'services/content'
import { TopnavLayout } from 'components/layouts/topnav'
import { GetIssues } from 'services/issue'
import { SEO } from 'components/SEO'
import { Issue } from 'types/issue'
import { PagedResult } from 'types/paged'
import { IssuesOverview } from 'components/issues'

interface Props {
  categories: Array<Category>
  items: Array<ContentItem>
  results: PagedResult<Issue>
}

interface Params extends ParsedUrlQuery {
  category: string
}

export default function Index(props: Props) {
  return (
    <NavigationProvider categories={props.categories}>
      <SEO
        title="Contribute"
        divider="✨"
        description="Make your first contribution to any open-source Web3 project by tackling on of these 'Good first' issues."
      />
      <TopnavLayout className={styles.container} title="Contribute to open-source Web3 projects">
        <IssuesOverview results={props.results} />
      </TopnavLayout>
    </NavigationProvider>
  )
}

export const getStaticProps: GetStaticProps<Props, Params> = async () => {
  const service = new MarkdownContentService()
  const items = await service.GetItems('', true)
  const categories = await service.GetCategories()
  const issues = await GetIssues()

  return {
    props: {
      items,
      categories,
      results: {
        total: issues.length,
        currentPage: 1,
        items: issues.slice(0, DEFAULT_MAX_ITEMS),
      },
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  }
}
