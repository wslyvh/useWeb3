import React from 'react'
import styles from './alert.module.scss'

interface Props {
  text: string
  type: 'info' | 'success' | 'warning' | 'error'
  className?: string
}

export function Alert(props: Props) {
  let className = styles[props.type]
  if (props.className) className += ` ${props.className}`

  return (
    <section className={className}>
      <div className={styles.icon}>
        {props.type === 'info' && <i className="bi bi-info-circle" />}
        {props.type === 'success' && <i className="bi bi-check-circle" />}
        {props.type === 'warning' && <i className="bi bi-exclamation-triangle" />}
        {props.type === 'error' && <i className="bi bi-exclamation-octagon" />}
      </div>
      <p className={styles.description}>{props.text}</p>
    </section>
  )
}
