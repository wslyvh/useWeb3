import { Link } from './link'
import styles from './tags.module.scss'

interface Props {
  tags: Array<string>
  className?: string
}

export function Tags(props: Props) {
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`

  return (
    <ul className={className}>
        {props.tags.map(i => {
            return <li key={i} className='block fixed'>
              <Link href={`/tags/${i.toLowerCase()}`}>{i}</Link>
            </li>
        })}
    </ul>
  )
}
