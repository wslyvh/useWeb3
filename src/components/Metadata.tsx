import React from 'react'
import { ContentItem } from 'types/content-item'

interface Props {
  type: 'content' | 'job'
  data: any
}

export function Metadata(props: Props) {
  // console.log('Generating JSON-LD', props.type, 'metadata..', props.data)

  function generateJsonLd() {
    if (props.type === 'content') {
      const item = props.data as ContentItem
      if (item.category.id === 'books') {
        // Book
      }
      if (item.category.id === 'code-challenges' || item.category.id === 'courses') {
        return `{
          "@context": "https://schema.org",
          "@type": "Course",
          "name": "${item.title}",
          "description": "${item.description}",
          "provider": {
            "@type": "Organization",
            "name": "${item.authors[0]}",
            "sameAs": "${item.url}"
          }
        }`
      }
      if (item.category.id === 'guides') {
        // Same as default: Article
      }
      if (item.category.id === 'movies') {
        // Movie
      }
      if (item.category.id === 'podcasts') {
        // Podcast
      }
      if (item.category.id === 'videos') {
        // Video
      }

      let authors = ''
      if (item.authors.length === 1) {
        authors = `"author": ${item.authors.map((i) => {
          return `{
            "@type": "Person",
            "name": "${i}",
            "url": "https://twitter.com/${i}"
          }`
        })}`
      }
      if (item.authors.length > 1) {
        authors = `"author": [${item.authors.map((i) => {
          return `{
            "@type": "Person",
            "name": "${i}",
            "url": "https://twitter.com/${i}"
          }`
        })}]`
      }

      return `{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "${item.title}",
        "description": "${item.description}",
        "datePublished": "${item.date ? new Date(item.date).toISOString() : new Date(item.dateAdded).toISOString()}",
        "dateModified": "${new Date(item.dateAdded).toISOString()}",
        ${authors}
      }`
    }

    return ``
  }

  // console.log('JSON DATA', generateJsonLd())

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: generateJsonLd() }} key="event-jsonld" />
}
