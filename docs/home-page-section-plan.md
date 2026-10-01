# Home Page — Section-by-Section Redesign Plan ("Coastal Luxe")

Status: Proposed, pending implementation
Companion doc: `home-redesign-plan.md` (foundation + navbar + hero — hero is DONE)
Scope: Each home-page section, planned and delivered separately; ends with the footer
Branch: vercel-render
Last updated: 2026-01-10

---

# 1. How To Use This Doc

Each section below is self-contained and independently shippable:
Status -> Current -> Problems -> Target design -> Implementation -> Micro-interactions
-> Acceptance criteria. Work flows top-to-bottom in the page order so the page is
never mid-broken.

# 2. Global Foundations (recap + additions)

## 2.1 Design tokens (already shipped in `globals.css`)

primary `#0E7C86` (teal), accent `#F5A524` (sunset), foreground `#0B1B2B`,
surface `#F5F8FA`, border `#E6EBF0`, deep `#0B1B2B`. Fonts: Sora (display),
Manrope (body), Fraunces (accent). Utilities already available: `shadow-soft`,
`shadow-float`, `glass-light`, `glass-panel`, `gradient-text`, `text-balance`,
`text-pretty`, `animate-fade-up`, `animate-ken-burns`, reduced-motion guard.

## 2.2 New shared pieces introduced by this plan

* `ui/reveal.tsx` — standardizes in-view reveals (`whileInView`), stagger index,
  and honors `prefers-reduced-motion`. Replaces ad-hoc motion wrappers.
* `ui/section.tsx` (optional) — `<Section tone="white|surface|deep">` wrapper
  owning padding + background so spacing/rhythm stay consistent.
* `ui/section-heading.tsx` — add optional `action` slot (right-aligned "View all"
  link) for editorial heading rows.
* `ui/premium-card.tsx` (optional) — shared card chrome (radius, border, shadow,
  hover lift) reused by tours / destinations / why-us / testimonials.

## 2.3 Section rhythm map (avoids a monotonous white scroll)

| # | Section | Component | Background | Layout |
| --- | --- | --- | --- | --- |
| 1 | Hero | `hero-section.tsx` | full-bleed photo | centered + search card |
| 2 | Featured Tours | `featured-tours.tsx` | surface band | 3-col cards |
| 3 | Destinations | `destinations-showcase.tsx` | white | bento mosaic |
| 4 | Why Choose Us | `why-choose-us.tsx` | surface band | split heading + grid |
| 5 | Travel Experience | `travel-experience.tsx` | white | alternating rows |
| 6 | Testimonials | `testimonials.tsx` | surface band | 3-col cards |
| 7 | Custom Tour CTA | `custom-tour-cta.tsx` | deep navy band | split image + copy |
| 8 | WhatsApp CTA | `whatsapp-cta.tsx` | white | slim inline bar |
| 9 | Footer | `footer.tsx` | deep navy | 4 columns |

## 2.4 Cross-cutting rules

* Spacing: sections use `py-20 lg:py-28` (up from `py-16 lg:py-20`).
* Radius: cards `rounded-3xl` / `rounded-[2rem]`; buttons stay pill.
* Imagery: define aspect ratios; `sizes` per grid; `priority` only on hero.
* Motion: one reveal per section + per-item stagger (max 6 items), nothing looping
  except hero ken-burns.
* A11y: visible focus rings on all interactive elements; text contrast AA over
  photos (min `deep/60` scrim); decorative images `alt=""`.
* Data: map `destinationIds` -> names for display; surface `startingPrice`.

# 3. Section 1 — Hero  (DONE)

Status: Shipped (full-bleed photo, minimal, floating search card).
* Keep as-is. Only note: the search card overlaps into Section 2, so Section 2
  must reserve top padding (`pt-28 lg:pt-36`) to clear it.

# 4. Section 2 — Featured Tours

Status: Not started
Files: `home/featured-tours.tsx`, `home/tour-card.tsx`

Current: `py-16 lg:py-20`; left `SectionHeading`; 2-col grid; `TourCard` is a dark
card (`bg-slate-900/95`, `border-white/15`, amber "Explore" button); price block is
commented out; destination ids rendered raw.

Problems: dark cards clash with the new light theme; 2 columns makes oversized
cards; brand colour mismatch (amber button vs teal); raw ids not human-readable;
duplicate hover transforms.

Target design:
* Section on a `bg-surface` band with generous top padding to clear the hero card.
* Heading row: left `SectionHeading` + right "View all tours ->" text link.
* Grid: `grid gap-6 sm:grid-cols-2 lg:grid-cols-3`.
* New light `TourCard`: white, `rounded-3xl`, `border-border`, `shadow-soft`
  -> `shadow-float` + `-translate-y-1` on hover.
  * Image: `aspect-[4/5]` (or `h-64`), `object-cover`, gradient scrim at the
    bottom, duration pill top-left (`7 days`), title bottom-left over image.
  * Body: summary (`line-clamp-2`), meta row with lucide `MapPin` (destinations),
    `Clock` (duration), `Users` (groupSize).
  * Footer: `From $2,399` (from `startingPrice`) + teal pill CTA "View tour".

Implementation:
* `featured-tours.tsx`: accept optional `destinationLabels?: Record<string,
  string>`; compute labels from `destinations` data; pass to card; add heading
  action; wrap grid in `Reveal` with per-card delay.
* `tour-card.tsx`: rewrite to light card; drop commented price block; use
  `Button`/link styles (teal) instead of raw amber; single hover source.
* `page.tsx`: pass a `${id: name}` map built from the already-fetched destinations.

Micro-interactions: card lift + shadow, image `scale-105` on hover, CTA arrow
nudge, staggered reveal.

Acceptance: no dark classes remain; price + readable destinations visible; 3-up on
desktop, 1-up on mobile; heading links to `/tours`.

# 5. Section 3 — Destinations Showcase

Status: Not started
Files: `home/destinations-showcase.tsx`

Current: `lg:grid-cols-3` of equal image tiles, text over a dark gradient, amber
country label; 6 items; some images reused.

Problems: uniform grid feels flat; overlay text contrast weak on light theme;
no link/affordance to explore; a destination reuses the hero image.

Target design:
* Editorial bento mosaic: first tile `lg:col-span-2 lg:row-span-2` (large), others
  normal -> creates hierarchy. Fallback: keep 3-col but vary heights.
* Each tile: `rounded-[2rem]`, `overflow-hidden`, full-strength bottom scrim
  (`from-deep/85`), white title, teal or accent country label, short description
  clamped, and a hover "Explore ->" affordance; whole tile links to
  `/tours?destination={name}`.
* Optional "View all destinations" link.

Implementation: restructure grid with conditional span classes by index; wrap tiles
in `Reveal`; add `Link` wrapper + `sizes` tuning; consider a new portrait image for
Sigiriya so it doesn't reuse the hero photo.

Micro-interactions: image zoom, affordance fade-in, ring highlight on focus.

Acceptance: desktop shows a clear hero tile; every tile links through; text legible
over imagery; mobile stacks cleanly.

# 6. Section 4 — Why Choose Us

Status: Not started
Files: `home/why-choose-us.tsx`

Current: six `glass-panel` (dark frosted) cards on white bg, amber icon chips.

Problems: dark glass is wrong on a light page; 6 equal cards read as a wall; icons
in amber conflict with brand.

Target design (two options — pick one):
* Option A (default) — Split editorial: left column = `SectionHeading` + short
  supporting paragraph + CTA; right column = `2-col` grid of 6 white cards with
  teal icon chips (`bg-primary/10 text-primary`), hover lift + chip fill.
* Option B — Stats band: 4 key metrics (years, travellers served, rating, 24/7)
  plus a compact 3-card benefit row above.

Implementation: replace `glass-panel` with white card + hairline + `shadow-soft`;
swap amber for teal; if Option A, restructure to a 2-column section layout.

Micro-interactions: hover lift, icon chip colour shift, staggered reveal.

Acceptance: no frosted-dark classes; iconography legible; rhythm differs from the
section above.

# 7. Section 5 — Travel Experience

Status: Not started
Files: `home/travel-experience.tsx`

Current: two alternating rows; dark panels (`bg-slate-950/80`), nested
`bg-slate-900/80` mini-cards, amber eyebrow; images in dark frames.

Problems: dark on white; nested dark cards add visual noise; two mini-cards
("Tailored access" / "Seamless luxury") dilute the message.

Target design:
* Light rows: text column = teal eyebrow + `font-display` title + body + a clean
  lucide-check list (replacing the two mini-cards).
* Image column: `rounded-[2rem]`, `shadow-soft`, subtle offset/overlap for an
  editorial feel; keep the alternating (reverse) layout.
* Optional small stat badge floating on the image (e.g., "Private guide").

Implementation: swap dark classes for light tokens; replace mini-cards with a
check-list; keep alternating grid; reveal per row.

Micro-interactions: image fade-in + slight scale, list items fade in sequence.

Acceptance: rows read as premium editorial; no dark shadows-on-dark; works
stacked on mobile.

# 8. Section 6 — Testimonials (currently disabled)

Status: Not started (commented out in `page.tsx`)
Files: `home/testimonials.tsx`, `home/testimonial-card.tsx`, `page.tsx`,
`services/testimonial.service.ts`, `data/testimonials.ts`

Current: commented out; components still use dark `glass-panel` + amber initials.

Problems: dark styling; disabled so social proof is missing.

Target design:
* Re-enable on a `bg-surface` band.
* 3 white cards: amber 5-star row (`rating`), quote in larger `font-accent` italic,
  avatar (use `avatar` when present, else teal initials) + name/location/role.
* Optional aggregate line ("4.9/5 from 200+ travellers").

Implementation: reskin card to light; uncomment `Testimonials` + its service import
in `page.tsx`; render from `getTestimonials()` (data already exists).

Micro-interactions: staggered reveal, subtle card lift on hover.

Acceptance: section renders with real data; no dark classes; empty-state guarded
if no testimonials.

# 9. Section 7 — Custom Tour CTA

Status: Not started
Files: `home/custom-tour-cta.tsx`

Current: dark gradient rounded panel, amber uppercase CTA button; sits directly
above the WhatsApp band (two dark panels stacked).

Problems: dark-on-white; amber button off-brand; competing with the WhatsApp band
right below it; not enough visual weight for the main conversion.

Target design:
* Full-bleed **deep navy** (`bg-deep`) conversion band with an optional faint image
  overlay, white heading, one teal primary CTA ("Build your custom tour") and one
  ghost/secondary CTA ("Explore tours").
* Split layout: copy + 3 quick value bullets left, image or decorative panel right.
* Differentiate from Section 8 by making this the bold, image-backed band.

Implementation: restructure to a banded section (image or gradient inside `deep`),
teal primary CTA, light text, value bullets.

Micro-interactions: content fade-up, CTA hover, image parallax-lite (transform only,
reduced-motion safe).

Acceptance: strong single focal CTA; clear contrast with the next slim band;
internal + hero CTA styling consistent.

# 10. Section 8 — WhatsApp CTA

Status: Not started
Files: `home/whatsapp-cta.tsx`, `services/whatsapp.service.ts`

Current: dark rounded panel with an amber "Chat on WhatsApp" button; `mb-16 px-6`.

Problems: dark-on-white; amber button; heavy next to the navy CTA band above it.

Target design:
* Slim **light** inline bar (`bg-surface` or white with hairline) inside `Container`
  so it aligns with the rest of the grid (drop the ad-hoc `px-6`).
* Copy left ("Questions? Chat with a local expert"), CTA right using the WhatsApp
  brand green or teal, with a small "online" dot + "Typically replies in minutes".
* Keep the functional `getWhatsAppInquiryLink(message)` call.

Implementation: convert to `Section`/`Container` alignment; restyle button;
add status dot + microcopy; keep `target="_blank" rel="noreferrer"`.

Micro-interactions: gentle pulse on the status dot; button hover.

Acceptance: visually lighter than Section 7; link still opens WhatsApp with the
prefilled message; aligned to the page grid.

# 11. Section 9 — Footer

Status: Not started
Files: `layout/footer.tsx`

Current: `bg-slate-950/95`, 3 columns (brand / quick links / contact), amber
eyebrow, single legal line.

Problems: dark styling to re-evaluate; thin content; no socials or secondary nav;
no back-to-top; off-brand accents.

Target design (recommended: premium navy footer for a strong close):
* `bg-deep text-deep-foreground` with a top hairline, generous `py-16 lg:py-20`.
* Four columns:
  1. Brand: logo mark + wordmark, short description, social icon links (lucide).
  2. Explore: Home, Tours, Custom Tour, Transfers.
  3. Company/Support: About, Contact, plus placeholders (Privacy, Terms).
  4. Contact: email, phone, location — with `Mail`/`Phone`/`MapPin` icons, plus a
     WhatsApp link.
* Optional newsletter / "Plan your trip" mini-CTA row above the columns.
* Bottom bar: `© {year} IslandSea Travels` + legal links, and a back-to-top button.

Implementation: restructure to 4 columns; swap amber for accent only as a subtle
highlight; add icon rows and socials; add back-to-top button; keep `Container`.

Micro-interactions: link hover underline/colour, back-to-top smooth scroll
(reduced-motion safe).

Acceptance: matches the deep-navy CTA band palette; legible link contrast; layout
collapses to 1-2 columns on mobile; year is dynamic.

# 12. Shared Primitives To Add

* `ui/reveal.tsx` — `<Reveal delay>` + `stagger` helpers.
* `ui/section.tsx` (optional) — tone-based section wrapper.
* `ui/section-heading.tsx` — add `action` slot.
* `ui/premium-card.tsx` (optional) — shared card chrome.

# 13. Implementation Order (each step independently shippable)

1. Shared primitives (`Reveal`, optional `Section`, heading `action`).
2. Featured Tours (clears the hero overlap + biggest visual win).
3. Destinations Showcase.
4. Why Choose Us.
5. Travel Experience.
6. Testimonials (re-enable).
7. Custom Tour CTA.
8. WhatsApp CTA.
9. Footer.
10. Full-page pass: rhythm, spacing, contrast, reduced-motion, lint + build.

# 14. Verification

* Per section: `npm run lint` + `npm run build`; Playwright screenshots at
  desktop (1440x900) and mobile (iPhone 13).
* Page-level: confirm alternating bands read correctly; no remaining
  `slate-9xx` / `amber-3xx` / `white/1x` dark classes in home components
  (`grep`); keyboard focus visible; reduced-motion produces no animation.

# 15. Risks / Open Questions

* Section 4: Option A (split benefits) vs Option B (stats band) — needs a pick.
* Section 6: re-enabling testimonials changes page length and the section rhythm.
* Section 7 vs 8: both are conversion bands; keeping two stacked must stay
  visually distinct (navy vs slim light).
* Footer: dark navy vs light — recommendation is navy for contrast closure.
* Destination/tour images: a few are reused; consider adding more distinct photos.




