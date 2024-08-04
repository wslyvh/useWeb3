import { ReactNode } from 'react'
import styles from './featured.module.scss'
import { Link } from './link'

interface Props {
  title?: string
  link?: string
  type?: 'grid' | 'rows'
  className?: string
  children: ReactNode
  double?: boolean
}

export function Featured(props: Props) {
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`
  let type = styles.grid
  if (props.double) type += ` ${styles.double}`
  if (props.type) type = styles[props.type]

  return (
    <article className={className}>
      <div className={styles.header}>
        {props.title && <h3>{props.title}</h3>}
        {props.link && (
          <Link className={styles.link} href={props.link}>
            view all
          </Link>
        )}
      </div>
      <div className={type}>{props.children}</div>
    </article>
  )
}
