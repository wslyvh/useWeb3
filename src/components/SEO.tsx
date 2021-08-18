import React from 'react'
import Head from 'next/head'
import { DESCRIPTION, IMAGE_OG, SITE_URL, TITLE } from 'utils/constants'
import { useRouter } from 'next/dist/client/router'

interface SEOProps {
  title?: string
  description?: string
  imageUrl?: string
}

export function SEO(props: SEOProps) {
  const router = useRouter()
  const title = props.title ? `${props.title} · ${TITLE}` : `${TITLE} · Learn Web3 development`
  const description = props.description ?? DESCRIPTION
  const image_secure = props.imageUrl ?? IMAGE_OG
  const image = image_secure.replace('https://', 'http://')
  const url = SITE_URL.replace(/\/$/, '') + router.asPath.split('?')[0]

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
      <meta name="image" content={image} key="image" />

      <meta property="og:type" content="website" key="og_type" />
      <meta property="og:site_name" content={TITLE} key="og_site_name" />
      <meta property="og:title" content={title} key="og_title" />
      <meta property="og:description" content={description} key="og_description" />
      <meta property="og:url" content={url} key="og_url" />
      <meta property="og:image" content={image} key="og_image" />
      <meta property="og:image:secure_url" content={image_secure} key="og_image_secure_url" />

      <meta name="twitter:card" content="summary_large_image" key="tw_card" />
      <meta name="twitter:title" content={title} key="tw_title" />
      <meta name="twitter:description" content={description} key="tw_description" />
      <meta name="twitter:image" content={image} key="tw_image" />
    </Head>
  )
}
