export interface Track {
  id: string
  version: number
  name: string
  description: string
  image?: string
  website?: string
  twitter?: string
  lessons: Array<Lesson>
  reward: Reward | Array<Reward>
  params: Params
}

export interface Reward {
  id: string
  params: Params
}

export interface Lesson {
  id: string
  name: string
  description: string
  body: string
  type: LessonTypes
  params: Params
}

export type LessonTypes = 'learn' | 'verify' | 'quiz'

export interface Params {
  [key: string]: string | boolean | number | Array<string>
}

export interface ApiResponseData<T> {
  code: number
  message: string
  data?: T
}

export interface ApiResponse {
  success: boolean
  message: string
}
