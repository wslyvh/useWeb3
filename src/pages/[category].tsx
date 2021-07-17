import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Main as MainLayout } from 'components/layouts/main'
import { getCategories, getItemsPerCategory } from 'services/content'
import { BaseContentType } from 'types/content'
import { Featured } from 'components/featured'
import { Card } from 'components/card'

interface Props {
  category: string
  items: Array<BaseContentType>
}

interface Params extends ParsedUrlQuery {
  category: string
}

export default function Index(props: Props) {
  return (
    <MainLayout title={props.category}>
      <main>
        <Featured>
          {props.items.map(i => {
            return (
              <Card
                key={i.title}
                title={i.title}
                description={i.description}
                url={i.url} />
            )
          })}
        </Featured>
      </main>
    </MainLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  console.log('Get static paths for content categories..')
  const categories = getCategories()

  return {
    paths: categories.map(i => {
      return {
        params: { category: i }
      }
    }),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const category = context.params?.category
  console.log('Get content items props for', category)
  
  if (!category) {
    return {
      props: null,
      notFound: true,
    }
  }
  
  const items = getItemsPerCategory(category)
  return {
    props: {
      category: category,
      items: items
    },
  }
}
