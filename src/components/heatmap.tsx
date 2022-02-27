import styles from './heatmap.module.scss'
import { HeatMapGrid } from 'react-grid-heatmap'

interface Props {
  data: (number | null)[][]
  x: string[]
  y: string[]
  className?: string
}

export function Heatmap(props: Props) {
  let className = `${styles.container}`
  if (props.className) className += ` ${props.className}`

  return (
    <section className={className}>
      <HeatMapGrid
        data={props.data}
        xLabels={props.x}
        yLabels={props.y}
        cellRender={(x, y, value) => <span>{value}</span>}
        xLabelsStyle={() => ({
          fontSize: '1rem',
        })}
        yLabelsStyle={() => ({
          fontSize: '.75rem',
        })}
        cellStyle={(_x, _y, ratio) => ({
          background: `rgb(182, 196, 196, ${ratio})`,
          color: '#3C4A59',
        })}
        cellHeight="1.5rem"
      />

      <div>
        <span className="muted">* timezone in UTC</span>
      </div>
    </section>
  )
}
