import { Count } from 'types/count'
import { Link } from './link'
import styles from './tags.module.scss'

interface Props {
  tags: Array<Count>
  className?: string
}

export function Tags(props: Props) {
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`

  return (
    <ul className={className}>
      {props.tags.map((i) => {
        const id = i.key.toLowerCase()

        return (
          <li key={id} className="block fixed">
            <Link href={`/tags/${id}`}>
              {i.key}
              {i.count !== 0 && (
                <>
                  {' '}
                  <small>({i.count})</small>
                </>
              )}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
