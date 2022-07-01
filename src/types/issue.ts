export interface Repository {
  id: string
  name: string
  description: string
  url: string
  owner: User
  stargazers: number
  forks: number
  primaryLanguage: string
}

export interface Issue {
  id: string
  number: number
  title: string
  body: string
  url: string
  labels: Label[]
  author?: User
  repository?: Repository
  createdAt: number
  updatedAt: number
}

export interface User {
  id: string
  login: string
  avatarUrl: string
  url: string
}

export interface Label {
  name: string
  color: string
}

export interface Language {
  id: string
  name: string
  color: string
}
