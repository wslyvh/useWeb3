import slugify from 'slugify'
import { DEFAULT_REVALIDATE_PERIOD } from './constants'

export function getLevelStyle(tag: string) {
  if (tag === 'All') return 'info'
  if (tag === 'Beginner') return 'success'
  if (tag === 'Intermediate') return 'warning'
  if (tag === 'Advanced') return 'error'

  return undefined
}

export function isCacheExpired(map: Map<any, any>, key: string) {
  const [, timestamp] = map.get(key)

  return (Date.now() - timestamp) / 1000 > DEFAULT_REVALIDATE_PERIOD
}

export function removeHtml(value: string) {
  if (!value) return value

  // removes html. breaks/newlines. replaces multiple spaces with a single space.
  return value
    .replace(/<[^>]*>?/gm, '')
    .replace(/(\r\n|\n|\r)/gm, ' ')
    .replace(/\s\s+/g, ' ')
}

export function isEmail(text: string): boolean {
  var regex = /\S+@\S+\.\S+/
  return regex.test(text)
}

export function defaultSlugify(text: string): string {
  return slugify(text, { lower: true, strict: true, trim: true })
}

export function getYoutubeVideoId(url: string): string | null {
  const regexExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regexExp)

  return match && match[2].length == 11 ? match[2] : null
}

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function toTags(values: string[]) {
  return values.map((i) => {
    return {
      key: i,
      count: 0,
    }
  })
}
