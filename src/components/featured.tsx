import { ReactNode } from 'react'
import styles from './featured.module.scss'
import { Link } from './link'

interface Props {
  title?: string
  link?: string
  className?: string
  children: ReactNode
}

export function Featured(props: Props) {
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`

  return (
    <article className={className}>
      <div className={styles.header}>
        {props.title && <h3>{props.title}</h3>}
        {props.link && <Link className={styles.link} href={props.link}>view all</Link>}
      </div>
      <div className={styles.grid}>{props.children}</div>
    </article>
  )
}
