import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Main as MainLayout } from 'components/layouts/main'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { SEO } from 'components/SEO'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import styles from 'pages/pages.module.scss'
import { MarkdownContentService } from 'services/content'
import { GetTrack, GetTrackIDs } from 'services/learn/filesystem'
import { Track } from 'types/learn'
import { LinkButton } from 'components/link-button'
import { Tags } from 'components/tags'
import { Tag } from 'components/tag'
import { getLevelStyle } from 'utils/helpers'
import { Link } from 'components/link'
import { Celebrate } from 'components/learn/celebrate'

interface Props {
  categories: Array<Category>
  track: Track
}

export default function Index(props: Props) {
  return (
    <NavigationProvider categories={props.categories}>
      <SEO title={props.track.name} divider="🧠" description={props.track.description} />

      <MainLayout className={styles.container} title={props.track.name}>
        <p>{props.track.description}</p>

        <div className={styles.icons}>
          {props.track.website && <LinkButton href={props.track.website} text="Website" type="website" />}
          {props.track.twitter && (
            <LinkButton href={`https://twitter.com/${props.track.twitter}`} text="Twitter" type="twitter" />
          )}
        </div>

        <main className={styles.body}>
          <p>
            Congratulations for finishing the <strong>{props.track.name}</strong> module!
          </p>

          <Celebrate />

          {props.track.reward && (
            <p>
              The following reward is available for you: <strong>{props.track.reward.id}</strong>
            </p>
          )}

          <p>
            <Link href="/learn">Explore more tracks &raquo;</Link>
          </p>
        </main>

        <article className={styles.tags}>
          <Tags
            tags={props.track.tags.map((i) => {
              return { key: i, count: 0 }
            })}
          />
          <Tag className={styles.level} text={props.track.level} type={getLevelStyle(props.track.level)} />
        </article>
      </MainLayout>
    </NavigationProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = GetTrackIDs()

  return {
    paths: ids.map((i) => {
      return { params: { track: i } }
    }),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const service = new MarkdownContentService()
  const categories = await service.GetCategories()
  const track = GetTrack((context.params?.track as string) ?? '')

  if (!track) {
    return {
      props: null,
      notFound: true,
    }
  }

  return {
    props: {
      categories,
      track,
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  }
}
