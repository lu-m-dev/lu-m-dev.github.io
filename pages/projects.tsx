import { useEffect, useState, useRef } from 'react'
import { fetchUserRepos, type Repo } from '../src/FetchRepo'

function normalizeHomepage(homepage?: string | null) {
  const hp = homepage && homepage.trim() ? homepage.trim() : null
  if (!hp) return null
  return /^https?:\/\//i.test(hp) ? hp : `https://${hp}`
}

function ProjectCard({ repo }: { repo: Repo }) {
  const homepageUrl = normalizeHomepage(repo.homepage)
  const [hover, setHover] = useState(false)
  const descRef = useRef<HTMLParagraphElement | null>(null)
  const [descHeight, setDescHeight] = useState<number | null>(null)

  useEffect(() => {
    function measure() {
      const cur = descRef.current
      if (!cur) return
      setDescHeight(Math.ceil(cur.getBoundingClientRect().height))
    }
    measure()
    const RO = (window as any).ResizeObserver
    const ro = RO ? new RO(measure) : null
    if (ro && descRef.current) ro.observe(descRef.current)
    window.addEventListener('resize', measure)
    return () => {
      if (ro) ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [repo.description])

  const openRepo = () => window.open(repo.html_url, '_blank', 'noopener')

  const cardBaseStyle: React.CSSProperties = {
    cursor: 'pointer',
    width: '100%',
    maxWidth: 360,
    position: 'relative',
    display: 'block',
  }

  const previewBoxStyle: React.CSSProperties = {
    width: '100%',
    aspectRatio: '16/9',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
    background: '#091020',
  }

  return (
    <div
      className="card"
      style={cardBaseStyle}
      onClick={openRepo}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') openRepo()
      }}
    >
      {repo.previewUrl ? (
        <div style={previewBoxStyle}>
          <img
            src={repo.previewUrl}
            alt={`${repo.name} preview`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      ) : (
        <div
          style={{
            ...previewBoxStyle,
            background: 'linear-gradient(90deg,#112,#334)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-hidden={!repo.previewUrl}
        >
          <div style={{ color: '#9aa4b2', fontSize: '0.95rem', fontWeight: 600 }}>No preview</div>
        </div>
      )}

      <h4 style={{ margin: '6px 0' }}>{repo.name}</h4>

      {repo.has_pages && homepageUrl ? (
        <a
          href={homepageUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          aria-label={`Open deployed site for ${repo.name}`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            float: 'right',
            marginLeft: 12,
            zIndex: 5,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: hover ? '2.5px solid var(--accent)' : '2.5px solid currentColor',
            color: 'inherit',
            padding: '6px 12px',
            font: 'inherit',
            textDecoration: 'none',
            borderRadius: 0,
            outline: 'none',
            boxShadow: 'none',
            height: '40px',
            marginTop: descHeight ? `${Math.max(0, Math.ceil(descHeight - 40))}px` : undefined,
            boxSizing: 'border-box',
          }}
        >
          <span style={{ display: 'inline-block', lineHeight: 1.2, fontWeight: 600, color: hover ? 'var(--accent)' : 'inherit' }}>
            Try Live
          </span>
        </a>
      ) : null}

      <div style={{ display: 'block', overflow: 'hidden' }}>
        <p ref={descRef} style={{ margin: 0 }}>{repo.description ?? 'No description provided.'}</p>
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
    <div style={{ minHeight: '100vh', padding: 36 }}>
      <div className="content-wrap">
        <div style={{ marginTop: 18 }}>
          {loading && <div>Loading repositories from github.com/{username}...</div>}
          {error && <div style={{ color: 'var(--accent, #f66)' }}>Error: {error}</div>}

          {!loading && !error && repos && repos.length === 0 && <div>No public repositories found.</div>}

          <div
            className="cards"
            style={{
              marginTop: 12,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(32px, 2vw, 40px)',
              justifyContent: 'center',
              alignItems: 'start',
            }}
          >
            {repos && repos.map((r) => <ProjectCard key={r.id} repo={r} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
