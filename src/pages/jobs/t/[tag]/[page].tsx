import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { SEO } from 'components/SEO'
import { DEFAULT_REVALIDATE_PERIOD, DEFAULT_MAX_ITEMS } from 'utils/constants'
import styles from '../../../pages.module.scss'
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
  page: string
  tag: string
}

export default function Index(props: Props) {
  const router = useRouter()
  if (!router.query.tag || !props.results) {
    return <></>
  }
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
    paths: tags.flatMap((i) => {
      const tag = defaultSlugify(i)
      const byTag = jobs.filter((i) => i.featured || i.tags.map((x) => defaultSlugify(x)).some((x) => x === tag))
      const pages = Math.ceil(byTag.length / DEFAULT_MAX_ITEMS)
      const pagesToGenerate = Array.from({ length: pages }, (i, index) => index + 1)
      return pagesToGenerate.map((i) => {
        return { params: { tag, page: String(i) } }
      })
    }),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const tagId = context.params?.tag ?? ''
  const page = Number(context.params?.page) ?? 1
  const service = new MarkdownContentService()
  const categories = await service.GetCategories()

  const jobs = await GetJobs() // Get Jobs by Tag
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
        currentPage: page,
        items: byTag.slice(0, DEFAULT_MAX_ITEMS),
      },
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  }
}
