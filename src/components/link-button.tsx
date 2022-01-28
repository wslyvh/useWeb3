import styles from './link-button.module.scss'
import { Link } from './link'

interface Props {
  href: string
  text: string
  type?: 'primary' | 'secondary' | 'twitter' | 'github' | 'website'
  className?: string
}

export function LinkButton(props: Props) {
  let className = `accent block ${styles.container} ${styles[props.type ?? 'primary']}`
  if (props.className) className += ` ${props.className}`

  let icon = <></>
  if (props.type === 'twitter') {
    icon = <i className={`bi bi-twitter ${styles.icon}`} />
  }
  if (props.type === 'github') {
    icon = <i className={`bi bi-github ${styles.icon}`} />
  }
  if (props.type === 'website') {
    icon = <i className={`bi bi-globe ${styles.icon}`} />
  }

  return (
    <Link href={props.href}>
      <span className={className}>
        {icon}
        {props.text}
      </span>
    </Link>
  )
}
