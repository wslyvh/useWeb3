import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { SEO } from 'components/SEO'
import { DEFAULT_REVALIDATE_PERIOD, DEFAULT_MAX_ITEMS } from 'utils/constants'
import styles from '../../pages.module.scss'
import { MarkdownContentService } from 'services/content'
import { Job } from 'types/job'
import { JobsOverview } from 'components/jobs'
import { useRouter } from 'next/router'
import { TopnavLayout } from 'components/layouts/topnav'
import { GetJobs } from 'services/jobs'
import { PagedResult } from 'types/paged'
import { getPageTitle, Tag } from 'utils/jobs'
import { defaultSlugify } from 'utils/helpers'

interface Props {
  categories: Array<Category>
  tags: Array<Tag>
  results: PagedResult<Job>
}

interface Params extends ParsedUrlQuery {
  tag: string
}

export default function Index(props: Props) {
  const router = useRouter()
  const title = getPageTitle(router.query.tag as string)

  return (
    <NavigationProvider categories={props.categories}>
      <SEO
        title="Web3, Blockchain and Crypto jobs"
        description="Find the latest Web3, Solidity, Ethereum, developer, engineering, product &amp; software jobs in the Web3 ecosystem."
      />
      <TopnavLayout
        className={styles.container}
        title={title}
        action={{ href: '/jobs/post', text: 'Post a Job' }}
        hideNewsletter>
        <JobsOverview results={props.results} tags={props.tags} />
      </TopnavLayout>
    </NavigationProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const jobs = await GetJobs() // TODO: Get Jobs by Tag
  const tags = [
    ...new Set(
      jobs
        .map((job) => job.tags)
        .flat()
        .filter((i) => !!i)
    ),
  ]

  return {
    paths: tags.map((i) => {
      return {
        params: { tag: defaultSlugify(i) },
      }
    }),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const tagId = context.params?.tag ?? ''
  const service = new MarkdownContentService()
  const categories = await service.GetCategories()

  const jobs = await GetJobs() // TODO: Get Jobs by Tag
  const tags = [
    ...new Set(
      jobs
        .map((job) => job.tags)
        .flat()
        .filter((i) => !!i)
    ),
  ]
  const byTag = jobs.filter(
    (i) => i.featured || i.tags.map((x) => defaultSlugify(x)).some((x) => x === defaultSlugify(tagId))
  )

  return {
    props: {
      categories,
      tags,
      results: {
        total: byTag.length,
        currentPage: 1,
        items: byTag.slice(0, DEFAULT_MAX_ITEMS),
      },
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  }
}
