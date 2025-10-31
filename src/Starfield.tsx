import { useRef, useEffect } from 'react'

type Center = { x: number; y: number } | null

export default function Starfield({ hoveredCenter }: { hoveredCenter: Center }) {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const hoveredRef = useRef<Center>(hoveredCenter)

  useEffect(() => {
    hoveredRef.current = hoveredCenter
  }, [hoveredCenter])

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    function generateStars(w: number, h: number) {
      const num = Math.floor((w * h) / 9000) + 80
      return Array.from({ length: num }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        seed: Math.random() * Math.PI * 2,
      }))
    }

    let stars = generateStars(width, height)
    let pointer = { x: width / 2, y: height / 2 }

    function onMove(e: MouseEvent) {
      pointer.x = e.clientX
      pointer.y = e.clientY
    }

    window.addEventListener('mousemove', onMove)
    let raf = 0
    let t = 0
    function draw() {
      t += 0.02
      ctx.clearRect(0, 0, width, height)
      const g = ctx.createLinearGradient(0, 0, 0, height)
      g.addColorStop(0, '#02040a')
      g.addColorStop(0.6, '#05051a')
      g.addColorStop(1, '#000010')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, width, height)

      const neb = ctx.createRadialGradient(width * 0.75, height * 0.25, 10, width * 0.75, height * 0.25, width * 0.9)
      neb.addColorStop(0, 'rgba(30,20,60,0.10)')
      neb.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = neb
      ctx.fillRect(0, 0, width, height)

      const hc = hoveredRef.current

      for (const s of stars) {
        s.x += s.vx
        s.y += s.vy
        if (s.x < 0) s.x = width
        if (s.x > width) s.x = 0
        if (s.y < 0) s.y = height
        if (s.y > height) s.y = 0

        const dx = s.x - pointer.x
        const dy = s.y - pointer.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        let alpha = 0.25 + 0.6 * (0.5 + 0.5 * Math.sin(t + s.seed))
        const pointerBoost = Math.max(0, 1 - dist / 160)
        alpha += pointerBoost * 1.4

        if (hc) {
          const ddx = s.x - hc.x
          const ddy = s.y - hc.y
          const d2 = Math.sqrt(ddx * ddx + ddy * ddy)
          const hoverBoost = Math.max(0, 1 - d2 / 240)
          alpha += hoverBoost * 0.9
        }

        alpha = Math.min(1, alpha)

        ctx.beginPath()
        const tint = Math.min(0.5, Math.max(0, pointerBoost))
        const r = Math.floor(255 - tint * 40)
        const g2 = Math.floor(255 - tint * 6)
        ctx.fillStyle = `rgba(${r},${g2},255,${alpha})`
        const sizeBoost = 1 + Math.min(1, (160 - Math.min(dist, 160)) / 120)
        ctx.arc(s.x, s.y, s.r * sizeBoost, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    let resizeTimer: number | null = null
    function onResize() {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        width = canvas.width = window.innerWidth
        height = canvas.height = window.innerHeight
        stars = generateStars(width, height)
        pointer.x = width / 2
        pointer.y = height / 2
        resizeTimer = null
      }, 120)
    }

    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      if (resizeTimer) clearTimeout(resizeTimer)
    }
  }, [])

  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} />
}
