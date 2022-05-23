import { Dropdown } from 'components/dropdown'
import { Link } from 'components/link'
import { Job } from 'types/job'
import { Order } from 'types/order'
import { SITE_URL } from 'utils/constants'
import { getPrice } from 'utils/jobs'
import styles from './forms.module.scss'
import { FormInput } from './input'
import { Payment } from './payment'
import { Pricing } from './pricing'

interface Props {
  job: Job
  order: Order
  onChange: (value: Order) => void
  className?: string
}

const orderTypes = ['Standard', 'Featured']

export function OrderForm(props: Props) {
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`
  const orderLink = `${SITE_URL}jobs/post?id=${props.job.id}`

  return (
    <div className={className}>
      <h2>Step 3: Contact &amp; Invoice details</h2>
      <p className="muted">
        All the information here will not be shared public and is only used for administrative purposes.
      </p>

      <div className={styles.form}>
        <div className={styles.group}>
          <Pricing />
        </div>

        <div className={styles.group}>
          <p>
            <b>
              If you're planning to post multiple jobs, feel free to skip this payment step and only send a single
              transaction for all jobs at the end. Or feel free to get in touch!
            </b>
          </p>
          <p>
            If you need approval or can&apos;t complete this transaction right now, no worries! You can always come back
            to this page using the following link.
          </p>
          <ul>
            <li>
              <Link href={orderLink}>{props.job.title}</Link>
              <i
                className={`${styles.icon} bi bi-clipboard`}
                role="button"
                onClick={() => navigator.clipboard.writeText(orderLink)}
              />
            </li>
          </ul>
        </div>

        <FormInput
          id="name"
          name="Name"
          info="Contact name"
          value={props.order.name}
          onChange={(value) => props.onChange({ ...props.order, name: value })}
          required
        />

        <FormInput
          id="email"
          name="Email"
          info="Contact email"
          value={props.order.email}
          onChange={(value) => props.onChange({ ...props.order, email: value })}
          required
        />

        <FormInput
          id="address"
          type="textarea"
          name="Address"
          info="Address or invoice details. You can leave this empty if you dont require an invoice."
          value={props.order.address}
          rows={5}
          onChange={(value) => props.onChange({ ...props.order, address: value })}
        />

        <div className={styles.group}>
          <label className={styles.header} htmlFor="department">
            Listing Type
          </label>
          <span className={styles.info}>How do you want the job to be listed?</span>

          <div>
            <Dropdown
              className={styles.dropdown}
              items={orderTypes}
              selected={'Featured'}
              onSelect={(value) => props.onChange({ ...props.order, type: value as any })}
            />
          </div>
        </div>

        <div className={styles.group}>
          <Payment price={getPrice(props.order.type)} />
        </div>

        <FormInput
          id="tx"
          name="Transaction"
          info="Include transaction hash or link to payment confirmation"
          placeholder="https://etherscan.io/tx/0xb99f7f0d29a6fa7c9aef5e832072f0402ee519aec2523993d467dfa1fc7931ee"
          value={props.order.tx}
          onChange={(value) => props.onChange({ ...props.order, tx: value })}
          required
        />
      </div>
    </div>
  )
}
