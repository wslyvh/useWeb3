import { defaultSlugify } from 'utils/helpers'
import { Panel } from './panel'
import styles from './departments.module.scss'

interface Props {
  departments: Array<string>
  className?: string
}

export function Departments(props: Props) {
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`

  return (
    <ul className={className}>
      {props.departments.map((i) => {
        const id = defaultSlugify(i)

        return (
          <li key={id}>
            <Panel type="secondary" href={`/${id}-jobs`}>
              {i}
            </Panel>
          </li>
        )
      })}
    </ul>
  )
}
