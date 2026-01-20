/**
 * Masonry grid layout with animated item transitions.
 */

import { useEffect, useRef, useState, Children, isValidElement, useMemo, type ReactNode } from 'react'
import { cn } from '../utils'

interface ItemState {
  key: string
  child: ReactNode
  exiting: boolean
  entering: 'initial' | 'animate' | false
}

const ANIMATION_DURATION = 300
const REPOSITION_DELAY = 50

export default function MasonryGrid({
  children,
  minGap = 40,
  maxGap = 64,
  minColumnWidth = 300,
}: {
  children: ReactNode
  minGap?: number
  maxGap?: number
  minColumnWidth?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [positioned, setPositioned] = useState(false)
  const [items, setItems] = useState<ItemState[]>([])
  const exitTimeoutRef = useRef<Map<string, NodeJS.Timeout>>(new Map())
  const enterTimeoutRef = useRef<Map<string, NodeJS.Timeout>>(new Map())
  const prevKeysRef = useRef<Set<string>>(new Set())

  const currentKeys = useMemo(() => {
    const keys = new Set<string>()
    Children.forEach(children, (child) => {
      if (isValidElement(child) && child.key != null) keys.add(String(child.key))
    })
    return keys
  }, [children])

  useEffect(() => {
    const prevKeys = prevKeysRef.current

    setItems((prevItems) => {
      const newItems: ItemState[] = []
      const hasExistingVisible = prevItems.some((item) => !item.exiting && currentKeys.has(item.key))
      const enterDelay = hasExistingVisible ? ANIMATION_DURATION : REPOSITION_DELAY

      Children.forEach(children, (child) => {
        if (isValidElement(child) && child.key != null) {
          const key = String(child.key)
          const isNew = !prevKeys.has(key)
          newItems.push({ key, child, exiting: false, entering: isNew ? 'initial' : false })

          const exitTimeout = exitTimeoutRef.current.get(key)
          if (exitTimeout) {
            clearTimeout(exitTimeout)
            exitTimeoutRef.current.delete(key)
          }

          if (isNew) {
            const enterTimeout = enterTimeoutRef.current.get(key)
            if (enterTimeout) clearTimeout(enterTimeout)

            const timeout = setTimeout(() => {
              setItems((curr) => curr.map((i) => (i.key === key ? { ...i, entering: 'animate' } : i)))
              const animateTimeout = setTimeout(() => {
                setItems((curr) => curr.map((i) => (i.key === key ? { ...i, entering: false } : i)))
                enterTimeoutRef.current.delete(key)
              }, ANIMATION_DURATION)
              enterTimeoutRef.current.set(key, animateTimeout)
            }, enterDelay)
            enterTimeoutRef.current.set(key, timeout)
          }
        }
      })

      prevItems.forEach((item) => {
        if (!currentKeys.has(item.key) && !item.exiting) {
          newItems.push({ ...item, exiting: true })
          const timeout = setTimeout(() => {
            setItems((curr) => curr.filter((i) => i.key !== item.key))
            exitTimeoutRef.current.delete(item.key)
          }, ANIMATION_DURATION)
          exitTimeoutRef.current.set(item.key, timeout)
        } else if (item.exiting && !currentKeys.has(item.key)) {
          newItems.push(item)
        }
      })

      return newItems
    })

    prevKeysRef.current = new Set(currentKeys)
  }, [children, currentKeys])

  useEffect(() => {
    return () => {
      exitTimeoutRef.current.forEach((timeout) => clearTimeout(timeout))
      enterTimeoutRef.current.forEach((timeout) => clearTimeout(timeout))
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const positionItems = () => {
      const allItems = container.querySelectorAll<HTMLElement>('.masonry-item')
      const visibleItems = container.querySelectorAll<HTMLElement>('.masonry-item:not(.exiting)')

      if (visibleItems.length === 0) {
        allItems.forEach((item) => {
          if (item.classList.contains('exiting')) {
            item.style.opacity = '0'
            item.style.transform = item.style.transform.replace(/scale\([^)]+\)/, '') + ' scale(0.8)'
          }
        })
        container.style.height = '0px'
        return
      }

      const containerWidth = container.offsetWidth
      const columns = Math.max(1, Math.floor((containerWidth + minGap) / (minColumnWidth + minGap)))
      const totalMinGap = minGap * (columns - 1)
      const availableForColumns = containerWidth - totalMinGap
      const colWidth = availableForColumns / columns
      const extraSpace = containerWidth - (colWidth * columns + minGap * (columns - 1))
      const gap = columns > 1 ? minGap + extraSpace / (columns - 1) : minGap
      const clampedGap = Math.min(gap, maxGap)

      const colHeights = new Array(columns).fill(0)
      const positions = new Map<HTMLElement, { x: number; y: number }>()

      visibleItems.forEach((item) => {
        const shortestCol = colHeights.indexOf(Math.min(...colHeights))
        const x = shortestCol * (colWidth + clampedGap)
        const y = colHeights[shortestCol]
        positions.set(item, { x, y })
        colHeights[shortestCol] += item.offsetHeight + clampedGap
      })

      allItems.forEach((item) => {
        item.style.position = 'absolute'
        item.style.width = `${colWidth}px`

        if (item.classList.contains('exiting')) {
          item.style.opacity = '0'
          const currentTransform = item.style.transform || ''
          const baseTransform = currentTransform.replace(/scale\([^)]+\)/, '').trim()
          item.style.transform = baseTransform + ' scale(0.8)'
        } else if (item.classList.contains('entering-initial')) {
          const pos = positions.get(item)
          if (pos) {
            item.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(0.8)`
            item.style.opacity = '0'
          }
        } else if (item.classList.contains('entering-animate')) {
          const pos = positions.get(item)
          if (pos) {
            item.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(1)`
            item.style.opacity = '1'
          }
        } else {
          const pos = positions.get(item)
          if (pos) {
            item.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(1)`
            item.style.opacity = '1'
          }
        }
      })

      container.style.height = `${Math.max(...colHeights) - clampedGap}px`
      setPositioned(true)
    }

    const timeoutId = setTimeout(positionItems, REPOSITION_DELAY)
    const resizeObserver = new ResizeObserver(() => requestAnimationFrame(positionItems))
    resizeObserver.observe(container)

    return () => {
      clearTimeout(timeoutId)
      resizeObserver.disconnect()
    }
  }, [items, minGap, maxGap, minColumnWidth])

  return (
    <div ref={containerRef} className="masonry-grid" style={{ opacity: positioned ? 1 : 0 }}>
      {items.map((item) => (
        <div
          key={item.key}
          className={cn(
            'masonry-item',
            item.exiting && 'exiting',
            item.entering === 'initial' && 'entering-initial',
            item.entering === 'animate' && 'entering-animate'
          )}
        >
          {item.child}
        </div>
      ))}
    </div>
  )
}
