import React, { useState } from 'react'
import styles from './alert.module.scss'

interface Props {
  text: string
  center?: boolean
  allowClose?: boolean
  type?: 'info' | 'success' | 'warning' | 'error'
  className?: string
}

export function Alert(props: Props) {
  const [closed, setClosed] = useState(false)
  let type = props.type ?? 'info'
  let className = styles[type]
  if (props.className) className += ` ${props.className}`
  if (props.center) className += ` ${styles.center}`

  if (closed) return null

  return (
    <section className={className}>
      <div className={styles.icon}>
        {type === 'info' && <i className="bi bi-info-circle" />}
        {type === 'success' && <i className="bi bi-check-circle" />}
        {type === 'warning' && <i className="bi bi-exclamation-triangle" />}
        {type === 'error' && <i className="bi bi-exclamation-octagon" />}
      </div>

      <p className={styles.description}>{props.text}</p>

      {props.allowClose && (
        <span role="button" className={styles.close} onClick={() => setClosed(true)}>
          <i className="bi bi-x-circle" />
        </span>
      )}
    </section>
  )
}
