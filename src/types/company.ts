export interface Company {
  id: string
  title: string
  description: string
  body: string
  logo?: string
  website?: string
  twitter?: string
  github?: string
  externalJobBoard?: string
}

export const defaultCompany = {
  id: '',
  title: '',
  description: '',
  body: '',
  website: '',
  twitter: '',
  github: '',
  externalJobBoard: '',
  logo: '',
}