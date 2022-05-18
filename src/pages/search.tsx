import React, { useEffect, useState } from 'react'
import Pagination from 'next-pagination'
import { ParsedUrlQuery } from 'querystring'
import { GetStaticProps } from 'next'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import styles from './pages.module.scss'
import { MarkdownContentService } from 'services/content'
import { TopnavLayout } from 'components/layouts/topnav'
import {
  LowerCaseSanitizer,
  PrefixIndexStrategy,
  Search,
  SimpleTokenizer,
  StopWordsTokenizer,
  TfIdfSearchIndex,
} from 'js-search'
import { useRouter } from 'next/router'
import { Featured } from 'components/featured'
import { PanelCard } from 'components/panel'

interface Props {
  items: any[]
  categories: Array<Category>
}

interface Params extends ParsedUrlQuery {
  category: string
}

export default function Index(props: Props) {
  const router = useRouter()
  const index = new Search('id')
  index.tokenizer = new StopWordsTokenizer(new SimpleTokenizer())
  index.indexStrategy = new PrefixIndexStrategy()
  index.sanitizer = new LowerCaseSanitizer()
  index.searchIndex = new TfIdfSearchIndex(['title', 'description'])

  index.addIndex('title')
  index.addIndex('description')
  index.addIndex('tags')
  index.addDocuments(props.items)

  const q: string = router.query.q as string
  const searchItems = index.search(q)
  const [items, setItems] = useState(searchItems)

  useEffect(() => {
    const page = !isNaN(Number(router.query['page'])) ? Number(router.query['page']) : 1
    const size = !isNaN(Number(router.query['size'])) ? Number(router.query['size']) : 20

    const sliceStart = page == 1 ? 0 : size * (page - 1)
    const sliceEnd = page * size

    setItems(searchItems.slice(sliceStart, sliceEnd))
  }, [q, props.items])

  return (
    <NavigationProvider categories={props.categories}>
      <TopnavLayout className={styles.container}>
        <article>
          <h2>
            Search Results{' '}
            <small className="muted">
              {router.query.q} <small>({searchItems.length})</small>
            </small>
          </h2>

          <Pagination total={searchItems.length} />

          <main>
            <Featured type="rows">
              {items.map((i: any, index: number) => {
                return (
                  <PanelCard
                    key={`${index}_${i.id}`}
                    title={i.title}
                    description={i.description}
                    url={i.url}
                    level={i.level}
                    tags={i.tags}
                    icon={i.icon}
                  />
                )
              })}
            </Featured>
          </main>
        </article>
      </TopnavLayout>
    </NavigationProvider>
  )
}

export const getStaticProps: GetStaticProps<Props, Params> = async () => {
  const service = new MarkdownContentService()
  const categories = await service.GetCategories()
  const items = await service.GetItems()

  return {
    props: {
      items: items.map((i) => {
        return {
          id: i.id,
          title: i.title,
          description: i.description,
          url: `/${i.category.id}/${i.id}`,
          icon: i.category.emoji,
          level: i.level,
          tags: i.tags,
        }
      }),
      categories,
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  }
}
