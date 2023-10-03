export const COLOR_PRIMARY = ['#3c4a59']
export const COLOR_MULTIPLE = ['#3c4a59', '#c1e5fb']
export const DEFAULT_CHART_OPTIONS = {
  colors: COLOR_PRIMARY,
  chart: {
    zoom: {
      enabled: false,
      autoScaleYaxis: false,
    },
  },
  stroke: {
    show: true,
    curve: 'smooth' as any,
    width: 2,
  },
  markers: {
    size: 3,
  },
}
