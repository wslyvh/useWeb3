import React from 'react'
import styles from './card.module.scss'
import { Link } from 'components/link'
import { Levels } from './levels'

interface Props {
  title: string
  description: string
  author?: string
  small?: boolean
  levels?: Array<string>
  detailsUrl?: string
  url?: string
  className?: string
}

export function Card(props: Props) {
  let className = `${styles.card} fixed block`
  if (props.className) className += ` ${props.className}`
  if (props.small) className += ` ${styles.small}`

  return (
    <section className={className}>
      {props.url && (
        <Link href={props.url}>
          <h4 className={styles.title}>{props.title}</h4>
        </Link>
      )}
      {!props.url && <h4 className={styles.title}>{props.title}</h4>}
      <p className={styles.description}>{props.description}</p>
      {props.author && <p className={styles.author}>- {props.author}</p>}
      {props.levels && <Levels levels={props.levels} /> }
      <div className={styles.footer}>
        {props.detailsUrl && (
          <Link className={styles.details} href={props.detailsUrl}>
            <span>More details &raquo;</span>
          </Link>
        )}
        {!props.detailsUrl && <span></span>}
        {props.url && (
          <Link href={props.url}>
            <button className="accent block">&raquo;</button>
          </Link>
        )}
      </div>
    </section>
  )
}
