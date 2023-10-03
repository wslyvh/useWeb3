import { GasFee } from 'types/gas'
import moment from 'moment'
import dynamic from 'next/dynamic'
import { COLOR_MULTIPLE, DEFAULT_CHART_OPTIONS } from './options'

const DynamicChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

interface Props {
  data: GasFee[]
}

export function TrendChart(props: Props) {
  const options = {
    ...DEFAULT_CHART_OPTIONS,
    colors: COLOR_MULTIPLE,
    xaxis: {
      categories: props.data
        .sort((a, b) => {
          return moment(a.period).diff(moment(b.period))
        })
        .map((item) => item.blockNr ?? moment(item.period).format('DD MMM, HH:mm')),
    },
  }
  const series = [
    {
      name: 'median',
      data: props.data.map((item) => Math.round(item.median * 100) / 100),
    },
    {
      name: 'baseFee',
      data: props.data.map((item) => Math.round(item.baseFee * 100) / 100),
    },
  ]

  return <DynamicChart options={options} series={series} type="line" height={500} />
}
