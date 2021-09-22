import React from 'react'
import { Main as MainLayout } from 'components/layouts/main'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { GetStaticProps } from 'next'
import { AirtableItemService } from 'services/airtable'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import styles from './pages.module.scss'
import { Tags } from 'components/tags'
import { Count } from 'types/count'

interface Props {
  categories: Array<Category>
  tags: Array<Count>
}

export default function Index(props: Props) {
  return (
    <NavigationProvider categories={props.categories}>
      <MainLayout title='Tags' className={styles.container}>
        <section>
            <p>
              Browse resources based on their tags.
            </p>

            <main>
              <Tags tags={props.tags} />
            </main>
        </section>
      </MainLayout>
    </NavigationProvider>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const service = new AirtableItemService()
  const categories = await service.GetCategories()
  const tags = await service.GetTags()

  return {
    props: {
      categories,
      tags
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD
  }
}
