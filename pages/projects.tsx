import { useEffect, useState, useRef } from 'react'
import { fetchUserRepos, type Repo } from '../src/FetchRepo'

function normalizeHomepage(homepage?: string | null) {
  const hp = homepage && homepage.trim() ? homepage.trim() : null
  if (!hp) return null
  return /^https?:\/\//i.test(hp) ? hp : `https://${hp}`
}

function ProjectCard({ repo }: { repo: Repo }) {
  const homepageUrl = normalizeHomepage(repo.homepage)

  const openRepo = () => window.open(repo.html_url, '_blank', 'noopener')

  return (
    <div
      className="card project-card"
      onClick={openRepo}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') openRepo()
      }}
    >
      {repo.previewUrl ? (
        <div className="preview-box">
          <img src={repo.previewUrl} alt={`${repo.name} preview`} />
        </div>
      ) : (
        <div className="preview-box preview-fallback" aria-hidden={!repo.previewUrl}>
          <div className="preview-fallback">No preview</div>
        </div>
      )}

      <h4>{repo.name}</h4>

      <div className="project-card-body">
        <div className="project-card-left">
          <p>{repo.description ?? 'No description provided.'}</p>
          {repo.topics && repo.topics.length > 0 ? (
            <div className="topic-wrap">
              {repo.topics.map((t) => (
                <span key={t} className="tag-chip">
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {repo.has_pages && homepageUrl ? (
          <a
            href={homepageUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Open deployed site for ${repo.name}`}
            className="try-live"
          >
            <span className="label">Try Live</span>
          </a>
        ) : null}
      </div>
    </div>
  )
}

export default function Projects() {
  const [repos, setRepos] = useState<Repo[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'lu-m-dev'
  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN
        const data = await fetchUserRepos(username, token)
        if (!cancelled) setRepos(data)
      } catch (err: any) {
        if (!cancelled) setError(err.message ?? String(err))
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    const interval = setInterval(load, 1000 * 60 * 5)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [username])

  return (
    <div className="page-container">
      <div className="content-wrap">
        <div className="mt-18">
          {loading && <div>Loading repositories from github.com/{username}...</div>}
          {error && <div className="error">Error: {error}</div>}

          {!loading && !error && repos && repos.length === 0 && <div>No public repositories found.</div>}

          <div className="cards">
            {repos && repos.map((r) => <ProjectCard key={r.id} repo={r} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
