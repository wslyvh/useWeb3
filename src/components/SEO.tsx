import React from 'react'
import Head from 'next/head'
import { DESCRIPTION, IMAGE_OG, SITE_URL, SOCIAL_HANDLE, TITLE } from 'utils/constants'
import { useRouter } from 'next/dist/client/router'

interface SEOProps {
  title?: string
  description?: string
  imageUrl?: string
}

export function SEO(props: SEOProps) {
  const router = useRouter()
  const title = props.title ? `${props.title} · ${TITLE}` : `${TITLE} · Learn Web3 development`
  const description = props.description || DESCRIPTION
  const image = props.imageUrl || IMAGE_OG
  const url = router.route === '/' ? SITE_URL : SITE_URL.replace(/\/$/, '') + router.asPath.split('?')[0]

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="application-name" content={TITLE} />
      <meta name="description" content={description} key="description" />
      <meta name="image" content={image} key="image" />

      <meta property="og:type" content="website" key="og_type" />
      <meta property="og:site_name" content={TITLE} key="og_site_name" />
      <meta property="og:title" content={title} key="og_title" />
      <meta property="og:description" content={description} key="og_description" />
      <meta property="og:url" content={url} key="og_url" />

      <meta property="og:image" content={image} key="og_image" />
      <meta property="og:image:url" content={image} key="og_image_url" />
      <meta property="og:image:secure_url" content={image} key="og_image_secure_url" />
      <meta property="og:image:alt" content="useWeb3 social image" key="og_image_alt" />
      <meta property="og:image:type" content="image/png" key="og_image_type" />
      <meta property="og:image:width" content="1200" key="og_image_width" />
      <meta property="og:image:height" content="630" key="og_image_height" />

      <meta name="twitter:site" content={SOCIAL_HANDLE} />
      <meta name="twitter:card" content="summary_large_image" key="tw_card" />
      <meta name="twitter:title" content={title} key="tw_title" />
      <meta name="twitter:description" content={description} key="tw_description" />
      <meta name="twitter:image" content={image} key="tw_image" />
    </Head>
  )
}
