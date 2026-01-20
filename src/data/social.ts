/**
 * Social links configuration.
 */

import type { SocialLink } from '../types'

export const SOCIAL_LINKS: SocialLink[] = [
  { icon: 'github', label: 'GitHub', href: 'https://github.com/lu-m-dev', text: 'lu-m-dev', external: true },
  { icon: 'githubactions', reactIcon: 'LuGlobe', label: 'Website', href: '/', text: 'lu-m-dev.github.io', external: false },
  { icon: 'orcid', label: 'ORCID', href: 'https://orcid.org/0009-0005-9408-5248', text: '0009-0005-9408-5248', external: true },
  { icon: 'googlemaps', reactIcon: 'LuMapPin', label: 'Location', href: 'https://maps.google.com/?q=Philadelphia,PA', text: 'Philadelphia, PA, USA', external: true },
]
