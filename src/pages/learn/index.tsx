import React from 'react'
import { GetStaticProps } from 'next'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { SEO } from 'components/SEO'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import styles from 'pages/pages.module.scss'
import { MarkdownContentService } from 'services/content'
import { GetTracks } from 'services/learn/filesystem'
import { Track } from 'types/learn'
import { Featured } from 'components/featured'
import { TopnavLayout } from 'components/layouts/topnav'
import { PanelCard } from 'components/panel'

interface Props {
  categories: Array<Category>
  tracks: Array<Track>
}

export default function Index(props: Props) {
  const title = 'Learn Web3'
  const description = 'Learn more about Web3, Ethereum, and other topics.'

  return <></>
  
  return (
    <NavigationProvider categories={props.categories}>
      <SEO title={`${title}`} divider="🧠" description={description} />

      <TopnavLayout className={styles.container} title={title}>
        <p>A free, fun and engaging way to learn more about Web3, its projects and their communities.</p>
        <p>
          <i>Learn by doing and level up your skills with fresh challenges.</i>
        </p>

        <main>
          <Featured type="rows">
            {props.tracks.map((i) => {
              return (
                <PanelCard
                  key={i.id}
                  title={i.name}
                  description={i.description}
                  url={`/learn/${i.id}`}
                  level={i.level}
                  tags={i.tags}
                />
              )
            })}
          </Featured>
        </main>
      </TopnavLayout>
    </NavigationProvider>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const service = new MarkdownContentService()
  const categories = await service.GetCategories()
  const tracks = await GetTracks()

  return {
    props: {
      categories,
      tracks,
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  }
}
