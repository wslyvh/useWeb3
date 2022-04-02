import { ReactNode } from 'react'
import { Track } from 'types/learn'
import styles from './container.module.scss'

type Props = {
  track: Track
  className?: string
}

export function Container(props: Props) {
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`

  return (
    <section className={className}>
      <div>Progress Bar</div>
      <div>Prev / Next</div>

      <div>Content: Current step</div>

      <div>Prev / Next</div>
    </section>
  )
}
