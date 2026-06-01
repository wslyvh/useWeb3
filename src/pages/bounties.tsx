import React from 'react'
import { ContentItem } from 'types/content-item'
import { GetStaticProps } from 'next'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import styles from './pages.module.scss'
import { MarkdownContentService } from 'services/content'
import { TopnavLayout } from 'components/layouts/topnav'
import { SEO } from 'components/SEO'
import { BountySource } from 'types/bounty'
import { GetBountySources } from 'services/bounties'
import { BountiesOverview } from 'components/bounties'

interface Props {
  categories: Array<Category>
  items: Array<ContentItem>
  sources: BountySource[]
}

export default function Index(props: Props) {
  return (
    <NavigationProvider categories={props.categories}>
      <SEO title="Bounties" divider="💸" description="Find Web3 bounty platforms, quests, grants, and paid open-source contribution opportunities." />
      <TopnavLayout className={styles.container} title="Web3 Bounties">
        <BountiesOverview sources={props.sources} />
      </TopnavLayout>
    </NavigationProvider>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const service = new MarkdownContentService()
  const items = await service.GetItems('', true)
  const categories = await service.GetCategories()

  return {
    props: {
      items,
      categories,
      sources: GetBountySources(),
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  }
}
