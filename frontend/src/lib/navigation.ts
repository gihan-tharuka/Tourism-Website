/**
 * Central navigation config and link resolution.
 *
 * While the UI/UX redesign is only complete on the home page, the site can be
 * published in "homepage-only preview" mode. In that mode every internal link
 * resolves to an anchor on `/` so a client clicking around never lands on a
 * page that is still on the old design.
 *
 * Toggle with the `NEXT_PUBLIC_HOMEPAGE_ONLY` env var:
 *   true  -> links circulate within the home page (client preview)
 *   false -> normal routing, exactly as before (default)
 *
 * Note: `NEXT_PUBLIC_*` values are inlined at build time, so changing this on
 * production requires a redeploy — not just an env edit.
 */

export function isHomepageOnly(): boolean {
  return process.env.NEXT_PUBLIC_HOMEPAGE_ONLY === 'true'
}

/** Anchor ids rendered on the home page (see `app/page.tsx`). */
export const HOME_ANCHORS = {
  tours: 'tours',
  destinations: 'destinations',
  whyUs: 'why-us',
  experience: 'experience',
  plan: 'plan',
  contact: 'contact',
} as const

/**
 * Maps an internal route to the closest equivalent home section.
 * Query strings are ignored — `/tours?destination=Kandy` and `/tours` both
 * belong to the tours block.
 */
const PREVIEW_HREF_MAP: Record<string, string> = {
  '/': '/',
  '/tours': `/#${HOME_ANCHORS.tours}`,
  '/custom-tour': `/#${HOME_ANCHORS.plan}`,
  '/transfers': `/#${HOME_ANCHORS.experience}`,
  '/about': `/#${HOME_ANCHORS.whyUs}`,
  '/contact': `/#${HOME_ANCHORS.contact}`,
}

export interface NavLink {
  label: string
  href: string
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Tours', href: '/tours' },
  { label: 'Custom Tour', href: '/custom-tour' },
  { label: 'Transfers', href: '/transfers' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const FOOTER_EXPLORE_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Tours', href: '/tours' },
  { label: 'Custom Tour', href: '/custom-tour' },
  { label: 'Transfers', href: '/transfers' },
]

export const FOOTER_COMPANY_LINKS: NavLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

/** Internal path prefixes mapped to a home section, matched before `PREVIEW_HREF_MAP`. */
const PREVIEW_HREF_PREFIXES: Array<[prefix: string, target: string]> = [
  ['/tours/', `/#${HOME_ANCHORS.tours}`], // tour detail pages are not redesigned yet
]

/** True for links that must never be rewritten (WhatsApp, mailto:, tel:, http). */
function isExternal(href: string): boolean {
  return /^(https?:|mailto:|tel:|#)/i.test(href)
}

/**
 * Resolves a link target for the current mode.
 *
 * External links always pass through. Internal links collapse to a home-page
 * anchor while preview mode is on, and are returned untouched when it is off.
 * Unknown internal routes fall back to `/` rather than escaping the home page.
 */
export function resolveHref(href: string): string {
  if (!isHomepageOnly() || isExternal(href)) {
    return href
  }

  const [pathname] = href.split('?')

  // A destination tile deep-links into tours filtering, but the destinations
  // section is the closer equivalent on the home page.
  if (pathname === '/tours' && href.includes('destination=')) {
    return `/#${HOME_ANCHORS.destinations}`
  }

  const prefixMatch = PREVIEW_HREF_PREFIXES.find(([prefix]) => pathname.startsWith(prefix))
  if (prefixMatch) {
    return prefixMatch[1]
  }

  return PREVIEW_HREF_MAP[pathname] ?? '/'
}
