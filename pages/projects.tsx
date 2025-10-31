import { useEffect, useState } from 'react'

type Repo = {
  id: number
  name: string
  description: string | null
  html_url: string
  fork: boolean
  default_branch?: string
  previewUrl?: string | null
}

function ProjectCard({ repo }: { repo: Repo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: 'block', color: 'inherit', textDecoration: 'none' }}
      aria-label={`Open ${repo.name} on GitHub`}
    >
      <div className="card" style={{ cursor: 'pointer' }}>
        {repo.previewUrl ? (
          <img
            src={repo.previewUrl}
            alt={`${repo.name} preview`}
            style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 6, marginBottom: 12 }}
          />
        ) : (
          <div
            style={{
              height: 180,
              background: 'linear-gradient(90deg,#112,#334)',
              borderRadius: 6,
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-hidden={repo.previewUrl ? 'false' : 'true'}
          >
            <div style={{ color: '#9aa4b2', fontSize: '0.95rem', fontWeight: 600 }}>No preview</div>
          </div>
        )}

        <h4 style={{ margin: '6px 0' }}>{repo.name}</h4>
        <p style={{ margin: 0 }}>{repo.description ?? 'No description provided.'}</p>
      </div>
    </a>
  )
}

export default function Projects() {
  const [repos, setRepos] = useState<Repo[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'lu-m-dev'

  useEffect(() => {
    let cancelled = false

    async function fetchRepos() {
      setLoading(true)
      setError(null)
      try {
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN
        const headers: Record<string, string> = { Accept: 'application/vnd.github.v3+json' }
        if (token) headers['Authorization'] = `token ${token}`

        const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`
        const res = await fetch(url, { headers })
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error(`GitHub user '${username}' not found (requested URL: ${url}).`)
          }
          if (res.status === 403) {
            const text = await res.text()
            throw new Error('Rate limit or access error from GitHub API. ' + text)
          }
          throw new Error(`GitHub API error: ${res.status} ${res.statusText} (requested URL: ${url})`)
        }
        const data: Repo[] = await res.json()
        if (!cancelled) {
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
                    } catch (e) {}
                  } else {
                    const path = text.trim()
                    if (path) {
                      previewUrl = `https://raw.githubusercontent.com/${encodeURIComponent(
                        username
                      )}/${encodeURIComponent(r.name)}/${encodeURIComponent(branch)}/${path.replace(/^\\+/, '')}`
                      break
                    }
                  }
                } catch (e) {}
              }
              return { ...r, default_branch: branch, previewUrl }
            })
          )
          setRepos(augmented)
        }
      } catch (err: any) {
        if (!cancelled) setError(err.message ?? String(err))
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchRepos()
    const interval = setInterval(fetchRepos, 1000 * 60 * 5)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [username])

  return (
    <div style={{ minHeight: '100vh', padding: 36 }}>
      <div className="content-wrap">
        <div style={{ marginTop: 18 }}>
          <p style={{ marginBottom: 8 }}>
            <a
              href={`https://github.com/${encodeURIComponent(username)}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'underline' }}
              aria-label={`Open ${username}'s GitHub repositories`}
            >
              <strong>lu-m-dev</strong> Public Repositories.
            </a>
            <i>(Note: Confidential research projects are now shown.)</i>
          </p>

          {loading && <div>Loading repositories…</div>}
          {error && <div style={{ color: 'var(--accent, #f66)' }}>Error: {error}</div>}

          {!loading && !error && repos && repos.length === 0 && <div>No public repositories found.</div>}

          <div className="cards" style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16 }}>
            {repos && repos.map((r) => <ProjectCard key={r.id} repo={r} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
