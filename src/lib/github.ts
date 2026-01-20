/**
 * GitHub API utilities for fetching repository data.
 */

import type { Repo } from '../types'
import { PROJECT_CONFIG, PROJECT_CONFIG_ORDER, DEFAULT_CATEGORY } from '../data'

export async function fetchUserRepos(username: string, token?: string): Promise<Repo[]> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github.v3+json' }
  if (token) headers['Authorization'] = `token ${token}`

  const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`
  const res = await fetch(url, { headers })

  if (!res.ok) {
    if (res.status === 404) throw new Error(`GitHub user '${username}' not found.`)
    if (res.status === 403) throw new Error('Rate limit or access error from GitHub API.')
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`)
  }

  const data: Repo[] = await res.json()

  const augmented = data.map((repo) => {
    const config = PROJECT_CONFIG[repo.name]
    const branch = repo.default_branch || 'main'
    let previewUrl: string | null = null

    if (config?.preview) {
      const path = config.preview.replace(/^\/+/, '')
      previewUrl = `https://raw.githubusercontent.com/${encodeURIComponent(username)}/${encodeURIComponent(repo.name)}/${encodeURIComponent(branch)}/${path}`
    }

    return { ...repo, previewUrl, category: config?.category ?? DEFAULT_CATEGORY }
  })

  const configured = augmented
    .filter((repo) => repo.name in PROJECT_CONFIG)
    .sort((a, b) => PROJECT_CONFIG_ORDER.indexOf(a.name) - PROJECT_CONFIG_ORDER.indexOf(b.name))

  return [...configured, ...augmented.filter((repo) => !(repo.name in PROJECT_CONFIG))]
}
