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
        <span className="filter-label-text filter-label--expand">
          EXPAND FILTERS
          <span className="filter-arrow">▼</span>
        </span>
        <span className="filter-label-text filter-label--collapse">
          COLLAPSE FILTERS
          <span className="filter-arrow">▲</span>
        </span>
      </div>
      <div className="filter-box">
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
      </div>
    </div>
  )
}
