import styles from './title-action.module.scss'
import { Panel } from 'components/panel'

type Props = {
  title: string
  action?: {
    href: string
    text: string
  }
  className?: string
}

export function TitleWithAction(props: Props) {
  let className = styles.container
  if (props.className) className += ` ${props.className}`

  return (
    <div className={className}>
      <h2>{props.title}</h2>
      {props.action && (
        <Panel className={styles.action} href={props.action.href}>
          {props.action.text}
        </Panel>
      )}
    </div>
  )
}
