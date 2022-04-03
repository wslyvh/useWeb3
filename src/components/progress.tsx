import styles from './progress.module.scss'

interface Props {
  current: number
  total: number
  className?: string
}

export function Progress(props: Props) {
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`

  return (
    <div className={className}>
      <progress value={(100 / props.total) * props.current} max={100} />
      <small className={styles.lessons}>
        Lesson {props.current} / {props.total} lessons
      </small>
    </div>
  )
}
