import React, { ReactNode } from 'react'
import { getLevelStyle } from 'utils/helpers'
import { Link } from './link'
import styles from './panel.module.scss'

interface Props {
  children: ReactNode
  href?: string
  type?: 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'info' | 'success' | 'warning' | 'error'
  fill?: boolean
  small?: boolean
  stretch?: boolean
  className?: string
}

export function Panel(props: Props) {
  let containerClassName = styles.container
  if (props.className) containerClassName += ` ${props.className}`

  let className = `${styles[props.type ?? 'primary']}`
  if (props.href) className += ` ${styles.link}`
  if (props.fill) className += ` ${styles.fill}`
  if (props.small) className += ` ${styles.small}`
  if (props.stretch) className += ` ${styles.stretch}`

  if (props.href) {
    return (
      <div className={containerClassName}>
        <Link href={props.href} className={className}>
          <div className={styles.border}>{props.children}</div>
        </Link>
      </div>
    )
  }

  return (
    <div className={containerClassName}>
      <div className={className}>
        <div className={styles.border}>{props.children}</div>
      </div>
    </div>
  )
}

interface CardProps {
  title: string
  icon?: string
  description?: string
  url: string
  detailsUrl?: string
  tags: string[]
  level?: 'All' | 'Beginner' | 'Intermediate' | 'Advanced'
  className?: string
}

export function PanelCard(props: CardProps) {
  let className = `${styles.card}`
  if (props.className) className += ` ${props.className}`

  return (
    <Panel
      className={className}
      href={props.url}
      type={props.level ? getLevelStyle(props.level) : 'primary'}
      fill
      stretch>
      <div className={styles.inner}>
        <h4 className={styles.title}>
          {props.icon && <small>{props.icon}</small>} {props.title}
        </h4>

        <ul className={styles.tags}>
          {props.tags &&
            props.tags.map((i) => {
              return (
                <li key={i}>
                  <Panel className={styles.tag} href={`/tags/${i.toLowerCase()}`} type="neutral" small>
                    {i}
                  </Panel>
                </li>
              )
            })}
        </ul>

        <p className={`${styles.description} muted`}>{props.description}</p>

        {props.detailsUrl && (
          <p className={`${styles.details} muted`}>
            <Link href={props.detailsUrl}>more details &raquo;</Link>
          </p>
        )}
      </div>
    </Panel>
  )
}
