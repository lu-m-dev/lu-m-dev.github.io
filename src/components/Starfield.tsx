/**
 * Animated canvas starfield background.
 */

import { useRef, useEffect } from 'react'
import type { HoveredCenter } from '../types'

interface Star {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  seed: number
}

export default function Starfield({ hoveredCenter }: { hoveredCenter: HoveredCenter }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const hoveredRef = useRef<HoveredCenter>(hoveredCenter)

  useEffect(() => {
    hoveredRef.current = hoveredCenter
  }, [hoveredCenter])

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    let stars = createStars(width, height)
    let pointer = { x: width / 2, y: height / 2 }
    let animationId = 0
    let time = 0
    let resizeTimer: number | null = null

    const handleMouseMove = (e: MouseEvent) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
    }

    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        width = canvas.width = window.innerWidth
        height = canvas.height = window.innerHeight
        stars = createStars(width, height)
        pointer = { x: width / 2, y: height / 2 }
        resizeTimer = null
      }, 120)
    }

    const draw = () => {
      time += 0.02
      ctx.clearRect(0, 0, width, height)
      drawBackground(ctx, width, height)
      drawStars(ctx, stars, pointer, hoveredRef.current, time, width, height)
      animationId = requestAnimationFrame(draw)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)
    animationId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (resizeTimer) clearTimeout(resizeTimer)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

function createStars(w: number, h: number): Star[] {
  const count = Math.floor((w * h) / 9000) + 80
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.4 + 0.3,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    seed: Math.random() * Math.PI * 2,
  }))
}

function drawBackground(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = ctx.createLinearGradient(0, 0, 0, height)
  gradient.addColorStop(0, '#02040a')
  gradient.addColorStop(0.6, '#05051a')
  gradient.addColorStop(1, '#000010')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  const nebula = ctx.createRadialGradient(width * 0.75, height * 0.25, 10, width * 0.75, height * 0.25, width * 0.9)
  nebula.addColorStop(0, 'rgba(30,20,60,0.10)')
  nebula.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = nebula
  ctx.fillRect(0, 0, width, height)
}

function drawStars(
  ctx: CanvasRenderingContext2D,
  stars: Star[],
  pointer: { x: number; y: number },
  hovered: HoveredCenter,
  time: number,
  width: number,
  height: number
) {
  for (const star of stars) {
    star.x += star.vx
    star.y += star.vy
    if (star.x < 0) star.x = width
    if (star.x > width) star.x = 0
    if (star.y < 0) star.y = height
    if (star.y > height) star.y = 0

    const dx = star.x - pointer.x
    const dy = star.y - pointer.y
    const dist = Math.sqrt(dx * dx + dy * dy)

    let alpha = 0.25 + 0.6 * (0.5 + 0.5 * Math.sin(time + star.seed))
    const pointerBoost = Math.max(0, 1 - dist / 160)
    alpha += pointerBoost * 1.4

    if (hovered) {
      const hoverDist = Math.sqrt((star.x - hovered.x) ** 2 + (star.y - hovered.y) ** 2)
      alpha += Math.max(0, 1 - hoverDist / 240) * 0.9
    }

    alpha = Math.min(1, alpha)
    const tint = Math.min(0.5, Math.max(0, pointerBoost))
    const r = Math.floor(255 - tint * 40)
    const g = Math.floor(255 - tint * 6)
    const sizeBoost = 1 + Math.min(1, (160 - Math.min(dist, 160)) / 120)

    ctx.beginPath()
    ctx.fillStyle = `rgba(${r},${g},255,${alpha})`
    ctx.arc(star.x, star.y, star.r * sizeBoost, 0, Math.PI * 2)
    ctx.fill()
  }
}
