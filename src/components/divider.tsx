import styles from './divider.module.scss'

interface Props {
  className?: string
}

export function Divider(props: Props) {
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`

  return <hr className={className} />
}
