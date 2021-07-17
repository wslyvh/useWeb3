import styles from './tag.module.scss'

interface Props {
  text: string
  className?: string
}

export function Tag(props: Props) {
  let className = `${styles.tag}`
  if (props.className) className += ` ${props.className}`

  return (
    <div className={className}>
      {props.text}
    </div>
  )
}
