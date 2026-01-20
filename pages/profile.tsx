/**
 * Profile page displaying personal info and links.
 */

import { LuGlobe, LuMapPin } from 'react-icons/lu'
import portrait from '../assets/portrait.png'
import { SOCIAL_LINKS } from '@/data'

const ICON_MAP: Record<string, React.ComponentType> = { LuGlobe, LuMapPin }

export default function Profile() {
  return (
    <div className="profile-page">
      <div className="profile-layout">
        <aside className="profile-sidebar" aria-label="Profile sidebar">
          <img className="portrait" src={portrait.src} alt="Portrait" />
          <div className="social-list">
            {SOCIAL_LINKS.map((link) => {
              const IconComponent = link.reactIcon ? ICON_MAP[link.reactIcon] : null
              return (
                <div key={link.label} className="social-item">
                  {IconComponent ? (
                    <IconComponent />
                  ) : (
                    <img src={`https://cdn.simpleicons.org/${link.icon}/ffffff`} alt={link.label} className="icon" />
                  )}
                  {link.href ? (
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : '_self'}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                    >
                      {link.text}
                    </a>
                  ) : (
                    <span>{link.text}</span>
                  )}
                </div>
              )
            })}
          </div>
        </aside>
        <main className="profile-main">
          <section className="card card--spaced">
            <p>I study bioengineering and scientific computing at the University of Pennsylvania.</p>
            <p>My research is on developing deep learning models for healthcare data.</p>
            <p>I have worked as a data scientist, focusing on machine learning and data analysis for engineering applications.</p>
          </section>
        </main>
      </div>
    </div>
  )
}
