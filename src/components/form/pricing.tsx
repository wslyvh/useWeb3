import { Link } from 'components/link'
import { Panel } from 'components/panel'
import styles from './forms.module.scss'
import { NEWSLETTER_PRICE } from 'utils/jobs'

interface Props {
  className?: string
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
