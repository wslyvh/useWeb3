import React from 'react'
import styles from './row.module.scss'
import { Link } from 'components/link'
import Image from 'next/image'
import { defaultSlugify, getLevelStyle } from 'utils/helpers'
import { Tag } from 'components/tag'

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
      {props.featured && props.imageUrl && (
        <div className={styles.logo}>
          <Image src={props.imageUrl} alt={`${props.author} logo`} height={45} width={45} />
        </div>
      )}
      <Link href={`/jobs/${props.authorUrl}/${defaultSlugify(props.title)}`}>
        <h4 className={styles.title}>{props.title}</h4>
      </Link>
      <div className={styles.body}>
        <p className={styles.description}>
          <Link className={styles.author} href={`/jobs/${props.authorUrl}`}>
            {props.author}
          </Link>
          <span className={styles.muted}>{props.description}</span>
        </p>
        <p className={styles.date}>
          <span className={styles.muted}>{props.date}</span>
        </p>
        <Link className={styles.url} href={props.url}>
          <button className="accent block">apply &raquo;</button>
        </Link>
      </div>
    </section>
  )
}

interface BasicProps {
  title: string
  icon?: string
  description?: string
  url: string
  level?: string
  tags: string[]
  className?: string
}

export function BasicRow(props: BasicProps) {
  let className = `${styles.card} fixed block`
  if (props.className) className += ` ${props.className}`

  return (
    <section className={className}>
      <Link href={props.url}>
        <h4 className={styles.title}>
        {props.icon && <span>{props.icon}</span>} {props.title}</h4>
      </Link>

      <p className={styles.info}>{props.description}</p>

      <div className={styles.footer}>
        <div className={styles.level}>{props.level && <Tag text={props.level} type={getLevelStyle(props.level)} />}</div>
        <ul>
          {props.tags.map((i) => {
            return (
              <li key={i} className="block fixed inline">
                <Link href={`/tags/${i}`}>{i}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
