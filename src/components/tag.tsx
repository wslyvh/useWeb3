import styles from './tag.module.scss'

interface Props {
  text: string
  type?: 'info' | 'warning' | 'success' | 'error'
  className?: string
}

export function Tag(props: Props) {
  let className = `${styles.tag} ${styles[props.type ?? 'default']}`
  if (props.className) className += ` ${props.className}`

  return (
    <span className={className}>
      {props.text}
    </span>
  )
}
