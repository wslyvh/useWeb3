import styles from './celebrate.module.scss'
import Image from 'next/image'

interface Props {
  className?: string
}

export function Celebrate(props: Props) {
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`

  return (
    <div className={className}>
      <Image src="https://acegif.com/wp-content/uploads/funny-celebrate-8.gif" alt="Celebrate!" layout="fill" objectFit="contain" />
    </div>
  )
}
