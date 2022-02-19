export interface Order {
  id: string
  name: string
  email: string
  address: string
  type: 'Standard' | 'Logo' | 'Featured'
  tx: string
  jobId: string
  companyName?: string
  created?: number
  invoiceNr?: number
}

export const defaultOrder = {
  id: '',
  name: '',
  email: '',
  address: '',
  type: 'Featured' as 'Standard' | 'Logo' | 'Featured',
  tx: '',
  jobId: '',
}
