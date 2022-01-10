import React, { useEffect, useState } from 'react'
import { Main as MainLayout } from 'components/layouts/main'
import { GetStaticProps } from 'next'
import { AirtableItemService } from 'services/airtable'
import { Category } from 'types/category'
import { NavigationProvider } from 'context/navigation'
import { DEFAULT_REVALIDATE_PERIOD, JOBS_AMOUNT_PER_COMPANY } from 'utils/constants'
import styles from './pages.module.scss'
import { JobService } from 'services/jobs'
import { Job } from 'types/job'
import { Featured } from 'components/featured'
import { Row } from 'components/row'
import  moment from 'dayjs'
import { Link } from 'components/link'
import Pagination from 'next-pagination'
import { useRouter } from 'next/dist/client/router'
import { SEO } from 'components/SEO'
interface Props {
  categories: Array<Category>
  jobs: Array<Job>
}

const map = new Map()

export default function Index(props: Props) {
  const router = useRouter()
  const [jobs, setJobs] = useState(props.jobs)

  const key = `API:Cache.Jobs`
  if (map.has(key)) {
    console.log('Cache has key', key, map.get(key)[1])
  }
  else {
    console.log('NO Cache. Set Date.now()', key)
    map.set(key, [{}, Date.now()])
  }

  useEffect(() => {
    const page = !isNaN(Number(router.query['page'])) ? Number(router.query['page']) : 1
    const size = !isNaN(Number(router.query['size'])) ? Number(router.query['size']) : 20

    const sliceStart = page == 1 ? 0 : size * (page - 1)
    const sliceEnd = page * size
    setJobs(props.jobs.slice(sliceStart, sliceEnd))
  }, [props.jobs, router.query])

  return (
    <NavigationProvider categories={props.categories}>
      <SEO title='Find Web3 jobs' description='Find the latest Web3, Solidity, Ethereum, developer, engineering, product &amp; software jobs in the Web3 ecosystem.' />
      <MainLayout className={styles.container} title='Web3 Jobs'>
        <article>
          <p>Find the latest Web3, Solidity, Ethereum, developer, engineering, product &amp; software jobs in the Web3 ecosystem.</p>
        </article>

        <article>
          <h2>
            Add your company
          </h2>
          <p>
            You can use the <Link href='https://airtable.com/shrIbgc0llBQFpo7G'>Company form</Link> to submit your company profile for review.
          </p>
        </article>

        <article>
          <h2>
            Add your job(s)
          </h2>
          <p>
            You can use the <Link href='https://airtable.com/shrY9atkDkPKKd03Z'>Jobs form</Link> to submit your job(s) for review. Please make sure your company profile is submitted and reviewed first! 
          </p>
        </article>

        <article>
          <p>useWeb3 has a technical audience, software engineers, builders, product developers, designers, researchers and makers. It will only list companies and jobs that are aligned with the values of Web3 and are contributing to core, open-source infrastructure, products, tools, frameworks and DAOs. </p>
        </article>

        <Pagination total={props.jobs.length} />

        <main>
          <Featured type='rows'>
            {jobs.map(i => {
              return (
                <Row
                  key={`${i.id}_${i.location}`}
                  title={i.title}
                  description={i.location}
                  date={moment(i.updated).fromNow(true)}
                  author={i.company.title}
                  authorUrl={i.company.id}
                  url={i.url} 
                  imageUrl={i.company.logo}
                  featured={i.featured} />
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
  const service = new AirtableItemService()
  const categories = await service.GetCategories()

  const jobService = new JobService()
  const jobs = await jobService.GetJobs('', JOBS_AMOUNT_PER_COMPANY)

  return {
    props: {
      categories,
      jobs
    },
    revalidate: DEFAULT_REVALIDATE_PERIOD
  }
}
