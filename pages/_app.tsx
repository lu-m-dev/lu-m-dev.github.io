import '../styles/base.css'
import '../styles/layout.css'
import '../styles/components.css'
import '../styles/tech.css'
import '../styles/profile.css'
import type { AppProps } from 'next/app'
import StarfieldProvider from '../src/StarfieldProvider'
import dynamic from 'next/dynamic'

const DetectionArea = dynamic(() => import('../src/DetectionArea'), { ssr: false })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StarfieldProvider>
      <DetectionArea>
        <Component {...pageProps} />
      </DetectionArea>
    </StarfieldProvider>
  )
}
