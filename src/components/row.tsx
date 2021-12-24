import React from 'react'
import styles from './row.module.scss'
import { Link } from 'components/link'
import slugify from 'slugify'
import Image from 'next/image'

interface Props {
  title: string
  description: string
  date: string
  author: string
  authorUrl: string
  url: string
  imageUrl?: string
  className?: string
  featured?: boolean
}

export function Row(props: Props) {
  let className = `${styles.card} fixed block`
  if (props.className) className += ` ${props.className}`
  if (props.featured) className += ` ${styles.featured}`

  return (
    <section className={className}>
      {props.featured && props.imageUrl && 
        <div className={styles.logo}>
          <Image src={props.imageUrl} alt={`${props.author} logo`} height={45} width={45} />
        </div>
      }
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
