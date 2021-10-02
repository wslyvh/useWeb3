import React, { useEffect, useState } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Main as MainLayout } from 'components/layouts/main'
import { ContentItem } from 'types/content-item'
import { Featured } from 'components/featured'
import { Card } from 'components/card'
import { AirtableItemService } from 'services/airtable'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { SEO } from 'components/SEO'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import { Dropdown } from 'components/dropdown'
import styles from './pages.module.scss'

interface Props {
  categories: Array<Category>
  category: Category
  items: Array<ContentItem>
}

interface Params extends ParsedUrlQuery {
  category: string
}

export default function Index(props: Props) {
  const [items, setItems] = useState<Array<ContentItem>>([])
  useEffect(() => {
    let sorted = [...props.items].sort((a, b) => a.title > b.title ? 1 : a.title === b.title ? 0 : -1)
    setItems(sorted)
  }, [props.items])

  if (!props.category) {
    return <></>
  }

  function onSort(value: string) {
    let sorted = [...items]
    if (value === 'Title') {
      sorted = sorted.sort((a, b) => a.title > b.title ? 1 : a.title === b.title ? 0 : -1)
    }
    if (value === 'Expertise') {
      sorted = sorted.sort((a, b) => a.level > b.level ? 1 : a.level === b.level ? 0 : -1)
    }
    
    setItems(sorted)
  }

  return (
    <NavigationProvider categories={props.categories}>
      <SEO title={`Learn through ${props.category.emoji} ${props.category.title}`} description={props.category.description} />

      <MainLayout className={styles.container} title={props.category.title}>
        {props.category.description && 
          <article>
            <p dangerouslySetInnerHTML={{__html: props.category.description }} />
          </article>
        }

        <div className={styles.filter}>
          <p>Sort by:</p>
          <Dropdown className={styles.sort} items={['Title', 'Expertise']} onSelect={(value) => onSort(value)} />
        </div>

        <main>
          <Featured>
            {items.map(i => {
              return (
                <Card small
                  key={i.id}
                  title={i.title}
                  description={i.description}
                  author={i.authors.join(', ')}
                  tag={i.level}
                  detailsUrl={`/${i.category.id}/${i.id}`}
                  url={i.url} />
              )
            })}
          </Featured>
        </main>

        {props.category.title === 'Books' && <p>
          <small>* Links in the books category may contain referral links. Any proceeds will help and support this site.</small>
        </p>}
      </MainLayout>
    </NavigationProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const service = new AirtableItemService()
  const categories = await service.GetCategories()

  return {
    paths: categories.map(i => {
      return {
        params: { category: i.id }
      }
    }),
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const categoryId = context.params?.category
  if (!categoryId) {
    return {
      props: null,
      notFound: true,
    }
  }
  
  const service = new AirtableItemService()
  const category = await service.GetCategory(categoryId)
  if (!category) {
    return {
      props: null,
      notFound: true,
      revalidate: DEFAULT_REVALIDATE_PERIOD
    }
  }

  const categories = await service.GetCategories()
  const items = await service.GetItems(categoryId, false)
  return {
    props: {
      categories,
      category,
      items
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD
  }
}
