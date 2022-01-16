import React from 'react'
import  moment from 'dayjs'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Main as MainLayout } from 'components/layouts/main'
import { ContentItem } from 'types/content-item'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { SEO } from 'components/SEO'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import { Authors } from 'components/authors'
import { Tags } from 'components/tags'
import { Tag } from 'components/tag'
import { getLevelStyle } from 'utils/helpers'
import styles from '../pages.module.scss'
import { Link } from 'components/link'
import { MarkdownContentService } from 'services/content'
import { marked } from 'marked'
import { useRouter } from 'next/router'

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
  const websiteIsSameCurrentPage = props.item.url.includes(router.asPath) // e.g. Guides do not contain external links
  
  return (
    <NavigationProvider categories={props.categories}>
      <SEO title={props.item.title} description={props.item.description} />

      <MainLayout className={styles.container} title={props.item.title}>
        <article className={styles.authors}>
          <div>
            <span>By</span>
            <Authors authors={props.item.authors} />
          </div>
          {props.item.date && <div className={styles.muted}>Published {moment(props.item.date).format('MMM D, YYYY')}</div>}
        </article>

        <article className={styles.website}>
          {!websiteIsSameCurrentPage && 
            <Link href={props.item.url}>
              <span className='accent block'>Visit website &raquo;</span>
            </Link>
          }
          {props.item.alternateUrl && 
            <Link href={props.item.alternateUrl}>
              <span className='block'>Alternate link &raquo;</span>
            </Link>
          }
        </article>
        
        <main>
          <p><strong dangerouslySetInnerHTML={{__html: props.item.description }} /></p>
        </main>

        {props.item.content && props.item.content !== props.item.description && 
          <main className={styles.markdown} dangerouslySetInnerHTML={{__html: marked.parse(props.item.content)}} />
          
        }

        <article className={styles.tags}>
          <Tags tags={props.item.tags.map(i => { return { key: i, count: 0 }})} />
          <Tag className={styles.level} text={props.item.level} type={getLevelStyle(props.item.level)} />
        </article>

        {props.item.category.title === 'Books' && <p>
          <small>* Links in the books category may contain referral links. Any proceeds will help and support this site.</small>
        </p>}
      </MainLayout>
    </NavigationProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const service = new MarkdownContentService()
  const items = await service.GetItems()

  return {
    paths: items.map(i => {
      return {
        params: { category: i.category.id, resource: i.id }
      }
    }),
    fallback: true
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
      revalidate: DEFAULT_REVALIDATE_PERIOD
    }
  }

  const categories = await service.GetCategories()
  return {
    props: {
      categories,
      item
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD
  }
}
