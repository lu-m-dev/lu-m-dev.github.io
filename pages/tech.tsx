/**
 * Technologies page displaying skills organized by category.
 */

import { LuCode, LuBrainCircuit, LuCog, LuAtom, LuFileText, LuLayers } from 'react-icons/lu'
import { TechItem } from '@/components'
import { TECH_CATEGORIES } from '@/data'

const ICON_MAP: Record<string, React.ComponentType> = {
  LuCode, LuBrainCircuit, LuCog, LuAtom, LuFileText, LuLayers,
}

export default function TechPage() {
  return (
    <div className="tech-layout">
      <div className="tech-content">
        <div className="tech-scroll">
          {TECH_CATEGORIES.map((category) => {
            const IconComponent = category.icon ? ICON_MAP[category.icon] : null
            return (
              <section key={category.title}>
                <h3 className="section-title">
                  {IconComponent && <IconComponent />}
                  {category.title}
                </h3>
                <div className="tech-grid">
                  {category.items.map((tech) => (
                    <TechItem key={tech.slug} tech={tech} />
                  ))}
                </div>
                <div className="section-divider" />
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}