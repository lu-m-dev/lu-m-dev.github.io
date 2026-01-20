/**
 * Shared type definitions.
 */

export interface Repo {
  id: number
  name: string
  description: string | null
  html_url: string
  fork: boolean
  default_branch?: string
  previewUrl?: string | null
  category?: string | null
  has_pages?: boolean
  homepage?: string | null
  topics?: string[]
}

export interface Tech {
  name: string
  slug: string
  url: string
  desc: string
  theme?: 'original' | 'dark'
  scale?: number
}

export interface TechCategory {
  title: string
  icon?: string
  items: Tech[]
}

export interface NavItem {
  label: string
  route: string
}

export interface SocialLink {
  icon: string
  reactIcon?: string
  label: string
  href: string | null
  text: string
  external: boolean
}

export interface StarfieldContextValue {
  setHoveredCenter: (center: HoveredCenter) => void
  hoveredCenter: HoveredCenter
}

export type HoveredCenter = { x: number; y: number } | null

export type ProjectCategory = 'Graphics' | 'Research' | 'Teaching'

export interface ProjectConfig {
  preview?: string
  category?: ProjectCategory
}
