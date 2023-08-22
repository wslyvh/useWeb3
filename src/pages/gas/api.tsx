import React from 'react'
import { GetStaticProps } from 'next'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import { SEO } from 'components/SEO'
import { MarkdownContentService } from 'services/content'
import { TopnavLayout } from 'components/layouts/topnav'
import styles from '../pages.module.scss'
import { Panel } from 'components/panel'
import { useEtherPrice } from 'hooks/useEtherPrice'
import { useGasPrice } from 'hooks/useGasPrice'
import { GasNotifications } from 'components/gas-notifications'

interface Props {
  categories: Array<Category>
}

export default function Index(props: Props) {
  const { gasPrice, priorityFee } = useGasPrice(15000)
  const title = 'Ethereum Gas Tracker API'
  const description = 'Get access to Ethereum gas price data through our Gas Tracker API.'

  return (
    <NavigationProvider categories={props.categories}>
      <SEO title={title} divider="⛽" description={description} />
      <TopnavLayout className={styles.container} title={title} hideNewsletter>
        <section>
          <p>
            <Panel fill>
              ⛽ {gasPrice > 0 ? gasPrice : '-'} Max fee | {priorityFee > 0 ? priorityFee : '-'} priority
            </Panel>
          </p>
        </section>

        <article>
          <p>{description}</p>
        </article>

        <article>
          <GasNotifications type="api" description="Register for API Access" />
        </article>
      </TopnavLayout>
    </NavigationProvider>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const service = new MarkdownContentService()
  const categories = await service.GetCategories()

  return {
    props: {
      categories,
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  }
}
