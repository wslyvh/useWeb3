import React from 'react'
import { ParsedUrlQuery } from 'querystring'
import { Main as MainLayout } from 'components/layouts/main'
import { GetStaticProps } from 'next'
import { AirtableItemService } from 'services/airtable'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import styles from './pages.module.scss'
import { JobService } from 'services/jobs'
import { Job } from 'types/job'
import { Featured } from 'components/featured'
import { Row } from 'components/row'
import moment from 'moment'

interface Props {
  categories: Array<Category>
  jobs: Array<Job>
}

interface Params extends ParsedUrlQuery {
  category: string
}

export default function Index(props: Props) {
  return (
    <NavigationProvider categories={props.categories}>
      <MainLayout className={styles.container} title='Web3 Jobs'>
        <article>
          <p>
            Find your job in the Web3 space.
          </p>
        </article>

        <main>
          <Featured type='rows'>
            {props.jobs.map(i => {
              return (
                <Row
                  key={i.id}
                  title={i.title}
                  description={i.location}
                  date={moment(i.updated).fromNow()}
                  author={i.company.title}
                  authorUrl={i.company.id}
                  url={i.url} />
              )
            })}
          </Featured>
        </main>
      </MainLayout>
    </NavigationProvider>
  )
}

export const getStaticProps: GetStaticProps<Props, Params> = async () => {
  const service = new AirtableItemService()
  const categories = await service.GetCategories()

  const jobService = new JobService()
  const jobs = await jobService.GetJobs()
  console.log('JOBS', jobs.length)

  return {
    props: {
      categories,
      jobs
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD
  }
}
