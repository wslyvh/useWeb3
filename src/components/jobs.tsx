import Pagination from 'next-pagination'
import { Featured } from 'components/featured'
import { Newsletter } from 'components/newsletter'
import styles from './jobs.module.scss'
import { Job } from 'types/job'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { DEPARTMENTS_AS_COUNTS } from 'utils/jobs'
import { Tags } from './tags'
import { JobPanel } from './panel'

interface Props {
  jobs: Array<Job>
  className?: string
}

export function JobsOverview(props: Props) {
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`

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
    <div className={className}>
      <article>
        <p>
          Find the latest Web3, Solidity, Ethereum, developer, engineering, product &amp; software jobs in the Web3
          ecosystem.
        </p>
      </article>

      <div className={styles.filters}>
        <Newsletter className={styles.newsletter} title="" description="Receive the latest Web3 jobs in your inbox." />
      </div>

      <div className={styles.filters}>
        <Tags fill asJobs tags={[...DEPARTMENTS_AS_COUNTS, { key: 'Remote Web3', count: 0 }]} />
      </div>

      {props.jobs.length === 0 && <p>No active job openings. Try another filter.</p>}

      {props.jobs.length > 0 && (
        <>
          <Pagination total={props.jobs.length} />

          <main>
            <Featured type="rows">
              {jobs.map((i) => {
                return <JobPanel key={i.id} job={i} />
              })}
            </Featured>
          </main>

          <Pagination total={props.jobs.length} />

          <div className={styles.filters}>
            <Tags fill asJobs tags={[...DEPARTMENTS_AS_COUNTS, { key: 'Remote Web3', count: 0 }]} />
          </div>
        </>
      )}
    </div>
  )
}
