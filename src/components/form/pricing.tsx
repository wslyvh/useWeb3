import { Link } from 'components/link'
import { Panel } from 'components/panel'
import { FEATURED_PRICE, LOGO_PRICE, STANDARD_PRICE } from 'utils/jobs'
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
          Standard listing <strong>${STANDARD_PRICE} USD</strong>
        </p>
        <ul>
          <li>60 days on the job board</li>
          {/* <li>{discountPercentage}% discount for each sequential job</li> */}
        </ul>
        <p>
          Logo listing <strong>${LOGO_PRICE} USD</strong>
        </p>
        <ul>
          <li>Same as standard listing</li>
          <li>Your company logo added to the listing</li>
        </ul>
        <p>
          Featured listing <strong>${FEATURED_PRICE} USD</strong>
        </p>
        <ul>
          <li>Same as logo listing</li>
          <li>At the top of the job board for 2 weeks</li>
          <li>
            <Link href="https://twitter.com/useWeb3">Twitter</Link> shoutout (1 tweet + 1 retweet)
          </li>
        </ul>
        {/* <p>* The bundle discount is automatically deducted on future listings (within the 60 days listing period)</p> */}
      </section>
    </Panel>
  )
}
