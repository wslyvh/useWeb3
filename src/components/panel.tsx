import React, { ReactNode } from 'react'
import Image from 'next/image'
import { Job } from 'types/job'
import { defaultSlugify, getLevelStyle, toTags } from 'utils/helpers'
import { getApplicationUrl } from 'utils/jobs'
import { Link } from './link'
import styles from './panel.module.scss'
import moment from 'moment'
import { Tags } from './tags'

interface Props {
  children: ReactNode
  href?: string
  type?: 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'info' | 'success' | 'warning' | 'error'
  fill?: boolean
  small?: boolean
  large?: boolean
  stretch?: boolean
  withIcons?: boolean
  className?: string
}

export function Panel(props: Props) {
  let containerClassName = styles.container
  if (props.className) containerClassName += ` ${props.className}`

  let className = `${styles[props.type ?? 'primary']}`
  if (props.href) className += ` ${styles.link}`
  if (props.fill) className += ` ${styles.fill}`
  if (props.small) className += ` ${styles.small}`
  if (props.withIcons) className += ` ${styles.icons}`
  if (props.large) className += ` ${styles.large}`
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

        {props.tags && props.tags.length > 0 && (
          <ul className={styles.tags}>
            {props.tags.map((i) => {
              return (
                <li key={i}>
                  <Panel className={styles.tag} href={`/tags/${i.toLowerCase()}`} type="neutral" small>
                    {i}
                  </Panel>
                </li>
              )
            })}
          </ul>
        )}

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

interface JobProps {
  job: Job
  className?: string
}

export function JobPanel(props: JobProps) {
  let className = `${styles.job}`
  if (props.className) className += ` ${props.className}`
  if (!props.job.featured) className += ` ${styles.normal}`
  if (props.job.featured) className += ` ${styles.featured}`

  const tags: string[] = [props.job.department]
  if (props.job.remote) {
    tags.push(`🌐 Remote`)
  }
  if (props.job.parttime) {
    tags.push('Part-time')
  }
  if (props.job.minSalary !== undefined && props.job.maxSalary !== undefined) {
    tags.push(`💰 ${props.job.minSalary / 1000}K - ${props.job.maxSalary / 1000}K`)
  }

  return (
    <Panel className={className} fill={!props.job.featured} type={props.job.featured ? 'warning' : 'neutral'} stretch>
      <div className={styles.inner}>
        {props.job.featured && (
          <Link className={styles.logo} href={`/jobs/${props.job.company.id}`}>
            {props.job.company.logo && (
              <Image src={props.job.company.logo} alt={`${props.job.company.title} logo`} height={64} width={64} />
            )}
            {!props.job.company.logo && (
              <span className={styles.badge}>{props.job.company.title.toUpperCase().charAt(0)}</span>
            )}
          </Link>
        )}
        <div className={styles.body}>
          <Link href={`/jobs/${props.job.company.id}/${defaultSlugify(props.job.title)}`}>
            <h4>
              {props.job.title}
              {props.job.featured && <span> 🔥</span>}
            </h4>
          </Link>
          <div>
            <Link href={`/jobs/${props.job.company.id}`}>{props.job.company.title}</Link>{' '}
            <span className="muted">{props.job.location}</span>
          </div>
          <Tags className={styles.tags} small withIcons noLinks tags={toTags(tags)} />
        </div>
        <div className={styles.actions}>
          <Panel fill type="secondary" href={getApplicationUrl(props.job.url)}>
            Apply
          </Panel>
          <span className={styles.date + ' muted'}>{moment(props.job.updated).fromNow(true)}</span>
        </div>
      </div>
    </Panel>
  )
}
