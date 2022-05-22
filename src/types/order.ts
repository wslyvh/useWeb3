export interface Order {
  id: string
  name: string
  email: string
  address: string
  type: 'Standard' | 'Featured'
  tx: string
  jobId: string
  orgName?: string
  created?: number
  invoiceNr?: number
}

export const defaultOrder = {
  id: '',
  name: '',
  email: '',
  address: '',
  type: 'Featured' as 'Standard' | 'Featured',
  tx: '',
  jobId: '',
}
