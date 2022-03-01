import { Link } from 'components/link'
import { useRouter } from 'next/router'
import { useNavigation } from 'hooks/useNavigation'
import styles from './sitenav.module.scss'

interface Props {
  className?: string
}

export function Sitenav(props: Props) {
  const router = useRouter()
  const categories = useNavigation()
  const currentPath = router.asPath
  let className = styles.container
  if (props.className) className += ` ${props.className}`

  return (
    <nav className={className}>
      <ul className={styles.sidenav}>
        <li className={currentPath === '/' ? styles.active : ''}>
          <Link href="/">
            <span role="img" aria-label="首页">
              🏠
            </span>
            <span className={styles.text}>首页</span>
          </Link>
        </li>
        <li className={currentPath.includes('/jobs') ? styles.active : ''}>
          <Link href={'https://www.useweb3.xyz/jobs'}>
            <span role="img" aria-label="招聘">
              💼
            </span>
            <span className={styles.text}>招聘</span>
          </Link>
        </li>
        {categories.map((i) => {
          return (
            <li key={i.id} className={currentPath.includes(`/${i.id}`) ? styles.active : ''}>
              <Link href={`/${i.id}`}>
                <span role="img" aria-label={i.id}>
                  {i.emoji}
                </span>
                <span className={styles.text}>{i.title}</span>
              </Link>
            </li>
          )
        })}
        <li className={currentPath.includes('/gas') ? styles.active : ''}>
          <Link href={'https://www.useweb3.xyz/gas'}>
            <span role="img" aria-label="jobs">
              ⛽
            </span>
            <span className={styles.text}>Gas</span>
          </Link>
        </li>
        <li className={currentPath.includes('/tags') ? styles.active : ''}>
          <Link href={'/tags'}>
            <span role="img" aria-label="tags">
              🏷️
            </span>
            <span className={styles.text}>标签</span>
          </Link>
        </li>
        <li>
          <Link href="https://github.com/xusai2014/useWeb3/tree/main/content">
            <span role="img" aria-label="submit">
              🔗
            </span>
            <span className={styles.text}>Submit</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
