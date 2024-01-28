import styles from './gas-notifications.module.scss'

interface Props {
  type?: 'newsletter' | 'api' | 'oss'
  description?: string
  className?: string
}

const NOTIFICATIONS_ACTION = 'https://login.sendpulse.com/forms/simple/u/eyJ1c2VyX2lkIjo4Mzk2NTA3LCJhZGRyZXNzX2Jvb2tfaWQiOjMwNzI2NCwibGFuZyI6ImVuIn0='
const API_ACTION = 'https://login.sendpulse.com/forms/simple/u/eyJ1c2VyX2lkIjo4Mzk2NTA3LCJhZGRyZXNzX2Jvb2tfaWQiOjMwNzI4MSwibGFuZyI6ImVuIn0='
const OSS_ACTION = 'https://login.sendpulse.com/forms/simple/u/eyJ1c2VyX2lkIjo4Mzk2NTA3LCJhZGRyZXNzX2Jvb2tfaWQiOjMyMTUxNiwibGFuZyI6ImVuIn0='
const FROM_ADDRESS = 'notifications@useweb3.xyz'

export function GasNotifications(props: Props) {
  let action = NOTIFICATIONS_ACTION
  let type = props.type ?? 'newsletter'
  let className = `${styles.container}`
  let description = props.description ?? 'Sign up for Gas notifications'
  if (props.className) className += ` ${props.className}`
  if (type === 'api') {
    action = API_ACTION
  }
  if (type === 'oss') {
    action = OSS_ACTION
  }

  return (
    <div className={className}>
      <p className={styles.description}>{description}</p>

      <form action={action} target="_blank" method="post">
        <div className={styles.row}>
          <div className="fixed wrapper block">
            <input type="email" name="email" placeholder="email address" required />
            <input type="hidden" name="sender" value={FROM_ADDRESS} />
          </div>
          <button type="submit" className="accent block searchButton">
            Subscribe
          </button>
        </div>
      </form>
    </div>
  )
}
