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

export interface GasData {
  lastHour: number
  fees: GasFee[]
}

export interface GasFee {
  blockNr: number
  period: string // timestamp
  baseFee: number
  gasLimit: number
  gasUsed: number
  min: number
  median: number
  ethPrice: number
}
