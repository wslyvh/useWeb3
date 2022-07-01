import { Pagination } from 'components/pagination'
import { Featured } from 'components/featured'
import styles from './issues.module.scss'
import { IssuePanel, PanelCard } from './panel'
import { PagedResult } from 'types/paged'
import { DEFAULT_MAX_ITEMS } from 'utils/constants'
import { Issue } from 'types/issue'

interface Props {
  results: PagedResult<Issue>
  className?: string
}

export function IssuesOverview(props: Props) {
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`

  return (
    <div className={className}>
      <p>
        Make your first contribution to any open-source Web3 project by tackling one of the issues listed below.
      </p>
      <p>
        Each issue displayed here is a "good first issue," selected for its relative approachability for first-time contributors.
      </p>

      <Featured className={styles.featured}>
        <PanelCard
          title="Ethereum.org"
          icon="✨"
          description="Ethereum.org is a primary online resource for the Ethereum community. "
          url="https://ethereum.org/en/contributing/"
          level="Beginner"
          tags={['Html', 'TypeScript', 'React']}
        />
        <PanelCard
          title="Privacy &amp; Scaling Explorations"
          icon="✨"
          description="We work to bridge the gap between cutting-edge research in Zero-Knowledge Proofs (ZKP), and application development on Ethereum."
          url="https://github.com/issues?q=is%3Aopen+is%3Aissue+org%3Aprivacy-scaling-explorations+label%3A%22help+wanted%22%2C%22good+first+issue%22+sort%3Areactions-%2B1+"
          level="Intermediate"
          tags={['TypeScript', 'Rust', 'Cryptography']}
        />
        <PanelCard
          title="Solidity"
          icon="✨"
          description="Solidity, the Smart Contract Programming Language "
          url="https://github.com/ethereum/solidity/contribute"
          level="Intermediate"
          tags={['C++', 'Solidity', 'Smart Contracts']}
        />
      </Featured>

      {props.results.items.length === 0 && <p>No issues found.</p>}

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
                return <IssuePanel key={`${i.id}_${i.number}`} issue={i} />
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
