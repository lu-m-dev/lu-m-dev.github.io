import React from 'react'
import PANELS from './nav'

export default function Header({ activeIndex }: { activeIndex?: number | null }) {
  return (
    <div className="labels" aria-hidden={false}>
      {PANELS.map((p, i) => {
        const isActive = activeIndex === i
        return (
          <div key={p.label} className={`label ${isActive ? 'active' : ''}`}>
            <h2 style={{ margin: 0 }}>{p.label}</h2>
          </div>
        )
      })}
    </div>
  )
}
