# Homepage-Only Preview Mode Plan

Status: Proposed, pending implementation
Companion docs: `home-redesign-plan.md`, `home-page-section-plan.md`, `home-page-followup-plan.md`
Scope: Keep the client inside `/` on the redesigned home page while the rest of the UI/UX redesign is still in progress. Docs only for now — no code in this step.
Branch: ui-ux-v1
Last updated: 2026-02-10

---

# 1. Purpose

The "Coastal Luxe" redesign has been completed for the home page only. Tours,
Custom Tour, Transfers, About and Contact are still on the old design, and
publishing them as-is would undercut the reveal.

For the client preview we need the site to behave like a single-page app: every
link in the navbar, footer and home sections circulates **within** the home page
and never lands on an unredesigned page.

This must be **temporary and reversible**. When the redesign finishes, the normal
routing must come back exactly as it is today with no code archaeology.

# 2. Resolved Decisions

| # | Question | Decision |
| --- | --- | --- |
| 1 | How is the mode enabled? | A single env flag: `NEXT_PUBLIC_HOMEPAGE_ONLY=true` |
| 2 | Where does the flag live? | `frontend/.env.local` locally + the hosting dashboard env var in production |
| 3 | How is the flip turned off? | Set the flag to `false`. No code changes, no re-merge |
| 4 | What do links point at? | Home page anchors (`/tours` → `/#tours`), mapped per link |
| 5 | Which links stay live? | WhatsApp, `mailto:`, `tel:` — these are real conversion paths |
| 6 | What about `/admin`? | Untouched and fully functional; never gated |
| 7 | SEO during preview? | `sitemap.xml` reduced to `/`; `robots.txt` disallows everything except `/` |
| 8 | "Coming soon" nav hints? | Out of scope for this pass (optional follow-up) |
| 9 | Old page files? | Left in place. Not deleted, not renamed |

# 3. Change Summary

# 4. Current-State Findings (evidence)

* **Stack:** Next.js **16.2.6** App Router, React 19.2.4, Tailwind 4, TypeScript 5.
  Env var convention already in use: `NEXT_PUBLIC_WHATSAPP_NUMBER`,
  `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_API_URL` (`frontend/src/lib/constants.ts`).
* **Outbound internal links, complete inventory:**

  | File | Links out |
  | --- | --- |
  | `components/layout/navbar.tsx` | `/tours`, `/custom-tour`, `/transfers`, `/about`, `/contact` — desktop nav (L13–18), mobile drawer (same array), "Plan Your Trip" CTA (L135, L227) |
  | `components/layout/footer.tsx` | `exploreLinks` = `/`, `/tours`, `/custom-tour`, `/transfers` (L7–12); `companyLinks` = `/about`, `/contact` (L14–17) |
  | `components/home/hero-section.tsx` | `/tours` (L39) |
  | `components/home/hero-search-bar.tsx` | `router.push('/tours?…')` (L42) — **programmatic, invisible to a grep for `href`** |
  | `components/home/featured-tours.tsx` | `/tours` (L33) |
  | `components/home/destinations-showcase.tsx` | `/tours` (L32) and tile link `/tours?destination={name}` (L117) |
  | `components/home/tour-card.tsx` | tour detail link |
  | `components/home/custom-tour-cta.tsx` | `/custom-tour` (L63) |
  | `components/home/why-choose-us.tsx` | `/custom-tour` (L46) |

* **Old pages still exist and are reachable by direct URL:**
  `app/tours/page.tsx`, `app/tours/[slug]/page.tsx`, `app/custom-tour/page.tsx`,
  `app/transfers/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx`.
* **Navbar active state is pathname-based** (L91, L199):
  `pathname === link.href || pathname.startsWith(link.href + '/')`.
  In preview mode every link resolves to `/`, so this logic can never mark more
  than one item active — the highlight must move to a hash-based check.
  `key={link.href}` must keep the **original** path so React keys stay unique.
* **Home sections currently have no anchor ids.** `app/page.tsx` renders
  `HeroSection`, `FeaturedTours`, `DestinationsShowcase`, `WhyChooseUs`,
  `TravelExperience`, `CustomTourCTA` with no `id`. Pages that do use anchors
  follow `id="…" className="scroll-mt-24"` (`app/custom-tour/page.tsx:28`,
  `app/transfers/page.tsx:21`) — reuse that convention.
* **SEO currently advertises the old pages:** `app/sitemap.ts` lists all six
  static routes plus every tour slug; `app/robots.ts` allows everything except
  `/api/`. During a client preview this invites indexing of pages that will be
  replaced shortly.
* **Layout:** `components/layout/site-layout.tsx` renders `SiteHeader` +
  `SiteFooter` around every route, so navbar/footer are global.
* **No `vercel.json` / `netlify.toml`** in the repo (a `vercel-render` branch
  exists), so a hosting env var is sufficient as the toggle.

# 5. Anchor Map

Each old route maps to the closest equivalent home section, so a click still
lands somewhere meaningful and the preview feels intentional rather than dead.

| Old href | Resolves to | Target section |
| --- | --- | --- |
| `/` | `/` | Hero |
| `/tours` | `/#tours` | `FeaturedTours` |
| `/tours?destination=X` | `/#destinations` | `DestinationsShowcase` |
| `/custom-tour` | `/#plan` | `CustomTourCTA` |
| `/transfers` | `/#experience` | `TravelExperience` |
| `/about` | `/#why-us` | `WhyChooseUs` |
| `/contact` | `/#contact` | Footer contact block |

# 6. Per-Task Detail

## Task 1 — `lib/navigation.ts`

* **Files:** new `frontend/src/lib/navigation.ts`.
* **Content:** the flag reader `isHomepageOnly()` (reads
  `process.env.NEXT_PUBLIC_HOMEPAGE_ONLY === 'true'`), the canonical
  `NAV_LINKS` / `FOOTER_EXPLORE_LINKS` / `FOOTER_COMPANY_LINKS` arrays moved out of
  `navbar.tsx` / `footer.tsx`, and `resolveHref(href): string` which returns
  `href` untouched when the flag is off and the mapped `/#anchor` when on.
* **Notes:** `NEXT_PUBLIC_*` vars are inlined at build time, so this is safe in
  both server and client components — no `server-only` import. Query strings must
  be stripped before mapping (`/tours?destination=…` → `/#destinations`).
  External links (`http`, `mailto:`, `tel:`) must always pass through unchanged.
* **Verify:** `resolveHref('/tours')` returns `/#tours` with the flag on and
  `/tours` with it off.

## Task 2 — `SiteLink` component

* **Files:** new `frontend/src/components/ui/site-link.tsx`.
* **Change:** a thin wrapper over `next/link` that passes `href={resolveHref(href)}`
  and forwards all other props (`className`, `onClick`, `aria-*`, `scroll`).
* **Notes:** Keep it deliberately dumb — no context, no state — so it remains
  usable from a server component. `components/ui/` already holds `container.tsx`
  and `back-to-top.tsx`, so it fits the existing layout conventions.
* **Verify:** `<SiteLink href="/tours">` renders an anchor to `/#tours`.

## Task 3 — Home section anchor ids

* **Files:** `frontend/src/app/page.tsx`, plus `components/layout/footer.tsx` for `#contact`.
* **Change:** wrap each section in an element carrying `id="…"` and
  `className="scroll-mt-24"`, matching the convention in
  `app/custom-tour/page.tsx`. Ids: `#tours`, `#destinations`, `#why-us`,
  `#experience`, `#plan`, `#contact`.
* **Notes:** `scroll-mt-24` is required because the navbar is `sticky top-0` and
  would otherwise cover the section heading on anchor navigation.
* **Verify:** Visiting `/#tours` scrolls to the featured tours block with the
  heading visible below the navbar.

## Task 4 — Navbar

* **Files:** `components/layout/navbar.tsx`.
* **Change:** import `NAV_LINKS` and `SiteLink`; swap the desktop nav (L93) and
  mobile drawer (L207) to `SiteLink`; swap the two "Plan Your Trip" links
  (L134, L226).
* **Active state:** when `isHomepageOnly()` is true, derive `active` from
  `window.location.hash` via a `hashchange` listener (safe here — the component
  is already `'use client'`). Flag off → existing pathname logic unchanged.
* **Notes:** The mobile drawer must still close on click
  (`onClick={() => setOpen(false)}`) — easy to drop when swapping to a wrapper.
* **Verify:** Every nav item lands on `/` at the right section; drawer closes on
  tap; at most one item shows the active underline at a time.

## Task 5 — Footer

* **Files:** `components/layout/footer.tsx`.
* **Change:** import `FOOTER_EXPLORE_LINKS` / `FOOTER_COMPANY_LINKS` from
  `lib/navigation` and swap both `<Link>` maps to `SiteLink`. Add `id="contact"`
  to the contact column.
* **Notes:** Leave the `mailto:`, `tel:` and WhatsApp `<a>` elements alone — they
  are plain anchors, not `next/link`, and must keep working.
* **Verify:** No footer link navigates off `/`.

## Task 6 — Home section CTAs

* **Files:** `home/hero-section.tsx` (L38), `home/featured-tours.tsx` (L32),
  `home/destinations-showcase.tsx` (L31 and L117), `home/tour-card.tsx`,
  `home/custom-tour-cta.tsx` (L62), `home/why-choose-us.tsx` (L45).
* **Change:** replace `next/link` with `SiteLink` for these CTAs. Tour cards must
  resolve to `/#tours` in preview mode rather than `/tours/[slug]`, since the
  detail pages are unredesigned.
* **Notes:** `TourCard` is shared with the tours pages — keep the resolution logic
  inside `SiteLink`, not in the card, so default behaviour is preserved.
* **Verify:** No CTA on the home page navigates off `/`.

## Task 7 — Hero search bar

* **Files:** `components/home/hero-search-bar.tsx`.
* **Current:** `onSubmit` builds `URLSearchParams` and calls
  `router.push('/tours?…')` (L42).
* **Change:** when `isHomepageOnly()`, keep the selects and the submit, but
  instead of routing, smooth-scroll to `#tours` (optionally surfacing a short
  inline "results coming soon" note). Flag off → unchanged behaviour.
* **Notes:** This is the one outbound link a grep for `href="/` will not catch.
  Do not skip it.
* **Verify:** Submitting the form never changes the path.

## Task 8 — Sitemap and robots

* **Files:** `app/sitemap.ts`, `app/robots.ts`.
* **Change:** when `isHomepageOnly()`, return only the `/` entry from the sitemap
  (skipping the `getTours()` call entirely) and emit `disallow: ['/']` with
  `allow: '/'` in robots. Flag off → current output unchanged.
* **Notes:** Prevents unredesigned pages being indexed while the client browses.
  Reverts automatically with the flag.
* **Verify:** `/sitemap.xml` lists one URL; `/robots.txt` disallows the site.

## Task 9 — Flag and documentation

* **Files:** `frontend/.env.local`, `CLAUDE.md` / `AGENTS.md`.
* **Change:** add `NEXT_PUBLIC_HOMEPAGE_ONLY=true` with a comment; document the
  flag, the anchor map and the "set to false to restore routing" instruction so
  this survives the coming weeks of redesign work.
* **Notes:** Set the same variable in the production hosting dashboard.
* **Verify:** Toggling the flag to `false` restores full routing with no code change.

# 7. Implementation Order

1. `lib/navigation.ts` (Task 1) and `ui/site-link.tsx` (Task 2).
2. Section anchors (Task 3) — needed before any link is tested.
3. Navbar (Task 4), footer (Task 5), home CTAs (Task 6) — one mechanical pass.
4. Hero search bar (Task 7).
5. Sitemap/robots (Task 8).
6. Flag + docs (Task 9).
7. Global verification pass.

# 8. Global Verification

* `cd frontend && npm run lint` — clean.
* `npx tsc --noEmit` — clean.
* `npm run build` — passes.
* Playwright, desktop 1440×900 + iPhone 13:
  * Click every navbar item, both CTAs, every footer link, every home CTA and a
    tour card — `window.location.pathname` stays `/` throughout.
  * Submit the hero search form — no navigation.
  * Active underline tracks the hash; mobile drawer closes on tap.
  * WhatsApp / mail / tel links still work.
  * `/admin/login` still reachable and unaffected.
  * No horizontal overflow on mobile.
* Re-run with `NEXT_PUBLIC_HOMEPAGE_ONLY=false` to confirm full routing returns.

# 9. Out of Scope / Risks

* Old page folders are **not** deleted. Typing `/tours` directly still reaches the
  old page; only in-site navigation is contained. If the client must not reach
  them at all, that needs a separate `next.config.ts` redirect decision.
* No "Coming soon" badges in this pass — revisit after the client reacts.
* The flag is build-time (`NEXT_PUBLIC_*` inlining), so changing it on production
  requires a **redeploy**, not just an env edit. Call this out in the handover.
* Anchor targets are "closest equivalent" placeholders, not final IA. Revisit the
  anchor map as each page is redesigned.
* `TourCard` is shared with the tours pages; keep the behaviour switch in
  `SiteLink` so the non-preview path is the untouched default.

