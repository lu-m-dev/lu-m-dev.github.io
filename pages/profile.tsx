export default function About() {
  return (
    <div className="profile-page">
      <div className="profile-layout">
        <aside className="profile-left" aria-label="Profile sidebar">
          <div
            className="portrait"
            style={{ backgroundImage: `url('https://via.placeholder.com/640x640?text=Portrait')` }}
            role="img"
            aria-label="Portrait placeholder"
          />

          <div className="info-list" aria-hidden={false}>
            <div className="info-item">
              <img
                src="https://cdn.simpleicons.org/github/ffffff"
                alt="GitHub"
                className="icon-img"
              />
              <a href="https://github.com/lu-m-dev" target="_blank" rel="noopener noreferrer">github.com/lu-m-dev</a>
            </div>

            <div className="info-item">
              <img
                src="https://cdn.simpleicons.org/githubactions/ffffff"
                alt="GitHub Actions"
                className="icon-img"
              />
              <a href="/" target="_self">lu-m-dev.github.io</a>
            </div>

            <div className="info-item">
              <img
                src="https://cdn.simpleicons.org/orcid/ffffff"
                alt="ORCID"
                className="icon-img"
              />
              <a href="https://orcid.org/0009-0005-9408-5248" target="_blank" rel="noopener noreferrer">orcid.org/0009-0005-9408-5248</a>
            </div>

            <div className="info-item">
              <img
                src="https://cdn.simpleicons.org/googlemaps/ffffff"
                alt="Google Maps"
                className="icon-img"
              />
              <span>Philadelphia, PA</span>
            </div>
          </div>
        </aside>

        <main className="profile-right">
          <section className="card" style={{ marginTop: 18 }}>
            <p>
              I study bioengineering and scientific computing at the University of Pennsylvania.
            </p>
            <p>
              My research is on developing deep learning models for healthcare data.
            </p>
            <p>
              I have worked as a data scientist, focusing on machine learning and data analysis for engineering applications.
            </p>
          </section>
        </main>
      </div>
    </div>
  )
}
