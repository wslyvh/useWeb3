import { GasFee } from 'types/gas'
import moment from 'moment'
import dynamic from 'next/dynamic'
import { DEFAULT_CHART_OPTIONS } from './options'

const DynamicChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

interface Props {
  data: GasFee[]
}

export function Heatmap(props: Props) {
  const hourLabels = new Array(24).fill(0).map((_, i) => `${i}:00`)
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const options = {
    ...DEFAULT_CHART_OPTIONS,
    xaxis: {
      categories: dayLabels,
    },
  }

  const series = hourLabels
    .map((i) => {
      return {
        name: `${i}:00`,
        data: dayLabels.map((day) => {
          const fee = props.data.find((fee: GasFee) => {
            return moment(fee.period).hour() === parseInt(i) && moment(fee.period).format('ddd') === day
          })
          return fee ? Math.round(fee.median * 100) / 100 : 0
        }),
      }
    })
    .reverse()

  return <DynamicChart options={options} series={series} type="heatmap" height={500} />
}
