import React from 'react'
import { ParsedUrlQuery } from 'querystring'
import { Main as MainLayout } from 'components/layouts/main'
import { Card } from 'components/card'
import { Featured } from 'components/featured'
import { ContentItem } from 'types/content-item'
import { GetStaticProps } from 'next'
import { AirtableItemService } from 'services/airtable'
import { Category } from 'types/category'
import styles from './index.module.scss'
import { NavigationProvider } from 'context/navigation'

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
            useWeb3 provides you a manually curated overview of the best and latest resources on Ethereum, blockchain and Web3 development. 
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

        {props.categories.map(category => {
          const items = props.items.filter(item => item.category.id === category.id)
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
  const categories = await service.GetCategories();

  return {
    props: {
      items,
      categories
    },
  }
}
