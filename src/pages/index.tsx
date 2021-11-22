import React from 'react'
import { ParsedUrlQuery } from 'querystring'
import { Main as MainLayout } from 'components/layouts/main'
import { Card } from 'components/card'
import { Featured } from 'components/featured'
import { ContentItem } from 'types/content-item'
import { GetStaticProps } from 'next'
import { AirtableItemService } from 'services/airtable'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import styles from './pages.module.scss'

interface Props {
  categories: Array<Category>
  items: Array<ContentItem>
}

interface Params extends ParsedUrlQuery {
  category: string
}

export default function Index(props: Props) {
  const categories = props.categories.reverse()

  return (
    <NavigationProvider categories={props.categories}>
      <MainLayout className={styles.container}>
        <article>
          <p>
            useWeb3 provides a curated overview of the best and latest resources on Ethereum, blockchain and Web3 development. 
          </p>
          <p>
            These resources help you develop your own smart contracts, DeFi project, ERC20 or NFT tokens in Solidity or Vyper. Connect with them using Web3 client libraries. Or publish them to the network or decentralized web, such as IPFS.
          </p>
        </article>

        <article>
          <h2>
            How would you like to get started?
          </h2>
          <p>
            Get familiar with the core concepts and fundamentals, or start learning through tutorials, courses, books, videos or code challenges. 
          </p>
        </article>

        {categories.map(category => {
          const items = props.items.filter(item => item.category.id === category.id)
          if (items.length === 0) return null
          
          return <Featured 
          key={category.id}
            className={styles.featured} 
            title={category.title} 
            link={category.id}>
              {items.map(i => {
                return <Card small
                  key={i.id}
                  title={i.title}
                  description={i.description}
                  author={i.authors.join(', ')}
                  tag={i.level}
                  detailsUrl={`/${i.category.id}/${i.id}`}
                  url={i.url} />
              })}
          </Featured>
        })}
      </MainLayout>
    </NavigationProvider>
  )
}

export const getStaticProps: GetStaticProps<Props, Params> = async () => {
  const service = new AirtableItemService()
  const items = await service.GetItems('', true)
  const categories = await service.GetCategories()

  return {
    props: {
      items,
      categories
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD
  }
}
