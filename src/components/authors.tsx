import styles from './authors.module.scss'
import { Link } from './link'

interface Props {
  authors: Array<string>
  className?: string
}

export function Authors(props: Props) {
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`

  return (
    <ul className={className}>
      {props.authors.map((i, index) => {
        return (
          <li key={i}>
            {i.startsWith('@') && (
              <>
                <Link href={`https://twitter.com/${i.replace('@', '')}`}>{i.replace('@', '')}</Link>
                {index < props.authors.length - 1 && <>,</>}
              </>
            )}
            {!i.startsWith('@') && i}
          </li>
        )
      })}
    </ul>
  )
}
