import React from 'react'
import { Main as MainLayout } from 'components/layouts/main'
import styles from './submit.module.scss'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { GetStaticProps } from 'next'
import { AirtableItemService } from 'services/airtable'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'

interface Props {
  categories: Array<Category>
}

export default function Index(props: Props) {
  return (
    <NavigationProvider categories={props.categories}>
      <MainLayout title='Submit a link' className={styles.container}>
        <section>
            <p>
                useWeb3 provides a curated overview of the best and latest resources on Ethereum, blockchain and Web3 development.
            </p>
            <p>
              Please use the form below to submit a link. Resources should be up-to-date, relevant for developers and publicly available.

              We will manually review each submission before deciding to publish it to the site.
            </p>

            <iframe
                className="airtable-embed airtable-dynamic-height" 
                src="https://airtable.com/embed/shrOIsIgZND1MKR16?backgroundColor=red" 
                frameBorder={0}
                width="100%" 
                height="2100">
            </iframe>
        </section>
      </MainLayout>
    </NavigationProvider>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const service = new AirtableItemService()
  const categories = await service.GetCategories();

  return {
    props: {
      categories: categories
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD
  }
}
