/**
 * Expandable filter panel for category selection.
 */

import { cn } from '../utils'
import type { ProjectCategory } from '../types'

interface FilterPanelProps {
  categories: readonly ProjectCategory[]
  selected: Set<ProjectCategory>
  expanded: boolean
  onToggle: () => void
  onChange: (category: ProjectCategory) => void
}

export default function FilterPanel({ categories, selected, expanded, onToggle, onChange }: FilterPanelProps) {
  return (
    <div className={cn('filter-panel', expanded && 'expanded')}>
      <div className="filter-toggle" onClick={onToggle}>
        <div className="filter-line" />
        <div className="filter-label-text filter-toggle-text filter-toggle-text--top">
          EXPAND FILTERS
          <span className="filter-arrow">▼</span>
        </div>
      </div>
      <div className="filter-body">
        <div className="filter-body-inner">
          <div className="filter-title">Showing categories:</div>
          <div className="filter-chips">
            {categories.map((category) => (
              <button
                key={category}
                className={cn('filter-chip', selected.has(category) && 'active')}
                onClick={() => onChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="filter-toggle filter-toggle--bottom" onClick={onToggle}>
        <div className="filter-line" />
        <div className="filter-label-text">
          COLLAPSE FILTERS
          <span className="filter-arrow">▲</span>
        </div>
      </div>
    </div>
  )
}
