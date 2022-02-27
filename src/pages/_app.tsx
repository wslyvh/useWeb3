import 'assets/styles/globals.scss'
import 'next-pagination/dist/index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import type { AppProps } from 'next/app'
import { SEO } from 'components/SEO'
import PlausibleProvider from 'next-plausible'
import { DOMAIN } from 'utils/constants'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain={DOMAIN} trackOutboundLinks>
      <SEO />
      <Component {...pageProps} />
    </PlausibleProvider>
  )
}

export default MyApp
