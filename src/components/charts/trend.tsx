import { GasFee } from 'types/gas'
import moment from 'moment'
import dynamic from 'next/dynamic'
import { DEFAULT_CHART_OPTIONS, GetChartColors } from './options'
import { NETWORKS } from 'services/indexer'

const DynamicChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

interface Props {
  data: GasFee[]
  network?: NETWORKS
}

export function TrendChart(props: Props) {
  const options = {
    ...DEFAULT_CHART_OPTIONS,
    colors: GetChartColors(true, props.network),
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
      name: 'baseFee',
      data: props.data.map((item) => Math.round(item.baseFee * 100) / 100),
    },
  ]

  return <DynamicChart options={options} series={series} type="line" height={500} />
}
