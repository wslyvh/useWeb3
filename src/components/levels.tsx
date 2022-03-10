import { getLevelStyle } from 'utils/helpers'
import styles from './levels.module.scss'

interface Props {
    levels: Array<string>
  }
  
  export function Levels(props: Props) {
      
    return(
        <ul className={styles.container}>
            {props.levels.map((level, i) => {
                let type = getLevelStyle(level)
                let className = `${styles.tag} ${styles[type ?? 'default']}`
                if (className) className += ` ${className}`
              
                return <li key={i} className={className}>{level}</li>
            })}
        </ul>
    )
  }
