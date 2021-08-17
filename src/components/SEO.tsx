import React from 'react'
import Head from 'next/head'
import { DESCRIPTION, IMAGE_OG, TITLE } from 'utils/constants'

interface SEOProps {
  title?: string
  description?: string
  imageUrl?: string
}

export function SEO(props: SEOProps) {
  const title = props.title ? `${props.title} · ${TITLE}` : TITLE
  const description = props.description || DESCRIPTION
  const image = props.imageUrl || IMAGE_OG

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
      <meta name="image" content={image} key="image" />

      <meta property="og:title" content={title} key="og_title" />
      <meta property="og:description" content={description} key="og_description" />
      <meta property="og:image" content={image} key="og_image" />

      <meta name="twitter:card" content="summary_large_image" key="tw_card" />
      <meta name="twitter:title" content={title} key="tw_title" />
      <meta name="twitter:description" content={description} key="tw_description" />
      <meta name="twitter:image" content={image} key="tw_image" />
    </Head>
  )
}
