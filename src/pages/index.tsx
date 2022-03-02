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
import { Departments } from 'components/departments'
import { DEPARTMENTS } from 'utils/jobs'

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
            useWeb3 是一个为开发者提供探索和了解有关Web
            3.0知识的一个学习平台。无论是第一次动手的新开发者还是一个正进入Web3领域的经验丰富的开发者。
          </p>
          <p>
            <strong>探索. 学习. 构建.</strong>
          </p>
        </article>

        <article>
          <h2>Web3 招聘</h2>
          <p>浏览所有的工作，该空间中优秀公司中选择关于Solidity或区块链工作，找到属于你的Web3。</p>
          <p className={styles.filters}>
            <Departments departments={DEPARTMENTS} />
          </p>
          <p>
            Web3工作的招聘? <Link href="https://www.useweb3.xyz/jobs/post">发布工作</Link>
          </p>
        </article>

        <article>
          <h2>开始了解</h2>
          <p>获取最新的资源以及核心理念、基本原理。学习教程、课程、书籍、视频资料或者编程闯关并开始构建。</p>
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
