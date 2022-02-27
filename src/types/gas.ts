export interface GasPrice {
  id: number
  baseFee: number
  prioritySlow: number
  priorityNormal: number
  priorityFast: number
  created: string
}

export interface Heatmap {
  x: string[]
  y: string[]
  data: (number | null)[][]
}
