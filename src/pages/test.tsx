import React from 'react'
import { ParsedUrlQuery } from 'querystring'
import { Featured } from 'components/featured'
import { ContentItem } from 'types/content-item'
import { GetStaticProps } from 'next'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import styles from './pages.module.scss'
import { MarkdownContentService } from 'services/content'
import { Link } from 'components/link'
import { Departments } from 'components/departments'
import { DEPARTMENTS } from 'utils/jobs'
import { TopnavLayout } from 'components/layouts/topnav'
import { Panel, PanelCard } from 'components/panel'

interface Props {
  categories: Array<Category>
  items: Array<ContentItem>
}

interface Params extends ParsedUrlQuery {
  category: string
}

export default function Index(props: Props) {
  return (
    <NavigationProvider categories={props.categories}>
      <TopnavLayout className={styles.container}>
        <p>
          <Panel>
            <span style={{ fontSize: '24px' }}>W³</span>
          </Panel>
        </p>
        <p>
          <Panel>Explore.</Panel>
        </p>
        <p>
          <Panel type="secondary">Learn.</Panel>
        </p>
        <p>
          <Panel type="tertiary">Build.</Panel>
        </p>

        <p>
          <Panel type="info" small>
            info
          </Panel>{' '}
          <Panel type="success" small>
            success
          </Panel>{' '}
          <Panel type="warning" small>
            warning
          </Panel>{' '}
          <Panel type="error" small>
            error
          </Panel>
        </p>

        <p>
          <Panel small>Small</Panel>
        </p>
        <p>
          <Panel>Normal</Panel>
        </p>
        <p>
          <Panel large>Large</Panel>
        </p>

        <p>
          <Panel fill>Fill</Panel>
        </p>
        <p>
          <Panel href="https://www.useweb3.xyz/">useWeb3.xyz</Panel>
        </p>

        <p>
          <PanelCard
            title="CryptoZombies"
            icon="🏆"
            description="Learn to Code Blockchain DApps By Building Simple Games"
            url="https://cryptozombies.io/"
            level="Intermediate"
            tags={['Smart Contracts', 'Solidity', 'Games']}
          />
        </p>
      </TopnavLayout>
    </NavigationProvider>
  )
}

export const getStaticProps: GetStaticProps<Props, Params> = async () => {
  const service = new MarkdownContentService()
  const items = await service.GetItems('', true)
  const categories = await service.GetCategories()

  return {
    props: {
      items,
      categories,
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  }
}
