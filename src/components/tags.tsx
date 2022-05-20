import { Count } from 'types/count'
import { Panel } from './panel'
import { defaultSlugify } from 'utils/helpers'
import styles from './tags.module.scss'

interface Props {
  tags: Array<Count>
  fill?: boolean
  small?: boolean
  large?: boolean
  asJobs?: boolean
  withIcons?: boolean
  noLinks?: boolean
  className?: string
}

export function Tags(props: Props) {
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`
  if (props.small) className += ` ${styles.small}`
  if (props.withIcons) className += ` ${styles.icons}`

  return (
    <ul className={className}>
      {props.tags.map((i) => {
        const id = i.key.toLowerCase() // Keep spaces (no slugify)
        let href = `/tags/${id}`

        if (props.asJobs) {
          href = `/jobs/t/${defaultSlugify(id)}`
        }

        return (
          <li key={id}>
            <Panel href={props.noLinks ? undefined : href} type="secondary" {...props}>
              {i.key}
              {i.count !== 0 && (
                <>
                  {' '}
                  <small>({i.count})</small>
                </>
              )}
            </Panel>
          </li>
        )
      })}
    </ul>
  )
}
