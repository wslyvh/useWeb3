import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Main as MainLayout } from 'components/layouts/main'
import { ContentItem } from 'types/content-item'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { SEO } from 'components/SEO'
import { DEFAULT_REVALIDATE_PERIOD, JOBS_AMOUNT_PER_COMPANY } from 'utils/constants'
import styles from './pages.module.scss'
import { MarkdownContentService } from 'services/content'
import { FilteredOverview } from 'components/filtered-overview'
import { JobService } from 'services/jobs'
import { Job } from 'types/job'
import { JobsOverview } from 'components/jobs'
import { useRouter } from 'next/router'

interface Props {
  categories: Array<Category>
  category?: Category
  items: Array<ContentItem>
  jobs: Array<Job>
}

interface Params extends ParsedUrlQuery {
  category: string
}

export default function Index(props: Props) {
  const router = useRouter()

  if (!props.category && router.asPath.endsWith('-jobs')) {
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

  if (!props.category) {
    return <></>
  }

  return (
    <NavigationProvider categories={props.categories}>
      <SEO
        title={`Learn from ${props.category.emoji} ${props.category.title}`}
        description={props.category.description}
      />

      <MainLayout className={styles.container} title={props.category.title}>
        <FilteredOverview title={props.category.title} description={props.category.description} items={props.items} />
      </MainLayout>
    </NavigationProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const service = new MarkdownContentService()
  const categories = await service.GetCategories()

  return {
    paths: [...categories.map((i) => {
      return {
        params: { category: i.id },
      }
    }),
    // Adding filtered job pages
    { params: { category: 'engineering-jobs' } },
    { params: { category: 'product-jobs' } },
    { params: { category: 'sales-jobs' } },
    { params: { category: 'marketing-jobs' } },
    { params: { category: 'people-jobs' } },
    { params: { category: 'operations-jobs' } },
    { params: { category: 'non-tech-jobs' } },
    { params: { category: 'remote-web3-jobs' } }
    ].flat(),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const categoryId = context.params?.category ?? ''
  if (categoryId.endsWith('-jobs')) {
    const department = categoryId.replace('-jobs', '')
    const remote = department.includes('remote')
    const service = new MarkdownContentService()
    const jobService = new JobService()
    const categories = await service.GetCategories()
    const jobs = await jobService.GetJobs('', JOBS_AMOUNT_PER_COMPANY)

    return {
      props: {
        key: categoryId,
        categories,
        items: new Array<ContentItem>(),
        jobs: remote ? jobs.filter(i => i.remote) :
          jobs.filter(i => i.department.toLowerCase() === department.toLowerCase())
      },
      revalidate: DEFAULT_REVALIDATE_PERIOD,
    }
  }

  const service = new MarkdownContentService()
  const category = await service.GetCategory(categoryId)
  if (!category) {
    return {
      props: null,
      notFound: true,
      revalidate: DEFAULT_REVALIDATE_PERIOD,
    }
  }

  const categories = await service.GetCategories()
  const items = await service.GetItems(categoryId, false)
  return {
    props: {
      key: categoryId,
      categories,
      category,
      items,
      jobs: new Array<Job>()
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  }
}
