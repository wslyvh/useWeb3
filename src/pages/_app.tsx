import 'assets/styles/globals.scss'
import 'next-pagination/dist/index.css'
import type { AppProps } from 'next/app'
import { SEO } from 'components/SEO'
import PlausibleProvider from 'next-plausible'
import { DOMAIN } from 'utils/constants'
import  moment from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

moment.extend(relativeTime)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain={DOMAIN} trackOutboundLinks>
      <SEO />
      <Component {...pageProps} />
    </PlausibleProvider>
  )
}

export default MyApp
