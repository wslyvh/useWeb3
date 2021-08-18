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
  const image = props.imageUrl ?? IMAGE_OG
  const url = SITE_URL.replace(/\/$/, '') + router.asPath.split('?')[0]

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
      <meta name="image" content={image} key="image" />

      <meta name="og:type" content="website" key="og_type" />
      <meta name="og:site_name" content={TITLE} key="og_site_name" />
      <meta name="og:title" content={title} key="og_title" />
      <meta name="og:description" content={description} key="og_description" />
      <meta name="og:url" content={url} key="og_url" />
      <meta name="og:image" content={image.replace('https://', 'http://')} key="og_image" />
      <meta name="og:image:secure_url" content={image} key="og_image_secure_url" />

      <meta name="twitter:card" content="summary_large_image" key="tw_card" />
      <meta name="twitter:title" content={title} key="tw_title" />
      <meta name="twitter:description" content={description} key="tw_description" />
      <meta name="twitter:image" content={image} key="tw_image" />
    </Head>
  )
}
