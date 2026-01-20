/**
 * Projects page displaying GitHub repositories with category filtering.
 */

import { useEffect, useState, useCallback } from 'react'
import { fetchUserRepos } from '@/lib/github'
import { MasonryGrid, ProjectCard, FilterPanel } from '@/components'
import { PROJECT_CATEGORIES } from '@/data'
import type { Repo, ProjectCategory } from '@/types'

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'lu-m-dev'
const REFRESH_INTERVAL = 5 * 60 * 1000
const STORAGE_KEY_EXPANDED = 'projects-filter-expanded'
const STORAGE_KEY_CATEGORIES = 'projects-filter-categories'

function useLocalStorage<T>(key: string, fallback: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return fallback
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : fallback
    } catch {
      return fallback
    }
  })

  const setAndPersist = useCallback(
    (newValue: T) => {
      setValue(newValue)
      localStorage.setItem(key, JSON.stringify(newValue))
    },
    [key]
  )

  return [value, setAndPersist]
}

export default function Projects() {
  const [repos, setRepos] = useState<Repo[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filterExpanded, setFilterExpanded] = useLocalStorage(STORAGE_KEY_EXPANDED, false)
  const [savedCategories, setSavedCategories] = useLocalStorage<string[]>(STORAGE_KEY_CATEGORIES, [...PROJECT_CATEGORIES])

  const selectedCategories = new Set(
    savedCategories.filter((c): c is ProjectCategory => PROJECT_CATEGORIES.includes(c as ProjectCategory))
  )

  useEffect(() => {
    let cancelled = false

    const loadRepos = async () => {
      setLoading(true)
      setError(null)
      try {
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN
        const data = await fetchUserRepos(GITHUB_USERNAME, token)
        if (!cancelled) setRepos(data)
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err))
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadRepos()
    const intervalId = setInterval(loadRepos, REFRESH_INTERVAL)
    return () => {
      cancelled = true
      clearInterval(intervalId)
    }
  }, [])

  const toggleCategory = (category: ProjectCategory) => {
    const next = new Set(selectedCategories)
    next.has(category) ? next.delete(category) : next.add(category)
    setSavedCategories([...next])
  }

  const filteredRepos = repos?.filter((repo) => {
    if (selectedCategories.size === 0) return false
    if (selectedCategories.size === PROJECT_CATEGORIES.length) return true
    return repo.category && selectedCategories.has(repo.category as ProjectCategory)
  })

  return (
    <div className="projects-layout">
      <div className="projects-header">
        <FilterPanel
          categories={PROJECT_CATEGORIES}
          selected={selectedCategories}
          expanded={filterExpanded}
          onToggle={() => setFilterExpanded(!filterExpanded)}
          onChange={toggleCategory}
        />
      </div>
      <div className="projects-content">
        <div className="projects-scroll">
          {loading && (
            <div className="projects-message">Loading repositories from github.com/{GITHUB_USERNAME}...</div>
          )}
          {error && <div className="projects-message error">Error: {error}</div>}
          {!loading && !error && filteredRepos?.length === 0 && (
            <div className="projects-message">
              No repositories found{selectedCategories.size > 0 ? ' for selected categories' : ''}.
            </div>
          )}
          <MasonryGrid minGap={36} maxGap={64} minColumnWidth={300}>
            {filteredRepos?.map((repo) => <ProjectCard key={repo.id} repo={repo} />)}
          </MasonryGrid>
        </div>
      </div>
    </div>
  )
}
