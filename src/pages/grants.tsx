import React from 'react'
import { Main as MainLayout } from 'components/layouts/main'
import { GetStaticProps } from 'next'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import styles from './pages.module.scss'
import { SEO } from 'components/SEO'
import { MarkdownContentService } from 'services/content'
import { Featured } from 'components/featured'
import { BasicRow } from 'components/row'
import programs from '../../content/grants.json'
import { defaultSlugify } from 'utils/helpers'

interface Props {
  categories: Array<Category>
}

export default function Index(props: Props) {
  return (
    <NavigationProvider categories={props.categories}>
      <SEO
        title="Web3 Grants and support programs"
        divider='💰'
        description="These grant and ecosystem support programs can help you build your own projects, tools, infrastructure, research and other public goods."
      />
      <MainLayout className={styles.container} title="Web3 Grants and support programs">
        <p>These grant and ecosystem support programs can help you build your own projects, tools, infrastructure, research and other public goods.</p>

        <main>
          <Featured type="rows">
            {programs.map((i) => {
              return (
                <BasicRow
                  key={defaultSlugify(i.name)}
                  title={i.name}
                  description={i.description}
                  url={i.url}
                  tags={i.tags}
                />
              )
            })}
          </Featured>
        </main>
      </MainLayout>
    </NavigationProvider>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const service = new MarkdownContentService()
  const categories = await service.GetCategories()

  return {
    props: {
      categories,
    }
  }
}
