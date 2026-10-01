# IslandSea Travels — Home Page Redesign Plan ("Coastal Luxe")

Status: Approved direction, pending implementation
Scope: Home page first (nav bar + hero first), light/white theme
Branch: vercel-render
Last updated: 2026-01-10

---

# 1. Overview

Convert the currently dark-themed site into a modern, premium, white/light tourism
experience. The whole site will eventually be redesigned; this plan delivers the
foundation plus the global chrome (navbar/footer) and the home page.

* Focus first: global navbar + home hero
* Theme: light/white canvas with a coastal teal + sunset accent identity
* Follow-up: reskin remaining home sections, then secondary pages

# 2. Goals

* White, modern, photography-forward look comparable to leading tourism sites
* Premium UX: transparent-over-hero nav, sticky glass nav on scroll, hero trip planner
* Consistent, token-driven design system so future pages are fast to build
* Preserve existing content, services, data, routing, and SEO

# 3. Non-Goals (this phase)

* No backend/API changes
* No new booking/payment flows
* No redesign of About / Tours / Contact / Custom Tour / Transfers pages yet
* No content rewrites (structure and copy stay, styling changes)

# 4. Design System

## 4.1 Color tokens (`src/app/globals.css`)

| Token | Value | Role |
| --- | --- | --- |
| --background | #FFFFFF | page canvas |
| --surface | #F5F8FA | alternating section bands |
| --foreground | #0B1B2B | ink (deep ocean navy) |
| --muted | #55657A | supporting copy |
| --primary | #0E7C86 | teal CTA / links / focus ring |
| --primary-foreground | #FFFFFF | text on primary |
| --accent | #F5A524 | sunset highlights, ratings |
| --border / --input | #E6EBF0 | hairlines |
| --deep | #0B1B2B | footer / dark CTA band |
| --ring | #0E7C86 | focus ring |

shadcn primitives already read these vars (`bg-card`, `bg-primary`, `border-input`,
`text-muted-foreground`), so token changes auto-restyle every shadcn component.

## 4.2 Typography

* Display / headings: Sora -> `--font-display`
* Body / UI: Manrope -> `--font-sans`
* Optional accent (eyebrow/hero flourish): Fraunces
* Loaded via `next/font/google` in `src/app/layout.tsx` (validated against the
  Next 16 font manifest)

## 4.3 Utilities / motion

* fade-up reveal, subtle ken-burns, gradient-text, `.glass-light`, soft layered
  shadows, `text-balance`, custom focus ring
* All motion wrapped in `prefers-reduced-motion` guards

# 5. Layout Decisions

* Navbar: transparent over the hero photo at the top (white text), transitions to a
  solid white bar with hairline border + soft shadow on scroll (ink text); height
  condenses `h-20` -> `h-16`; route-aware so non-home pages stay solid.
* Hero: FULL-BLEED PHOTO (not split) — cinematic background image, dark scrim /
  gradient, headline + CTAs over it, floating trip-planner search card overlapping
  the bottom edge, trust strip below.

# 6. Implementation Phases

## Phase 1 — Foundation (global)

1. `src/app/globals.css` — light tokens; keep `@theme inline`; white body; remove
   dark radial gradients; lighten `.glass-panel`; add utilities/keyframes.
2. `src/app/layout.tsx` — Sora + Manrope fonts; light html/body classes.
3. `src/components/layout/site-layout.tsx` — white background; remove dark blobs;
   adjust top spacing for the new nav height.
4. Shared primitives: `ui/button.tsx`, `ui/section-heading.tsx` -> light styling.

## Phase 2 — Navbar (global)

* `src/components/layout/navbar.tsx` — scroll-aware transparent -> solid; active
  route highlight; animated underline hover; logo mark + two-tone wordmark;
  WhatsApp link + teal "Plan Your Trip" CTA; redesigned a11y mobile drawer.
* Optional new: `layout/nav-mobile-menu.tsx`, `layout/nav-destinations-menu.tsx`.

## Phase 3 — Hero (home, full-bleed photo, minimal)

* `src/components/home/hero-section.tsx` — full-bleed image + single soft scrim,
  centered short headline ("Discover Sri Lanka, differently") + one primary CTA,
  staggered reveal. Ultra-minimal: no eyebrow, subcopy, secondary CTA, scroll cue
  or trust strip.
* `home/hero-search-bar.tsx` — Destination · Experience · Travellers · Search
  floating card (kept as-is), overlapping the hero's bottom edge -> deep-links to `/tours`.

## Phase 4 — Remaining home sections -> light

* `home/featured-tours.tsx`, `home/tour-card.tsx`, `home/destinations-showcase.tsx`,
  `home/why-choose-us.tsx`, `home/travel-experience.tsx`, `home/custom-tour-cta.tsx`,
  `home/whatsapp-cta.tsx` — swap dark classes for light tokens/utilities; keep
  content and structure.

## Phase 5 — Footer (global)

* `src/components/layout/footer.tsx` — navy `--deep` band with light text.

## Phase 6 — Verification

* `cd frontend && npm run lint && npm run build`
* `npm run dev` and check desktop + mobile: transparent -> scrolled nav, hero fold,
  drawer open/close + Escape, focus rings, reduced-motion, and that secondary
  routes don't hard-break.

# 7. Migration Strategy & Risks

* ~80 files use hard-coded dark classes. Recommended: flip global tokens + chrome to
  light now; reskin secondary pages in follow-ups. Secondary pages will look mixed
  during migration unless scoped differently.
* Alternatives: (B) scope light theme to home only; (C) minimally reskin all page
  heroes now for a fully cohesive look.
* Risks: global nav/footer are visible everywhere; contrast over photos; font metric
  changes; un-migrated pages inheriting the light background.

# 8. Out of Scope / Future

* Full light reskin of About, Tours, Contact, Custom Tour, Transfers, and detail pages
* Re-enable Testimonials section on home
* Optional hero background video, mega menu enrichment, animation polish

# 9. Affected Files Summary

Edit: `globals.css`, `layout.tsx`, `site-layout.tsx`, `navbar.tsx`, `footer.tsx`,
`ui/button.tsx`, `ui/section-heading.tsx`, `home/{hero-section, featured-tours,
tour-card, destinations-showcase, why-choose-us, travel-experience, custom-tour-cta,
whatsapp-cta}.tsx`

New (optional): `layout/nav-mobile-menu.tsx`, `layout/nav-destinations-menu.tsx`,
`home/hero-search-bar.tsx`
