/**
 * Main application wrapper.
 */

import '../styles/index.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { StarfieldProvider } from '@/components'

const DetectionArea = dynamic(() => import('@/components/DetectionArea'), { ssr: false })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StarfieldProvider>
      <DetectionArea>
        <Component {...pageProps} />
      </DetectionArea>
    </StarfieldProvider>
  )
}
