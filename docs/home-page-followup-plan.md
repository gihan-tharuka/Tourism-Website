# Home Page — Follow-up Fixes Plan

Status: Proposed, pending implementation
Companion doc: `home-page-section-plan.md` (sections already shipped on this branch)
Scope: Nine targeted fixes across the navbar, home sections and footer. Docs only for now — no code in this step.
Branch: ui-ux-v1
Last updated: 2026-02-10

---

# 1. Purpose

After shipping the "Coastal Luxe" home redesign, a round of owner feedback produced
nine concrete fixes. This document plans each change (files, current state, exact
change, notes, verification) so they can be implemented in one pass with no
mid-broken state.

# 2. Resolved Decisions

| # | Question | Decision |
| --- | --- | --- |
| 1 | Which tour to add to Featured? | **Sri Lanka 14-Day Premier Journey** (`sri-lanka-14-day-premier`) |
| 7 | Which 4 "Why Choose Us" cards to keep? | Private transport, Experienced guides, Custom itineraries, 24/7 support |

# 3. Change Summary

| # | Task | File(s) | Type |
| --- | --- | --- | --- |
| 1 | Add one more featured tour | `data/tours.ts` | data |
| 2 | Remove logo icon in navbar | `layout/navbar.tsx` | markup |
| 3 | Opaque navbar when scrolled | `layout/navbar.tsx` | style |
| 4 | Hide pricing in cards | `home/tour-card.tsx` | markup |
| 5 | Destination description on hover (translucent white panel, white text) | `home/destinations-showcase.tsx` | markup/style |
| 6 | Remove "Sri Lanka" country text | `home/destinations-showcase.tsx` | markup |
| 7 | Why Choose Us → 4 cards | `home/why-choose-us.tsx` | data/markup |
| 8 | More visible "Build your journey" background image | `home/custom-tour-cta.tsx` | style |
| 9 | Footer: remove "IS" logo | `layout/footer.tsx` | markup |

Tasks 5 and 6 touch the same file and are implemented together.

# 4. Current-State Findings (evidence)

* `getFeaturedTours()` = `tours.filter(t => t.isFeatured).slice(0, 3)`. Only **2**
  tours carry `isFeatured: true` (`sri-lanka-7-day-escape`, `sri-lanka-10-day-cultural`),
  so the home page currently renders **2** cards.
* Navbar scrolled state uses `.glass-light` = `rgba(255,255,255,0.82)` + blur, which
  lets page content bleed through and hurts text legibility.
* `Compass` is imported in `navbar.tsx` and used **only** in the logo mark.
* `TourCard` is shared by `home/featured-tours.tsx`, `tours/featured-preview.tsx`
  and `tours/tours-page-content.tsx`.
* `Award` and `ShieldCheck` are imported in `why-choose-us.tsx` and used only by the
  two cards proposed for removal.
* Destinations data has a `country` field ("Sri Lanka") rendered as the eyebrow.

# 5. Per-Task Detail

## Task 1 — Add one more featured tour

* **Files:** `frontend/src/data/tours.ts` (primary); `frontend/src/services/tour.service.ts` (note only).
* **Current:** `getFeaturedTours()` filters `isFeatured` then `.slice(0, 3)`; only two
  tours are flagged, so two cards render.
* **Change:** set `isFeatured: true` on the `sri-lanka-14-day-premier` entry in
  `data/tours.ts`. The filter then returns 3 and the existing `.slice(0, 3)` yields
  exactly 3, filling the `lg:grid-cols-3` row.
* **Notes:** No component change — `featured-tours.tsx` already handles any count.
  Keep the `slice(0, 3)` cap so the row stays at three; bump later only if more tours
  are flagged. The `/tours` page uses `getTours()` (all four) and is unaffected.
* **Verify:** Home renders 3 featured cards.

## Task 2 — Remove the logo icon in the navbar

* **File:** `frontend/src/components/layout/navbar.tsx`.
* **Current:** `<Link>` contains an icon `<span>` (`Compass` mark) + the two-tone
  wordmark, with `gap-2.5`.
* **Change:** delete the icon `<span>`; drop `gap-2.5` from the `<Link>`; remove
  `Compass` from the `lucide-react` import (line 7) since it is used only there.
* **Notes:** The `transparent` conditional styling for the icon is removed with it;
  the wordmark keeps its `transparent` colour logic.
* **Verify:** Navbar shows only the "IslandSea / Travels" wordmark; lint clean.

## Task 3 — Reduce navbar transparency when scrolled

* **File:** `frontend/src/components/layout/navbar.tsx` (scrolled class branch).
* **Current:** scrolled state = `glass-light border-b border-border/70 shadow-soft`;
  `glass-light` is `rgba(255,255,255,0.82)` + blur.
* **Change:** replace `glass-light` with an opaque background, e.g.
  `bg-background border-b border-border/70 shadow-soft` (optionally firm the hairline
  to `border-border`).
* **Notes:** Keeps the `h-20 → h-16` condense and the `duration-300` transition.
  Only the scrolled (solid) state changes; the transparent-over-hero state is untouched.
* **Verify:** At scroll the bar is opaque with legible ink text (AA contrast).

## Task 4 — Don't show pricing in cards

* **File:** `frontend/src/components/home/tour-card.tsx` (price block in the footer row).
* **Current:** footer row shows "From" + `$startingPrice` on the left and the
  "View tour" CTA on the right (`justify-between`).
* **Change:** remove the price `<div>` block; change the footer row to `justify-end`
  (or make the "View tour" button full-width via `w-full justify-center`).
* **Notes:** No type change — `startingPrice` is still used by the tour detail pages
  and `lib/seo.ts`. `TourCard` is shared, so price disappears on the tours pages too
  (consistent by design).
* **Verify:** No price on home or tours cards; build/lint clean.

## Task 5 — Destination description on hover (translucent white panel, white text)

* **File:** `frontend/src/components/home/destinations-showcase.tsx`.
* **Current:** each tile always shows country, name, description, plus a hidden
  "Explore →" affordance.
* **Change:** base state shows the **name only** (bottom scrim retained). Wrap the
  description + "Explore →" in a panel that reveals on hover/focus:
  `rounded-2xl bg-white/15 p-4 backdrop-blur-sm text-white opacity-0
  transition-opacity duration-300 group-hover:opacity-100
  group-focus-visible:opacity-100`.
* **Notes:** For touch devices (no hover) reveal by default with `max-lg:opacity-100`
  so the description stays readable. Whole tile remains a `Link` to
  `/tours?destination={name}`.
* **Verify:** Name at rest; description fades in over a translucent white panel with
  white text on hover; keyboard focus reveals it too.

## Task 6 — Remove the "Sri Lanka" country text

* **File:** `frontend/src/components/home/destinations-showcase.tsx`.
* **Current:** a `<p>` eyebrow renders `{destination.country}` above the name.
* **Change:** delete that `<p>`.
* **Notes:** The `country` field stays in the data model (used elsewhere, e.g. tour
  filtering); only the home tile stops rendering it.
* **Verify:** No "Sri Lanka" eyebrow on destination tiles.

## Task 7 — Why Choose Us → 4 cards

* **File:** `frontend/src/components/home/why-choose-us.tsx`.
* **Current:** `cards` array has six entries; grid is `sm:grid-cols-2`.
* **Change:** trim to four — keep **Private transport, Experienced guides, Custom
  itineraries, 24/7 support**; remove **Local expertise, Flexible travel**. Remove the
  now-unused `Award` and `ShieldCheck` imports.
* **Notes:** Four cards give a clean 2×2 block.
* **Verify:** 4 cards render; lint clean.

## Task 8 — More visible "Build your journey" background image

* **File:** `frontend/src/components/home/custom-tour-cta.tsx`.
* **Current:** background image at `opacity-25`, overlaid by
  `bg-gradient-to-r from-deep via-deep/90 to-deep/70`.
* **Change:** raise image opacity (`opacity-25 → opacity-45`) and lighten the gradient
  (e.g. `from-deep/95 via-deep/75 to-deep/35`), keeping a darker left edge where the
  copy sits.
* **Notes:** The right-side CTA card keeps its own `bg-white/5` panel, so it stays
  legible. Confirm white text still meets AA contrast after the change.
* **Verify:** Photo is clearly more visible; copy remains legible.

## Task 9 — Footer: remove the "IS" logo

* **File:** `frontend/src/components/layout/footer.tsx`.
* **Current:** the brand `<Link>` shows an "IS" badge (`h-10 w-10 … bg-primary`) plus
  the "IslandSea Travels" wordmark.
* **Change:** remove the "IS" badge `<span>`; keep the wordmark. Tidy the `<Link>`
  classes (drop `gap-3`).
* **Verify:** Footer brand shows only "IslandSea Travels".

# 6. Implementation Order

1. Data first: Task 1 (`tours.ts`).
2. Navbar: Tasks 2 + 3 together (`navbar.tsx`).
3. Cards: Task 4 (`tour-card.tsx`).
4. Destinations: Tasks 5 + 6 together (`destinations-showcase.tsx`).
5. Why Choose Us: Task 7.
6. CTA band: Task 8.
7. Footer: Task 9.
8. Global verification pass.

# 7. Global Verification

* `cd frontend && npm run lint` — clean (catches removed `Compass` / `Award` /
  `ShieldCheck` imports).
* `npx tsc --noEmit` — clean.
* `npm run build` — passes.
* Playwright, desktop 1440×900 + iPhone 13:
  * Navbar: no icon; solid bar after scroll with legible text.
  * Featured tours: 3 cards, no price row.
  * Destinations: name-only at rest; hover reveals translucent white description panel
    with white text; no "Sri Lanka".
  * Why Choose Us: 4 cards (2×2).
  * CTA band: image visibly stronger; copy legible.
  * Footer: wordmark only.
  * No horizontal overflow on mobile.

# 8. Out of Scope / Risks

* No new/replacement imagery (destinations/tours) — deferred, per earlier decision.
* `TourCard` pricing removal also affects the tours pages (intended).
* Destination hover panel is hidden by default on desktop; touch users rely on the
  `max-lg` fallback — verify on a real touch viewport.
* Navbar opacity change applies only to the scrolled state; the hero-transparent state
  is intentionally unchanged.



