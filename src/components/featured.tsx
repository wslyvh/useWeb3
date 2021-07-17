import { ReactNode } from 'react'
import styles from './featured.module.scss'

interface Props {
  title?: string
  className?: string
  children: ReactNode
}

export function Featured(props: Props) {
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`

  return (
    <article className={className}>
      {props.title && <h2>{props.title}</h2>}
      <div className={styles.grid}>{props.children}</div>
    </article>
  )
}
