/**
 * Context provider for sharing starfield hover state across components.
 */

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import Starfield from './Starfield'
import type { StarfieldContextValue, HoveredCenter } from '../types'

const StarfieldContext = createContext<StarfieldContextValue>({
  setHoveredCenter: () => {},
  hoveredCenter: null,
})

export const useStarfield = () => useContext(StarfieldContext)

export function StarfieldProvider({ children }: { children: ReactNode }) {
  const [hoveredCenter, setHoveredCenter] = useState<HoveredCenter>(null)
  const handleSetHoveredCenter = useCallback((c: HoveredCenter) => setHoveredCenter(c), [])

  return (
    <StarfieldContext.Provider value={{ setHoveredCenter: handleSetHoveredCenter, hoveredCenter }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <Starfield hoveredCenter={hoveredCenter} />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </StarfieldContext.Provider>
  )
}
