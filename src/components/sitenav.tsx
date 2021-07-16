import Link from 'next/link'
import styles from './sitenav.module.scss'

interface Props {
  className?: string
}

export function Sitenav(props: Props) {
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
            <li>
              <Link href='/courses'>
                <a>
                  <span role="img" aria-label="courses">🎓</span>
                  <span className={styles.text}>Courses</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href='/tutorials'>
                <a>
                  <span role="img" aria-label="tutorials">💻</span>
                  <span className={styles.text}>Tutorials</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href='/videos'>
                <a>
                  <span role="img" aria-label="videos">🎞️</span>
                  <span className={styles.text}>Videos</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href='/books'>
                <a>
                  <span role="img" aria-label="books">📚</span>
                  <span className={styles.text}>Books</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href='/websites'>
                <a>
                  <span role="img" aria-label="websites">🌐</span>
                  <span className={styles.text}>Websites</span>
                </a>
              </Link>
            </li>

            <li>
              <Link href='/podcasts'>
                <a>
                  <span role="img" aria-label="podcasts">🎧</span>
                  <span className={styles.text}>Podcasts</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href='/events'>
                <a>
                  <span role="img" aria-label="events">🎫</span>
                  <span className={styles.text}>Events</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href='/challenges'>
                <a>
                  <span role="img" aria-label="challenges">🎯</span>
                  <span className={styles.text}>Code challenges</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href='/tools'>
                <a>
                  <span role="img" aria-label="tools">🛠️</span>
                  <span className={styles.text}>Tools</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href='/interviews'>
                <a>
                  <span role="img" aria-label="interviews">📝</span>
                  <span className={styles.text}>Interview questions</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href='/jobs'>
                <a><span role="img" aria-label="jobs">💼</span>
                <span className={styles.text}>Jobs</span></a>
              </Link>
            </li>
            <li>
              <Link href='/newsletter'>
                <a>
                  <span role="img" aria-label="newsletter">📰</span>
                  <span className={styles.text}>Newsletter</span>
                </a>
              </Link>
            </li>
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
