import React from 'react'
import { ParsedUrlQuery } from 'querystring'
import { Main as MainLayout } from 'components/layouts/main'
import { Card } from 'components/card'
import { Featured } from 'components/featured'
import { ContentItem } from 'types/content-item'
import { GetStaticProps } from 'next'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import styles from './pages.module.scss'
import { MarkdownContentService } from 'services/content'
import { Link } from 'components/link'

interface Props {
  categories: Array<Category>
  items: Array<ContentItem>
}

interface Params extends ParsedUrlQuery {
  category: string
}

export default function Index(props: Props) {
  return (
    <NavigationProvider categories={props.categories}>
      <MainLayout className={styles.container}>
        <article>
          <p>
            useWeb3 is a platform for developers to explore and learn about Web3. Whether youre a new dev getting your
            hands dirty for the first time, or a seasoned developer making the transition into the Web3 space.
          </p>
          <p>
            <strong>Explore. Learn. Build.</strong>
          </p>
        </article>

        <article>
          <h2>Web3 Jobs</h2>
          <p>
            <Link href="/jobs">Browse all jobs</Link> to find your Web3, Solidity or blockchain jobs at one of the leading companies that
            work on core, open-source infrastructure, products, tools, frameworks and DAOs. 
          </p>
          <p>Hiring for Web3 jobs? <Link href="/jobs/post">Post your job</Link></p>
        </article>

        <article>
          <h2>Start learning</h2>
          <p>
            Explore the latest resources and get familiar with the core concepts and fundamentals. Learning from
            tutorials, courses, books, videos or code challenges and start building!
          </p>
        </article>

        {props.categories.map((category) => {
          const items = props.items.filter((item) => item.category.id === category.id)
          if (items.length === 0) return null

          return (
            <Featured key={category.id} className={styles.featured} title={category.title} link={category.id}>
              {items.map((i) => {
                return (
                  <Card
                    small
                    key={i.id}
                    title={i.title}
                    description={i.description}
                    author={i.authors.join(', ')}
                    tag={i.level}
                    detailsUrl={`/${i.category.id}/${i.id}`}
                    url={i.url}
                  />
                )
              })}
            </Featured>
          )
        })}
      </MainLayout>
    </NavigationProvider>
  )
}

export const getStaticProps: GetStaticProps<Props, Params> = async () => {
  const service = new MarkdownContentService()
  const items = await service.GetItems('', true)
  const categories = await service.GetCategories()

  return {
    props: {
      items,
      categories,
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  }
}
