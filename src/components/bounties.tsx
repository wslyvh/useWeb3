import { Featured } from 'components/featured'
import { PanelCard } from 'components/panel'
import { BountySource } from 'types/bounty'
import styles from './bounties.module.scss'

interface Props {
  sources: BountySource[]
}

export function BountiesOverview(props: Props) {
  if (!props.sources || props.sources.length === 0) {
    return null
  }

  return (
    <div className={styles.container}>
      <article>
        <p>
          Bounties are a practical way to start contributing to Web3 projects: pick a scoped task, submit the work, and get rewarded when it is
          accepted.
        </p>
        <p>This overview collects platforms that regularly list Web3 bounties, quests, grants, and paid open-source contribution opportunities.</p>
      </article>

      <Featured className={styles.featured}>
        {props.sources.map((source) => {
          return (
            <PanelCard
              key={source.url}
              title={source.title}
              icon="💸"
              description={source.description}
              url={source.url}
              level={source.level}
              tags={source.tags}
            />
          )
        })}
      </Featured>
    </div>
  )
}
