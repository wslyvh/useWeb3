import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
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
import { getLevelStyle } from 'utils/helpers'
import { Link } from 'components/link'
import { TopnavLayout } from 'components/layouts/topnav'
import { Panel } from 'components/panel'

interface Props {
  categories: Array<Category>
  track: Track
}

export default function Index(props: Props) {
  return (
    <NavigationProvider categories={props.categories}>
      <SEO title={props.track.name} divider="🧠" description={props.track.description} />

      <TopnavLayout className={styles.container} title={props.track.name}>
        <p>{props.track.description}</p>

        <div className={styles.icons}>
          {props.track.website && <LinkButton href={props.track.website} text="Website" type="website" />}
          {props.track.twitter && (
            <LinkButton href={`https://twitter.com/${props.track.twitter}`} text="Twitter" type="twitter" />
          )}
        </div>

        <article>
          <h2>Lessons</h2>
          <small>{props.track.lessons.length} lessons </small>
          <Panel className={styles.level} type={getLevelStyle(props.track.level)}>
            {props.track.level}
          </Panel>
        </article>

        <main className={styles.body}>
          <ul>
            {props.track.lessons.map((i) => {
              return (
                <li key={i.id}>
                  <strong>{i.name}</strong>
                  <p>{i.description}</p>
                </li>
              )
            })}
          </ul>
        </main>

        <div className={`${styles.icons}`}>
          <LinkButton
            href={`/learn/${props.track.id}/${props.track.lessons[0].id}`}
            text="Start &raquo;"
            type="secondary"
          />
          <Link href="/learn">Explore more tracks &raquo;</Link>
        </div>

        {props.track.tags && props.track.tags.length > 0 && (
          <>
            <h2>Tags</h2>
            <article className={styles.tags}>
              <Tags
                tags={props.track.tags.map((i) => {
                  return { key: i, count: 0 }
                })}
              />
            </article>
          </>
        )}
      </TopnavLayout>
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
