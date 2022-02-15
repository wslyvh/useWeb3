import React, { useEffect, useState } from 'react'
import { Main as MainLayout } from 'components/layouts/main'
import { GetStaticProps } from 'next'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { DEFAULT_REVALIDATE_PERIOD, JOBS_AMOUNT_PER_COMPANY } from 'utils/constants'
import styles from './pages.module.scss'
import { JobService } from 'services/jobs'
import { Job } from 'types/job'
import { Featured } from 'components/featured'
import { Row } from 'components/row'
import moment from 'dayjs'
import { Link } from 'components/link'
import Pagination from 'next-pagination'
import { useRouter } from 'next/dist/client/router'
import { SEO } from 'components/SEO'
import { MarkdownContentService } from 'services/content'
import { Newsletter } from 'components/newsletter'

interface Props {
  categories: Array<Category>
  jobs: Array<Job>
}

export default function Index(props: Props) {
  const router = useRouter()
  const [jobs, setJobs] = useState(props.jobs)

  useEffect(() => {
    const page = !isNaN(Number(router.query['page'])) ? Number(router.query['page']) : 1
    const size = !isNaN(Number(router.query['size'])) ? Number(router.query['size']) : 20

    const sliceStart = page == 1 ? 0 : size * (page - 1)
    const sliceEnd = page * size
    setJobs(props.jobs.slice(sliceStart, sliceEnd))
  }, [props.jobs, router.query])

  return (
    <NavigationProvider categories={props.categories}>
      <SEO
        title="Web3, Blockchain and Crypto jobs"
        description="Find the latest Web3, Solidity, Ethereum, developer, engineering, product &amp; software jobs in the Web3 ecosystem."
      />
      <MainLayout className={styles.container} title="Web3 Jobs" hideNewsletter>
        <article>
          <p>
            Find the latest Web3, Solidity, Ethereum, developer, engineering, product &amp; software jobs in the Web3
            ecosystem.
          </p>
        </article>

        <article>
          <h2>Post a job</h2>
          <p>
            Hiring for Web3 jobs? <Link href="https://airtable.com/shrIbgc0llBQFpo7G">Add your company</Link> and <Link href="https://airtable.com/shrY9atkDkPKKd03Z">post your job</Link> for review.
          </p>
        </article>

        <Newsletter className={styles.newsletter} title='' description='Receive the latest jobs in your inbox.' />

        {/* Add filters */}

        <Pagination total={props.jobs.length} />

        <main>
          <Featured type="rows">
            {jobs.map((i) => {
              return (
                <Row
                  key={`${i.id}_${i.location}`}
                  title={i.title}
                  description={i.location}
                  date={moment(i.updated).fromNow(true)}
                  author={i.company.title}
                  authorUrl={i.company.id}
                  url={`${i.url}?utm_source=useWeb3`}
                  imageUrl={i.company.logo}
                  featured={i.featured}
                />
              )
            })}
          </Featured>
        </main>

        <Pagination total={props.jobs.length} />
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
      jobs,
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD,
  }
}
