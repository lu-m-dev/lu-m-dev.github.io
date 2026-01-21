/**
 * Technology item with logo and hover tooltip.
 */

import { useState } from 'react'
import { cn } from '../utils'
import type { Tech } from '../types'

export default function TechItem({ tech }: { tech: Tech }) {
  const [showImage, setShowImage] = useState(Boolean(tech.slug))
  const [tooltipAbove, setTooltipAbove] = useState(false)
  const scale = tech.scale ?? 1.0
  const logoUrl = tech.slug
    ? tech.theme === 'dark'
      ? `https://cdn.simpleicons.org/${tech.slug}/e6eef6`
      : `https://cdn.simpleicons.org/${tech.slug}`
    : ''

  const handleInteraction = (e: React.MouseEvent | React.FocusEvent) => {
    const el = e.currentTarget as HTMLElement
    const rect = el.getBoundingClientRect()
    setTooltipAbove(rect.bottom + 120 > window.innerHeight)
  }

  return (
    <a
      className="tech-item"
      href={tech.url ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={0}
      aria-label={`${tech.name}: ${tech.desc}`}
      onMouseEnter={handleInteraction}
      onFocus={handleInteraction}
    >
      <div className="tech-logo">
        {showImage && logoUrl ? (
          <img
            src={logoUrl}
            alt={`${tech.name} logo`}
            onError={() => setShowImage(false)}
            style={{ width: 56 * scale, height: 56 * scale }}
          />
        ) : (
          <div className={cn('tech-logo-fallback', tech.theme === 'dark' && 'tech-logo-fallback--light')}>
            {tech.slug}
          </div>
        )}
      </div>
      <div className={cn('tech-tooltip', tooltipAbove && 'above')}>
        <div className="tech-tooltip-name">{tech.name}</div>
        {tech.desc && <div className="tech-tooltip-desc">{tech.desc}</div>}
      </div>
    </a>
  )
}
