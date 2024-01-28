import React from 'react'
import { GetStaticProps } from 'next'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { DEFAULT_MAX_ITEMS, DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import { Job } from 'types/job'
import { SEO } from 'components/SEO'
import { MarkdownContentService } from 'services/content'
import { JobsOverview } from 'components/jobs'
import { TopnavLayout } from 'components/layouts/topnav'
import { GetJobs } from 'services/jobs'
import { PagedResult } from 'types/paged'
import { Tag } from 'utils/jobs'

interface Props {
  categories: Array<Category>
  tags: Array<Tag>
  results: PagedResult<Job>
}

export default function Index(props: Props) {
  return (
    <NavigationProvider categories={props.categories}>
      <SEO
        title="Web3, Blockchain and Crypto jobs"
        description="Find the latest Web3, Solidity, Ethereum, developer, engineering, product &amp; software jobs in the Web3 ecosystem."
      />
      <TopnavLayout title="Web3 Jobs" hideNewsletter>
        <JobsOverview results={props.results} tags={props.tags} />
      </TopnavLayout>
    </NavigationProvider>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const service = new MarkdownContentService()
  const categories = await service.GetCategories()

  const jobs = await GetJobs()
  const tags = [
    ...new Set(
      jobs
        .map((job) => job.tags)
        .flat()
        .filter((i) => !!i)
    ),
  ]

  return {
    props: {
      categories,
      tags,
      results: {
        total: jobs.length,
        currentPage: 1,
        items: jobs.slice(0, DEFAULT_MAX_ITEMS),
      },
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  }
}
