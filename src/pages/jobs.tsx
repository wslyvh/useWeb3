import React, { useEffect, useState } from 'react'
import { Main as MainLayout } from 'components/layouts/main'
import { GetStaticProps } from 'next'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { DEFAULT_REVALIDATE_PERIOD, JOBS_AMOUNT_PER_COMPANY } from 'utils/constants'
import styles from './pages.module.scss'
import { JobService } from 'services/jobs'
import { Job } from 'types/job'
import { SEO } from 'components/SEO'
import { MarkdownContentService } from 'services/content'
import { JobsOverview } from 'components/jobs'

interface Props {
  categories: Array<Category>
  jobs: Array<Job>
}

export default function Index(props: Props) {
  return (
    <NavigationProvider categories={props.categories}>
      <SEO
        title="Web3, Blockchain and Crypto jobs"
        description="Find the latest Web3, Solidity, Ethereum, developer, engineering, product &amp; software jobs in the Web3 ecosystem."
      />
      <MainLayout className={styles.container} title="Web3 Jobs" hideNewsletter>
        <JobsOverview jobs={props.jobs} />
      </MainLayout>
    </NavigationProvider>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const service = new MarkdownContentService()
  const categories = await service.GetCategories()

  const jobService = new JobService()
  const jobs = await jobService.GetJobs('', JOBS_AMOUNT_PER_COMPANY)

  return {
    props: {
      categories,
      jobs: jobs.filter((i) => i.featured || i.department === 'Engineering'),
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  }
}
