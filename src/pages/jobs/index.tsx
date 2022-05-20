import React from 'react'
import { GetStaticProps } from 'next'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import { Job } from 'types/job'
import { SEO } from 'components/SEO'
import { MarkdownContentService } from 'services/content'
import { JobsOverview } from 'components/jobs'
import { TopnavLayout } from 'components/layouts/topnav'
import { GetJobs } from 'services/jobs'

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
      <TopnavLayout title="Web3 Jobs" action={{ href: '/jobs/post', text: 'Post a Job' }} hideNewsletter>
        <JobsOverview jobs={props.jobs} />
      </TopnavLayout>
    </NavigationProvider>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const service = new MarkdownContentService()
  const categories = await service.GetCategories()
  const jobs = await GetJobs()

  return {
    props: {
      categories,
      jobs: jobs.filter((i) => i.featured),
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  }
}
