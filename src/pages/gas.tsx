import React from 'react'
import { Main as MainLayout } from 'components/layouts/main'
import { GetStaticProps } from 'next'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import styles from './pages.module.scss'
import { SEO } from 'components/SEO'
import { MarkdownContentService } from 'services/content'
import { Heatmap } from 'components/heatmap'
import { GasPriceService } from 'services/gas'
import { Heatmap as HeatmapType } from 'types/gas'

interface Props {
  categories: Array<Category>
  heatmap: HeatmapType
}

export default function Index(props: Props) {
  return (
    <NavigationProvider categories={props.categories}>
      <SEO
        title="ETH Gas tracker"
        divider="⛽"
        description="Monitor and track the Ethereum gas price to reduce transaction fees save money."
      />
      <MainLayout className={styles.container} title="Gas tracker">
        <Heatmap data={props.heatmap.data} x={props.heatmap.x} y={props.heatmap.y} />
      </MainLayout>
    </NavigationProvider>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const service = new MarkdownContentService()
  const categories = await service.GetCategories()

  const gasService = new GasPriceService()
  const gasPrices = await gasService.GetPrices()
  const heatmap = gasService.AsHeatmapData(gasPrices)

  return {
    props: {
      categories,
      heatmap
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  }
}
