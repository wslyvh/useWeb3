export interface Repository {
  id: string
  name: string
  nameWithOwner: string
  description: string
  stargazerCount: number
  forkCount: number
  primaryLanguage: Language
  url: string
  createdAt: number
  updatedAt: number
  pushedAt: number
  owner: User
}

export interface Issue {
  id: string
  number: number
  title: string
  body: string
  url: string
  commentsCount: number
  labels: Label[]
  author: User
  repository: Repository
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
  name: string
  color: string
}
