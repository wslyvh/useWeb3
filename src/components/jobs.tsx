import { Pagination } from 'components/pagination'
import { Featured } from 'components/featured'
import { Newsletter } from 'components/newsletter'
import styles from './jobs.module.scss'
import { Job } from 'types/job'
import { Tag } from 'utils/jobs'
import { Tags } from './tags'
import { JobPanel } from './panel'
import { PagedResult } from 'types/paged'
import { DEFAULT_MAX_ITEMS } from 'utils/constants'

interface Props {
  results: PagedResult<Job>
  tags: Array<Tag>
  className?: string
}

export function JobsOverview(props: Props) {
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`

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
        <Tags
          fill
          asJobs
          tags={props.tags.map((i) => ({
            key: i,
            count: 0,
          }))}
        />
      </div>

      {props.results.items.length === 0 && <p>No active job openings. Try another filter.</p>}

      {props.results.items.length > 0 && (
        <>
          <Pagination
            className={styles.pagination}
            itemsPerPage={DEFAULT_MAX_ITEMS}
            totalItems={props.results.total}
            currentPage={props.results.currentPage}
            truncate
          />

          <main>
            <Featured type="rows">
              {props.results.items.map((i) => {
                return <JobPanel key={i.id} job={i} />
              })}
            </Featured>
          </main>

          <Pagination
            className={styles.pagination}
            itemsPerPage={DEFAULT_MAX_ITEMS}
            totalItems={props.results.total}
            currentPage={props.results.currentPage}
            truncate
          />
        </>
      )}
    </div>
  )
}
