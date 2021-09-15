
export function getLevelStyle(tag: string) { 
    if (tag === 'All') return 'info'
    if (tag === 'Beginner') return 'success'
    if (tag === 'Intermediate') return 'warning'
    if (tag === 'Advanced') return 'error'

    return undefined
}