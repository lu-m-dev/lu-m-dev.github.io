/**
 * Card component displaying a GitHub repository.
 */

import type { Repo } from '../types'

const normalizeUrl = (url?: string | null): string | null => {
  const trimmed = url?.trim()
  if (!trimmed) return null
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

function PreviewImage({ name, previewUrl }: { name: string; previewUrl?: string | null }) {
  if (previewUrl) {
    return (
      <div className="preview-box">
        <img src={previewUrl} alt={`${name} preview`} />
      </div>
    )
  }
  return (
    <div className="preview-box preview-fallback">
      <div className="preview-fallback">No preview</div>
    </div>
  )
}

export default function ProjectCard({ repo }: { repo: Repo }) {
  const homepageUrl = normalizeUrl(repo.homepage)
  const openRepo = () => window.open(repo.html_url, '_blank', 'noopener')
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') openRepo()
  }

  return (
    <div className="card project-card" onClick={openRepo} role="link" tabIndex={0} onKeyDown={handleKeyDown}>
      <PreviewImage name={repo.name} previewUrl={repo.previewUrl} />
      <h4>{repo.name}</h4>
      <div className="project-card-body">
        {repo.has_pages && homepageUrl && (
          <a
            href={homepageUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Open deployed site for ${repo.name}`}
            className="try-live"
          >
            Try Live
          </a>
        )}
        <p>{repo.description ?? 'No description provided.'}</p>
        {repo.topics && repo.topics.length > 0 && (
          <div className="topic-wrap">
            {repo.topics.map((topic) => (
              <span key={topic} className="tag-chip">{topic}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
