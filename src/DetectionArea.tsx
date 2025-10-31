import React, { useState, type MouseEvent } from 'react'
import { useRouter } from 'next/router'
import { useStarfield } from './StarfieldProvider'
import PANELS from './nav'
import Header from './Header'

export default function DetectionArea({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const starCtx = useStarfield()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const fullHeight = typeof window !== 'undefined' ? router.pathname === '/' : false

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const w = window.innerWidth
    const panelW = w / PANELS.length
    let idx = Math.floor(e.clientX / panelW)
    if (idx < 0) idx = 0
    if (idx >= PANELS.length) idx = PANELS.length - 1

    setHoveredIndex(idx)
    const centerX = idx * panelW + panelW / 2
    const el = e.currentTarget as HTMLElement | null
    const isTopBanner = !!(el && el.classList && el.classList.contains('top-banner'))
    const smallBannerH = Math.min(120, window.innerHeight * 0.1)
    const centerY = fullHeight ? (isTopBanner ? smallBannerH / 2 : window.innerHeight / 2) : smallBannerH / 2
    starCtx?.setHoveredCenter?.({ x: centerX, y: centerY })

    try {
      const el = document.querySelector('.intro') as HTMLElement | null
      if (el) {
        const rect = el.getBoundingClientRect?.() || { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight }
        const relX = e.clientX - rect.left
        const relY = e.clientY - rect.top
        const px = Math.max(0, Math.min(rect.width || window.innerWidth, relX))
        const py = Math.max(0, Math.min(rect.height || window.innerHeight, relY))
        const mx = rect.width ? (px / rect.width) * 100 : 50
        const my = rect.height ? (py / rect.height) * 100 : 12
        el.style.setProperty('--mx', `${mx}%`)
        el.style.setProperty('--my', `${my}%`)
      }
    } catch (err) {}
  }

  function handleLeave() {
    setHoveredIndex(null)
    starCtx?.setHoveredCenter?.(null)
  }

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    const w = window.innerWidth
    const panelW = w / PANELS.length
    let idx = Math.floor(e.clientX / panelW)
    if (idx < 0) idx = 0
    if (idx >= PANELS.length) idx = PANELS.length - 1
    router.push(PANELS[idx].route)
  }

  const routeIndex = PANELS.findIndex((p) => p.route === router.pathname)
  const activeIndex = hoveredIndex ?? (routeIndex >= 0 ? routeIndex : null)
  const bannerH = Math.min(120, (typeof window !== 'undefined' ? window.innerHeight : 800) * 0.1)

  const topBanner = (
    <div className="top-banner" style={{ height: bannerH, width: '100%', position: 'relative', zIndex: 2 }} onMouseMove={handleMove} onMouseLeave={handleLeave} onClick={handleClick}>
      <Header activeIndex={activeIndex} />
    </div>
  )

  if (fullHeight) {
    const lowerH = typeof window !== 'undefined' ? window.innerHeight - bannerH : `calc(100vh - ${bannerH}px)`
    return (
      <div className="no-scroll" style={{ height: '100vh', width: '100%', position: 'relative', zIndex: 2 }}>
        {topBanner}
        <div className="lower-detection" style={{ height: lowerH, width: '100%', position: 'relative', zIndex: 1 }} onMouseMove={handleMove} onMouseLeave={handleLeave} onClick={handleClick}>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>{children}</div>
        </div>
      </div>
    )
  }

  return (
    <>
      {topBanner}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </>
  )
}
