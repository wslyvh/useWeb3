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
import { Link } from 'components/link'

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

        <h3>In this module </h3>
        <small>{props.track.lessons.length} lessons</small>
        <ul>
          {props.track.lessons.map((i) => {
            return <li>{i.name}</li>
          })}
        </ul>

        <Link href={`/learn/${props.track.id}/${props.track.lessons[0].id}`}>Start Module</Link>
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
