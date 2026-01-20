/**
 * Navigation header displaying labeled sections.
 */

import { cn } from '../utils'
import { NAV_ITEMS } from '../data'

export default function Header({ activeIndex }: { activeIndex?: number | null }) {
  return (
    <div className="nav-labels">
      {NAV_ITEMS.map((item, index) => (
        <div key={item.label} className={cn('nav-label', activeIndex === index && 'active')}>
          <h2>{item.label}</h2>
        </div>
      ))}
    </div>
  )
}
