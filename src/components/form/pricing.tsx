import { Link } from 'components/link'
import { Panel } from 'components/panel'
import { DAYS_JOBS_LISTED_DEFAULT, DAYS_JOBS_LISTED_FEATURED, FEATURED_PRICE, NEWSLETTER_PRICE } from 'utils/jobs'
import styles from './forms.module.scss'

interface Props {
  className?: string
}

export function Pricing(props: Props) {
  let className = `${styles.pricing}`
  if (props.className) className += ` ${props.className}`

  return (
    <Panel className={className}>
      <section>
        <p>
          Standard listing <strong>free</strong>
        </p>
        <ul>
          <li>{DAYS_JOBS_LISTED_DEFAULT} days on the job board</li>
          <li>Listing is not guaranteed and depending on manual review/availability.</li>
        </ul>
        <p>
          Featured listing <strong>${FEATURED_PRICE} USD</strong>
        </p>
        <ul>
          <li>{DAYS_JOBS_LISTED_FEATURED} days on the job board</li>
          <li>At the top of the job board for 2 weeks</li>
          <li>Your organization logo added</li>
          <li>
            Shared on <Link href="https://twitter.com/useWeb3">Twitter</Link>, incl. a tag to your organization.
          </li>
        </ul>
        <p>
          Discounts <strong>get in touch</strong>
        </p>
        <ul>
          <li>Bulk discounts</li>
          <li>Recurring listings</li>
          <li>Premium organization profiles</li>
        </ul>
      </section>
    </Panel>
  )
}

export function PricingNewsletter(props: Props) {
  let className = `${styles.pricing}`
  if (props.className) className += ` ${props.className}`

  return (
    <Panel className={className}>
      <section>
        <p>
          Standard <strong>${NEWSLETTER_PRICE} USD</strong>
        </p>
        <ul>
          <li>1 premium slot in the newsletter</li>
        </ul>
        <p>
          Discounts <strong>get in touch</strong>
        </p>
        <ul>
          <li>Recurring sponsoring</li>
          <li>Combination with job listings</li>
        </ul>
      </section>
    </Panel>
  )
}
