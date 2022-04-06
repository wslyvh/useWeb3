import styles from './footer.module.scss'
import { Link } from 'components/link'
import Image from 'next/image'
import { DEPARTMENTS } from 'utils/jobs'
import { defaultSlugify } from 'utils/helpers'

type Props = {
  className?: string
}

export function Footer(props: Props) {
  let className = `${styles.footer}`
  if (props.className) className += ` ${props.className}`

  return (
    <footer className={className}>
      <div className={styles.inner}>
        <div className={styles.navigation}>
          <ul>
            <li className={styles.header}>Explore</li>
            <li><Link href='/guides'>Guides</Link></li>
            <li><Link href='/guides'>Books</Link></li>
            <li><Link href='/guides'>Tags</Link></li>
            <li><Link href='/guides'>etc</Link></li>
          </ul>
          <ul>
            <li className={styles.header}>Learn</li>
            <li><Link href='/guides'>etc</Link></li>
          </ul>
          <ul>
            <li className={styles.header}>Build</li>
            <li><Link href='/guides'>Grants</Link></li>
            <li><Link href='/guides'>Starter Kits</Link></li>
            <li><Link href='/guides'>etc</Link></li>
          </ul>
          <ul>
            <li className={styles.header}>Jobs</li>
            {DEPARTMENTS.map(i => {
              const id = defaultSlugify(i)
              return <li key={i}><Link href={`/${id}-jobs`}>{i}</Link></li>
            })}
          </ul>
        </div>

        <hr />

        <div className={styles.credits}>
          <ul>
            <li className={styles.icon}><Link href="https://github.com/wslyvh/useWeb3"><i className="bi bi-github" /></Link></li>
            <li className={styles.icon}><Link href="https://twitter.com/useWeb3"><i className="bi bi-twitter" /></Link></li>
            <li>by <Link href="https://twitter.com/wslyvh">@wslyvh</Link></li>
          </ul>

          <Link href="https://vercel.com/?utm_source=useWeb3&amp;utm_campaign=oss">
            <Image
              src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg"
              alt="Powered by Vercel"
              height={32}
              width={120}
            />
          </Link>
        </div>
      </div>
    </footer>
  )
}
