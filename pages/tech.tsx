import { useState } from 'react'
import { type Tech, categories } from '../src/TechData'

export default function TechPage() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        {categories.map((cat) => (
          <section key={cat.title}>
            <h3 className="mt-18">{cat.title}</h3>
            <div className={`logo-grid ${cat.className ?? ''} mt-12`}>
              {cat.items.map((t) => (
                <TechItem key={t.slug} tech={t} />
              ))}
            </div>
            <div className="category-break" />
          </section>
        ))}
      </div>
    </div>
  )
}

function TechItem({ tech }: { tech: Tech }) {
  const [showImage, setShowImage] = useState<boolean>(Boolean(tech.slug))
  const [bubbleBelow, setBubbleBelow] = useState<boolean>(false)

  const logoUrl = tech.slug ? `https://cdn.simpleicons.org/${tech.slug}` : ''
  const info = { url: tech.url ?? '#', desc: tech.desc ?? '' }

  const updateBubblePosition = (el: HTMLElement | null) => {
    if (!el) return
    const rect = el.getBoundingClientRect()
    const threshold = 120
    setBubbleBelow(rect.top < threshold)
  }

  return (
    <a
      className="tech-item"
      href={info.url}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={0}
      aria-label={`${tech.name}: ${info.desc}`}
      onMouseEnter={(e) => updateBubblePosition(e.currentTarget as HTMLElement)}
      onFocus={(e) => updateBubblePosition(e.currentTarget as HTMLElement)}
      onMouseLeave={() => setBubbleBelow(false)}
      onBlur={() => setBubbleBelow(false)}
    >
      <div className="logo">
        {showImage && logoUrl ? (
          <img
            src={logoUrl}
            alt={`${tech.name} logo`}
            onError={() => setShowImage(false)}
          />
        ) : (
          <div className="logo-fallback" aria-hidden={false}>
            {tech.slug}
          </div>
        )}
      </div>
      <div className={`tech-label ${bubbleBelow ? 'bubble-bottom' : ''}`}>
        <div className="bubble-name">{tech.name}</div>
        {info.desc ? <div className="bubble-desc">{info.desc}</div> : null}
      </div>
    </a>
  )
}