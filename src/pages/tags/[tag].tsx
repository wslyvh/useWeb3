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
import styles from '../pages.module.scss'

interface Props {
  categories: Array<Category>
  tag: string
  items: Array<ContentItem>
}

interface Params extends ParsedUrlQuery {
  tag: string
}

export default function Index(props: Props) {
  if (!props.tag) {
    return <></>
  }

  return (
    <NavigationProvider categories={props.categories}>
      <SEO title={`Learn through #${props.tag}`} />

      <MainLayout className={styles.container} title={`#${props.tag}`}>
        <main>
          <Featured>
            {props.items.map(i => {
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
      </MainLayout>
    </NavigationProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const service = new AirtableItemService()
  const tags = await service.GetTags()

  return {
    paths: tags.map(i => {
      return {
        params: { tag: i }
      }
    }),
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const tag = context.params?.tag
  if (!tag) {
    return {
      props: null,
      notFound: true,
    }
  }
  
  const service = new AirtableItemService()
  const categories = await service.GetCategories()
  const items = await service.GetItemsByTag(tag)
  console.log('ITEMS', items)
  return {
    props: {
      categories,
      tag,
      items
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD
  }
}
