import React from 'react'
import { ParsedUrlQuery } from 'querystring'
import { GetStaticPaths, GetStaticProps } from 'next'
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

interface Params extends ParsedUrlQuery {
  page: string
}

export default function Index(props: Props) {
  return (
    <NavigationProvider categories={props.categories}>
      <SEO
        title="Web3, Blockchain and Crypto jobs"
        description="Find the latest Web3, Solidity, Ethereum, developer, engineering, product &amp; software jobs in the Web3 ecosystem."
      />
      <TopnavLayout title="Web3 Jobs" action={{ href: '/jobs/post', text: 'Post a Job' }} hideNewsletter>
        <JobsOverview results={props.results} tags={props.tags} />
      </TopnavLayout>
    </NavigationProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const jobs = await GetJobs()
  const pages = Math.ceil(jobs.length / DEFAULT_MAX_ITEMS)
  const pagesToGenerate = Array.from({ length: pages }, (i, index) => index + 1)

  return {
    paths: pagesToGenerate.map((i) => {
      return {
        params: { page: String(i) },
      }
    }),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const page = Number(context.params?.page) ?? 1
  const service = new MarkdownContentService()
  const categories = await service.GetCategories()

  const jobs = await GetJobs()
  const items = jobs.slice((page - 1) * DEFAULT_MAX_ITEMS, page * DEFAULT_MAX_ITEMS)
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
        currentPage: page,
        items: items,
      },
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  }
}
