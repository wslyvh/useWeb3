import { usePlausible } from 'next-plausible'
import React from 'react'
import { Link } from 'components/link'
import styles from './newsletter.module.scss'
import { Panel } from './panel'

interface Props {
  title?: string
  description?: string
  className?: string
}

export function Newsletter(props: Props) {
  const plausible = usePlausible()
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`
  const title = props.title ?? 'Newsletter'
  const description = props.description ?? 'Sign up to be the first to get it and stay up to date with the latest news, resources and updates.'

  return (
    <Panel className={className} type="tertiary" fill>
      <section>
        <h3>{title}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.responsive}>
          <iframe src="https://useweb3.substack.com/embed" />
        </div>
      </section>
    </Panel>
  )
}
