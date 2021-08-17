import 'assets/styles/globals.scss'
import type { AppProps } from 'next/app'
import { SEO } from 'components/SEO'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SEO />
      <Component {...pageProps} />
    </>
  )
}
export default MyApp
