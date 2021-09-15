import styles from './authors.module.scss'
import { Link } from './link'

interface Props {
    authors: Array<string>
    className?: string
}

export function Authors(props: Props) {
    let className = `${styles.container}`
    if (props.className) className += ` ${props.className}`

    return (
        <ul className={className}>
            {props.authors.map(i => {
                return <li key={i}>
                    {i.startsWith('@') && (
                        <Link href={`https://twitter.com/${i.replace('@','')}`}>{i.replace('@','')}</Link>
                    )}
                    {!i.startsWith('@') && (
                        {i}
                    )}
                </li>
            })}
        </ul>
    )
}
