export interface BountySource {
  title: string
  description: string
  url: string
  tags: string[]
  level: 'All' | 'Beginner' | 'Intermediate' | 'Advanced'
  platform: string
}
