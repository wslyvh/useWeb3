import { Count } from 'types/count'
import { Panel } from './panel'
import { defaultSlugify } from 'utils/helpers'
import styles from './tags.module.scss'

interface Props {
  tags: Array<Count>
  fill?: boolean
  small?: boolean
  large?: boolean
  className?: string
}

export function Tags(props: Props) {
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`
  if (props.small) className += ` ${styles.small}`

  return (
    <ul className={className}>
      {props.tags.map((i) => {
        const id = defaultSlugify(i.key)

        return (
          <li key={id}>
            <Panel href={`/tags/${id}`} type="secondary" {...props}>
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
