import { DEFAULT_REVALIDATE_PERIOD } from "./constants"

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
    return value.replace(/<[^>]*>?/gm, '').replace(/(\r\n|\n|\r)/gm, ' ').replace(/\s\s+/g, ' ')
}