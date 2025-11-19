export type Repo = {
  id: number
  name: string
  description: string | null
  html_url: string
  fork: boolean
  default_branch?: string
  previewUrl?: string | null
  has_pages?: boolean
  homepage?: string | null
}

async function fetchJsonOrThrow(url: string, init?: RequestInit) {
  const res = await fetch(url, init)
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    const msg = `HTTP ${res.status} ${res.statusText} when fetching ${url}`
    throw new Error(text ? `${msg}: ${text}` : msg)
  }
  return res
}

export async function fetchUserRepos(username: string, token?: string): Promise<Repo[]> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github.v3+json' }
  if (token) headers['Authorization'] = `token ${token}`

  const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`
  const res = await fetch(url, { headers })
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(`GitHub user '${username}' not found (requested URL: ${url}).`)
    }
    if (res.status === 403) {
      const text = await res.text().catch(() => '')
      throw new Error('Rate limit or access error from GitHub API. ' + text)
    }
    throw new Error(`GitHub API error: ${res.status} ${res.statusText} (requested URL: ${url})`)
  }

  const data: Repo[] = await res.json()

  const augmented = await Promise.all(
    data.map(async (r) => {
      const branch = (r as any).default_branch || 'main'
      const tryPaths = ['project-preview.json', 'project-preview.txt']
      let previewUrl: string | null = null

      for (const p of tryPaths) {
        try {
          const rawUrl = `https://raw.githubusercontent.com/${encodeURIComponent(username)}/${encodeURIComponent(
            r.name
          )}/${encodeURIComponent(branch)}/${p}`
          const pr = await fetch(rawUrl)
          if (!pr.ok) continue
          const text = await pr.text()
          if (p.endsWith('.json')) {
            try {
              const parsed = JSON.parse(text)
              if (parsed && parsed.preview && typeof parsed.preview === 'string') {
                previewUrl = `https://raw.githubusercontent.com/${encodeURIComponent(
                  username
                )}/${encodeURIComponent(r.name)}/${encodeURIComponent(branch)}/${parsed.preview.replace(/^\\+/, '')}`
                break
              }
            } catch (e) {
              /* ignore json parse errors */
            }
          } else {
            const path = text.trim()
            if (path) {
              previewUrl = `https://raw.githubusercontent.com/${encodeURIComponent(
                username
              )}/${encodeURIComponent(r.name)}/${encodeURIComponent(branch)}/${path.replace(/^\\+/, '')}`
              break
            }
          }
        } catch (e) {
          /* ignore per-repo preview fetch errors */
        }
      }

      return { ...r, default_branch: branch, previewUrl }
    })
  )

  const withPreview = augmented.filter((x) => x.previewUrl)
  const withoutPreview = augmented.filter((x) => !x.previewUrl)
  return [...withPreview, ...withoutPreview]
}
