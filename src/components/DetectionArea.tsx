/**
 * Detection area for mouse interaction and navigation routing.
 */

import { useState, useEffect, type MouseEvent, type ReactNode } from 'react'
import { useRouter } from 'next/router'
import { cn } from '../utils'
import { useStarfield } from './StarfieldProvider'
import { NAV_ITEMS } from '../data'
import Header from './Header'

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

function updateIntroGradient(clientX: number, clientY: number) {
  const intro = document.querySelector('.intro') as HTMLElement | null
  if (!intro) return
  const rect = intro.getBoundingClientRect()
  const relX = clamp(clientX - rect.left, 0, rect.width)
  const relY = clamp(clientY - rect.top, 0, rect.height)
  const mx = rect.width ? (relX / rect.width) * 100 : 50
  const my = rect.height ? (relY / rect.height) * 100 : 12
  intro.style.setProperty('--mx', `${mx}%`)
  intro.style.setProperty('--my', `${my}%`)
}

export default function DetectionArea({ children }: { children: ReactNode }) {
  const router = useRouter()
  const starfield = useStarfield()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const isHomePage = typeof window !== 'undefined' ? router.pathname === '/' : false

  useEffect(() => {
    if (!isHomePage) return
    const handleGlobalMouseMove = (e: globalThis.MouseEvent) => updateIntroGradient(e.clientX, e.clientY)
    window.addEventListener('mousemove', handleGlobalMouseMove)
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove)
  }, [isHomePage])

  const handleBannerMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const panelWidth = window.innerWidth / NAV_ITEMS.length
    const index = clamp(Math.floor(e.clientX / panelWidth), 0, NAV_ITEMS.length - 1)
    setHoveredIndex(index)
    const centerX = index * panelWidth + panelWidth / 2
    const bannerHeight = Math.min(120, window.innerHeight * 0.1)
    starfield?.setHoveredCenter?.({ x: centerX, y: bannerHeight / 2 })
  }

  const handleBannerMouseLeave = () => {
    setHoveredIndex(null)
    starfield?.setHoveredCenter?.(null)
  }

  const handleBannerClick = (e: MouseEvent<HTMLDivElement>) => {
    const panelWidth = window.innerWidth / NAV_ITEMS.length
    const index = clamp(Math.floor(e.clientX / panelWidth), 0, NAV_ITEMS.length - 1)
    router.push(NAV_ITEMS[index].route)
  }

  const routeIndex = NAV_ITEMS.findIndex((item) => item.route === router.pathname)
  const activeIndex = hoveredIndex ?? (routeIndex >= 0 ? routeIndex : null)

  return (
    <>
      <div className="fixed-header">
        <div
          className="top-banner"
          onMouseMove={handleBannerMouseMove}
          onMouseLeave={handleBannerMouseLeave}
          onClick={handleBannerClick}
        >
          <Header activeIndex={activeIndex} />
        </div>
      </div>
      <div className={cn('main-content', isHomePage && 'no-scroll')}>
        <div className="page-content">{children}</div>
      </div>
    </>
  )
}
