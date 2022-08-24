import React from 'react'
import moment from 'moment'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { ContentItem } from 'types/content-item'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { SEO } from 'components/SEO'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import { getYoutubeVideoId, toTags } from 'utils/helpers'
import { Authors } from 'components/authors'
import { Tags } from 'components/tags'
import { YoutubeEmbed } from 'components/youtube-embed'
import { getLevelStyle } from 'utils/helpers'
import styles from '../pages.module.scss'
import { Link } from 'components/link'
import { MarkdownContentService } from 'services/content'
import { marked } from 'marked'
import { useRouter } from 'next/router'
import { TopnavLayout } from 'components/layouts/topnav'
import { Panel } from 'components/panel'
import { Metadata } from 'components/Metadata'

interface Props {
  categories: Array<Category>
  item: ContentItem
}

interface Params extends ParsedUrlQuery {
  category: string
  resource: string
}

export default function Index(props: Props) {
  const router = useRouter()
  if (!props.item) {
    return <></>
  }
  const websiteIsSameCurrentPage = props.item.url.includes(router.asPath) // e.g. Guides do not contain external links
  const youtubeVideoId = props.item.category.title === 'Videos' ? getYoutubeVideoId(props.item.url) : null

  return (
    <NavigationProvider categories={props.categories}>
      <SEO title={props.item.title} description={props.item.description} />
      <Metadata type='content' data={props.item} />

      <TopnavLayout className={styles.container} title={props.item.title}>
        <ul className={styles.properties}>
          <li>
            <span className={styles.icon}>{props.item.category.emoji}</span>
            <Link className={styles.mr} href={`/${props.item.category.id}`}>
              {props.item.category.title}
            </Link>
          </li>
          {props.item.authors.length > 0 && (
            <li>
              <span className={styles.icon}>
                {props.item.authors.length === 1 && <span>👤</span>}
                {props.item.authors.length > 1 && <span>👥</span>}
              </span>
              <Authors authors={props.item.authors} />
            </li>
          )}
          <li>
            <span className={styles.icon}>⭐</span>
            <Panel type={getLevelStyle(props.item.level)} small>
              {props.item.level}
            </Panel>
          </li>
          {props.item.tags.length > 0 && (
            <li>
              <span className={styles.icon}>🏷️</span>
              <Tags small tags={toTags(props.item.tags)} />
            </li>
          )}
          {props.item.date && (
            <li>
              <span className={styles.icon}>📅</span>
              <span className={styles.muted}>{moment(props.item.date).fromNow(true)} ago</span>
            </li>
          )}
        </ul>

        <article className={styles.website}>
          {!websiteIsSameCurrentPage && (
            <Link href={props.item.url}>
              <span className="accent block">Visit website &raquo;</span>
            </Link>
          )}
          {props.item.alternateUrl && (
            <Link href={props.item.alternateUrl}>
              <span className="block">Alternate link &raquo;</span>
            </Link>
          )}
        </article>

        <main>
          <p>
            <strong dangerouslySetInnerHTML={{ __html: props.item.description }} />
          </p>
        </main>

        {youtubeVideoId && <YoutubeEmbed videoId={youtubeVideoId} title={props.item.title} />}

        {props.item.content && props.item.content !== props.item.description && (
          <main className={styles.markdown} dangerouslySetInnerHTML={{ __html: marked.parse(props.item.content) }} />
        )}

        {props.item.category.title === 'Books' && (
          <p>
            <small>* Links in the books category may contain referral links. Any proceeds will help and support this site.</small>
          </p>
        )}
      </TopnavLayout>
    </NavigationProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const service = new MarkdownContentService()
  const items = await service.GetItems()

  return {
    paths: items.map((i) => {
      return {
        params: { category: i.category.id, resource: i.id },
      }
    }),
    fallback: false, // content is from markdown
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const category = context.params?.category
  const resource = context.params?.resource
  if (!category || !resource) {
    return {
      props: null,
      notFound: true,
    }
  }

  const service = new MarkdownContentService()
  const item = await service.GetItem(category, resource)
  if (!item) {
    return {
      props: null,
      notFound: true,
      revalidate: DEFAULT_REVALIDATE_PERIOD,
    }
  }

  const categories = await service.GetCategories()
  return {
    props: {
      categories,
      item,
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  }
}
