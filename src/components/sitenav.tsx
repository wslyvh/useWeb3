import { useNavigation } from 'hooks/useNavigation'
import Link from 'next/link'
import styles from './sitenav.module.scss'

interface Props {
  className?: string
}

export function Sitenav(props: Props) {
  const categories = useNavigation()
  let className = styles.container
  if (props.className) className += ` ${props.className}`

  return (
    <nav className={className}>
        <ul className={styles.sidenav}>
            <li>
              <Link href='/'>
                <a>
                  <span role="img" aria-label="home">🏠</span> 
                  <span className={styles.text}>Home</span>
                </a>
              </Link>
            </li>
            {categories.map(i => {
              return (
                <li key={i.id}>
                  <Link href={`/${i.id}`}>
                    <a>
                      <span role="img" aria-label={i.id}>{i.emoji}</span>
                      <span className={styles.text}>{i.title}</span>
                    </a>
                  </Link>
                </li>
              )
            })}
            <li>
              <Link href='/submit'>
                <a>
                  <span role="img" aria-label="submit">🔗</span>
                  <span className={styles.text}>Submit</span>
                </a>
              </Link>
            </li>
        </ul>
    </nav>
  )
}
