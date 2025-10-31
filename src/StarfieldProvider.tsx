import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import Starfield from './Starfield'

type HoveredRegion = { x: number; y: number } | null

const noop = () => {}
const StarfieldContext = createContext<{
  setHoveredCenter: (c: HoveredRegion) => void
  hoveredCenter: HoveredRegion
}>({ setHoveredCenter: noop, hoveredCenter: null })

export const useStarfield = () => useContext(StarfieldContext)

export default function StarfieldProvider({ children }: { children: ReactNode }) {
  const [hoveredCenter, setHoveredCenter] = useState<HoveredRegion>(null)
  const setHoveredCenterCb = useCallback((c: HoveredRegion) => setHoveredCenter(c), [])
  return (
    <StarfieldContext.Provider value={{ setHoveredCenter: setHoveredCenterCb, hoveredCenter }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <Starfield hoveredCenter={hoveredCenter} />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </StarfieldContext.Provider>
  )
}
