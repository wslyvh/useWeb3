export type ATS = 'Angel' | 'Breezy' | 'Greenhouse' | 'Lever' | 'Recruitee' | 'Workable' | 'Wrk' | 'Other'

export interface Organization {
  id: string
  title: string
  description: string
  body: string
  ATS: ATS
  logo?: string
  website?: string
  twitter?: string
  github?: string
  externalBoardUrl?: string
}

export const defaultOrg: Organization = {
  id: '',
  title: '',
  description: '',
  body: '',
  logo: '',
  website: '',
  twitter: '',
  github: '',
  ATS: 'Other',
  externalBoardUrl: '',
}
