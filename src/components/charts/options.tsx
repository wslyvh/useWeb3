export const COLOR_PRIMARY = ['#3c4a59']
export const COLOR_MULTIPLE = [...COLOR_PRIMARY, '#c1e5fb']

export const COLOR_ARBITRUM = ['#12aaff']
export const COLOR_ARBITRUM_MULTIPLE = [...COLOR_ARBITRUM, '#213147']

export const COLOR_OPTIMISM = ['#ff0420']
export const COLOR_OPTIMISM_MULTIPLE = [...COLOR_OPTIMISM, '#3c4a59']

export const COLOR_POLYGON = ['#8247e5']
export const COLOR_POLYGON_MULTIPLE = [...COLOR_POLYGON, '#3c4a59']

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

export function GetChartColors(multiple: boolean, network?: string) {
  if (network === 'arbitrum') {
    return multiple ? COLOR_ARBITRUM_MULTIPLE : COLOR_ARBITRUM
  }
  if (network === 'optimism') {
    return multiple ? COLOR_OPTIMISM_MULTIPLE : COLOR_OPTIMISM
  }
  if (network === 'polygon') {
    return multiple ? COLOR_POLYGON_MULTIPLE : COLOR_POLYGON
  }

  return multiple ? COLOR_MULTIPLE : COLOR_PRIMARY
}
