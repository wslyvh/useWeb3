import { Link } from 'components/link'
import { useNavigation } from 'hooks/useNavigation'
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
                <span role="img" aria-label="home">🏠</span> 
                <span className={styles.text}>Home</span>
              </Link>
            </li>
            {categories.map(i => {
              return (
                <li key={i.id}>
                  <Link href={i.id}>
                    <span role="img" aria-label={i.id}>{i.emoji}</span>
                    <span className={styles.text}>{i.title}</span>
                  </Link>
                </li>
              )
            })}
            <li>
              <Link href='submit'>
                <span role="img" aria-label="submit">🔗</span>
                <span className={styles.text}>Submit</span>
              </Link>
            </li>
        </ul>
    </nav>
  )
}
