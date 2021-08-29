import React from 'react'
import styles from './card.module.scss'
import { Link } from 'components/link'
import { Tag } from './tag'

interface Props {
  title: string
  description: string
  author?: string
  small?: boolean
  tag?: string
  url?: string
  className?: string
}

export function Card(props: Props) {
  let className = `${styles.card} fixed block`
  if (props.className) className += ` ${props.className}`
  if (props.small) className += ` ${styles.small}`

  function getType() {
    if (props.tag === 'All') return 'info'
    if (props.tag === 'Beginner') return 'success'
    if (props.tag === 'Intermediate') return 'warning'
    if (props.tag === 'Advanced') return 'error'

    return undefined
  }

  return (
    <section className={className}>
      <h4 className={styles.title}>{props.title}</h4>
      <p className={styles.description}>{props.description}</p>
      {props.author && <p className={styles.author}>- {props.author}</p>}
      <div className={styles.footer}>
        {props.tag && 
          <Tag text={props.tag} type={getType()} />
        }
        {props.url && 
          <Link href={props.url}>
            <button className="accent block">&raquo;</button>
          </Link>
        }
      </div>
    </section>

  )
}
