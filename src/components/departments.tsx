import { Link } from './link'
import styles from './tags.module.scss'

interface Props {
  departments: Array<string>
  className?: string
}

export function Departments(props: Props) {
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`

  return (
    <ul className={className}>
      {props.departments.map((i) => {
        const id = i.toLowerCase()

        return (
          <li key={id} className="block fixed">
            <Link href={`/${id}-jobs`}>
              {i}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
