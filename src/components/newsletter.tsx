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
  const description =
    props.description ??
    'Sign up to be the first to get it and stay up to date with the latest news, resources and updates.'

  return (
    <Panel className={className} type="tertiary">
      <section>
        <h3>{title}</h3>
        <p className={styles.description}>{description}</p>

        <form
          onSubmit={() => plausible('Subscribe')}
          action="https://www.getrevue.co/profile/useWeb3/add_subscriber"
          method="post"
          id="revue-form"
          name="revue-form"
          target="_blank"
          noValidate>
          <div>
            <div className={styles.row}>
              <div className="fixed wrapper block">
                <input type="email" name="member[email]" id="member_email" placeholder="email address" required />
              </div>
              <button type="submit" name="member[subscribe]" id="member_submit" className="accent block searchButton">
                Subscribe
              </button>
            </div>
            <div>
              <p>
                By subscribing, you agree with Revue’s{' '}
                <Link href="https://www.getrevue.co/terms">Terms of Service</Link> and{' '}
                <Link href="https://www.getrevue.co/privacy">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </form>
      </section>
    </Panel>
  )
}
