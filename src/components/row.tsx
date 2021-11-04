import React from 'react'
import styles from './row.module.scss'
import { Link } from 'components/link'
import slugify from 'slugify'

interface Props {
  title: string
  description: string
  date: string
  author: string
  authorUrl: string
  url: string
  className?: string
}

export function Row(props: Props) {
  let className = `${styles.card} fixed block`
  if (props.className) className += ` ${props.className}`

  return (
    <section className={className}>
      <Link href={`/jobs/${props.authorUrl}/${slugify(props.title, { lower: true, strict: true, trim: true })}`}>
        <h4 className={styles.title}>{props.title}</h4>
      </Link>
      <div className={styles.body}>
        <p className={styles.description}>
          <Link className={styles.author} href={`/jobs/${props.authorUrl}`}>{props.author}</Link>
          <span className={styles.muted}>{props.description}</span>
        </p>
        <p className={styles.date}><span className={styles.muted}>{props.date}</span></p>
        <Link className={styles.url} href={props.url}>
          <button className="accent block">apply &raquo;</button>
        </Link>
      </div>
    </section>
  )
}
