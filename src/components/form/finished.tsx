import { Link } from 'components/link'
import { Organization } from 'types/org'
import { Job } from 'types/job'
import { Order } from 'types/order'
import styles from './forms.module.scss'

interface Props {
  org: Organization
  job: Job
  order: Order
  className?: string
}

export function Finished(props: Props) {
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`

  return (
    <div className={className}>
      <p>
        Thank you for submitting your job posting. After confirmation of your transaction details, your posting will be
        pushed online. This usually happens within 24 hrs.
      </p>

      <p>For your reference</p>
      <ul>
        <li>Organization ID: {props.org.id}</li>
        <li>Job ID: {props.job.id}</li>
        <li>Order ID: {props.order.id}</li>
      </ul>

      <p>
        <Link href={`/api/org/order/invoice/${props.order.id}`} newWindow>
          Download invoice
        </Link>
      </p>
    </div>
  )
}
