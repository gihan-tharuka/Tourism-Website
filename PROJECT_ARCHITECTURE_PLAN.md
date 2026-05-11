# Beyond Sea Travels — MVP Architecture & Development Plan

# 1. Project Overview

## Objective

Build a modern, SEO-optimized tourism website MVP for Beyond Sea Travels focused on:

* showcasing inbound tour packages
* generating leads through WhatsApp
* building trust and brand presence
* mobile-first tourism browsing experience
* future scalability into a fullstack platform

This MVP is intentionally frontend-focused to ensure:

* faster delivery
* lower complexity
* easier maintenance
* reduced development cost
* fast iteration and client feedback

The architecture must support future migration into a complete fullstack application with:

* backend API
* admin dashboard
* booking management
* inquiry management
* customer management
* itinerary management
* payment integration

---

# 2. Technology Stack

# MVP Stack

## Frontend

* Next.js 15 (App Router)
* TypeScript
* Tailwind CSS
* shadcn/ui
* Framer Motion

## Deployment

* Vercel

## Forms & Communication

* WhatsApp Deep Linking
* Optional: EmailJS or Formspree

## State Management

* Minimal local state
* React Context if needed
* Avoid Redux in MVP

---

# Future Fullstack Stack

## Frontend

* Next.js

## Backend

* Node.js
* Express.js or NestJS

## Database

* PostgreSQL (recommended)
  OR
* MongoDB

## ORM

* Prisma

## Admin Dashboard

Option 1:

* Next.js Admin Panel

Option 2:

* Separate Admin Dashboard

---

# 3. Architecture Philosophy

This project MUST follow:

* scalable architecture
* clean code principles
* component reusability
* separation of concerns
* service-based architecture
* future API abstraction

Even though the MVP uses static data, the codebase MUST behave as if APIs already exist.

---

# 4. MVP Goals

The MVP is NOT a booking engine.

The MVP IS:

* a tourism marketing platform
* a lead generation platform
* an inquiry conversion platform

Primary KPI:

* WhatsApp inquiries
* customer trust
* SEO visibility
* mobile user experience

---

# 5. Features Included in MVP

# Core Features

## Home Page

* Hero section
* Destination showcase
* Featured tours
* Testimonials
* CTA sections
* Trust indicators

---

## Tour Listings

* Sri Lanka tours
* Thailand tours
* Malaysia tours

Tour durations:

* 4 days
* 7 days
* 14 days
* 20 days

---

## Tour Detail Pages

* overview
* itinerary
* activities
* pricing
* included/excluded
* image gallery
* inquiry CTA

---

## Custom Tour Builder

Users can:

* select duration
* select destinations
* select interests
* select budget

Result:

* itinerary preview
* WhatsApp inquiry

---

## Transfer Booking Inquiry

Users can:

* select pickup
* select drop-off
* select passenger count

System shows:

* estimated vehicle
* estimated pricing
* recommended stops

---

## WhatsApp Integration

Primary inquiry method.

All inquiry forms must generate dynamic WhatsApp messages.

---

## SEO Optimization

Every page must contain:

* metadata
* SEO titles
* descriptions
* structured headings

---

# 6. Features Excluded from MVP

The following MUST NOT be implemented now:

* payment gateway
* real booking system
* user accounts
* authentication
* dashboards
* availability management
* CRM
* admin systems
* live GPS tracking
* AI itinerary engine

These are future-phase features.

---

# 7. Project Folder Structure

Use this exact scalable structure.

```txt
src/
│
├── app/
│   ├── page.tsx
│   ├── about/
│   ├── contact/
│   ├── tours/
│   ├── custom-tour/
│   ├── transfers/
│   ├── gallery/
│   ├── testimonials/
│   └── api/
│
├── components/
│   ├── layout/
│   ├── home/
│   ├── tours/
│   ├── transfers/
│   ├── custom-tour/
│   ├── forms/
│   ├── shared/
│   └── ui/
│
├── data/
│   ├── tours.ts
│   ├── destinations.ts
│   ├── activities.ts
│   └── vehicles.ts
│
├── services/
│   ├── tour.service.ts
│   ├── transfer.service.ts
│   └── whatsapp.service.ts
│
├── lib/
│   ├── utils.ts
│   ├── constants.ts
│   └── seo.ts
│
├── hooks/
│
├── types/
│   ├── tour.ts
│   ├── destination.ts
│   ├── vehicle.ts
│   └── inquiry.ts
│
├── store/
│
├── styles/
│
└── assets/
```

---

# 8. Critical Architecture Rules

# Rule 1 — Never Hardcode Data Inside Components

BAD:

```ts
const tours = [...]
```

GOOD:

```ts
import { getTours } from "@/services/tour.service"
```

---

# Rule 2 — Use Service Layer Everywhere

Even static data must go through services.

Example:

```ts
export const getTours = async () => {
  return toursData
}
```

Future:

```ts
export const getTours = async () => {
  return fetch("/api/tours")
}
```

This prevents future rewrites.

---

# Rule 3 — Keep UI and Business Logic Separate

Components:

* rendering only

Services:

* data handling
* transformation
* future API calls

---

# Rule 4 — Small Reusable Components

Avoid huge components.

Preferred:

* HeroSection
* TourCard
* TourAccordion
* ActivityCard
* VehicleSelector
* WhatsAppButton

---

# Rule 5 — Mobile First

Most tourism users browse via mobile.

All pages MUST:

* be mobile responsive
* have large touch targets
* fast loading
* optimized images

---

# 9. Design System Guidelines

# Design Style

Use:

* luxury tourism aesthetic
* cinematic imagery
* large spacing
* premium typography
* modern card layouts
* subtle animations

Avoid:

* outdated tourism templates
* cluttered layouts
* too much text
* overcomplicated UI

---

# Color Strategy

Use:

* clean neutral backgrounds
* ocean/travel-inspired accents
* premium typography contrast

Avoid:

* too many colors
* overly saturated UI

---

# Typography

Use:

* modern sans-serif fonts
* large headings
* readable body text

---

# 10. Tourism Industry UX Best Practices

# Important

Tourism websites are trust platforms.

Users need:

* beautiful imagery
* trust
* easy inquiries
* itinerary clarity
* pricing transparency

NOT:

* complex systems
* confusing navigation
* technical complexity

---

# Required UX Elements

Every tour page should contain:

* large hero image
* quick overview
* duration
* starting price
* itinerary
* included/excluded
* inquiry CTA
* WhatsApp CTA

---

# 11. WhatsApp Integration Standards

WhatsApp is the PRIMARY conversion channel.

All inquiry forms MUST:

* generate prefilled WhatsApp messages
* include tour details
* include customer inputs

Example:

```txt
Hello Beyond Sea Travels,

I am interested in the 7 Day Sri Lanka Tour.

Travel Date:
Passenger Count:
Country:

Please send more details.
```

---

# 12. SEO Standards

SEO is CRITICAL.

Target search intent:

* Sri Lanka tour packages
* Sri Lanka travel agency
* Sri Lanka private tours
* Sri Lanka travel packages
* Sri Lanka holiday tours

---

# Every Page MUST Include

* unique title
* meta description
* semantic headings
* optimized images
* proper URL structure

---

# Recommended URL Structure

```txt
/tours/sri-lanka-7-day-tour
/tours/sri-lanka-14-day-tour
/custom-tour
/transfers
```

---

# 13. Performance Standards

The website MUST:

* load fast
* optimize images
* lazy load heavy sections
* minimize unnecessary JS

Use:

* Next.js Image component
* dynamic imports if needed

---

# 14. Accessibility Standards

Minimum accessibility requirements:

* proper heading hierarchy
* alt text for images
* keyboard navigability
* sufficient color contrast

---

# 15. Future Backend Migration Plan

# Future Backend Architecture

```txt
Next.js Frontend
↓
REST API
↓
Node.js Backend
↓
PostgreSQL Database
```

---

# Planned Future Features

## Admin Dashboard

* manage tours
* manage itineraries
* manage inquiries
* manage destinations

---

## Booking Management

* booking requests
* customer records
* booking status tracking

---

## CRM

* inquiry management
* customer communication

---

## Payment Gateway

Potential:

* Stripe
* PayHere

---

# 16. Recommended Future Backend Structure

```txt
backend/
│
├── src/
│   ├── modules/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── config/
```

---

# 17. Coding Standards

# Required

* TypeScript everywhere
* reusable components
* descriptive naming
* clean imports
* avoid duplicate code

---

# Avoid

* massive files
* inline business logic
* deeply nested components
* hardcoded styles everywhere

---

# 18. AI Coding Agent Guidelines

AI agents working on this project MUST:

* preserve architecture
* maintain service-layer abstraction
* avoid hardcoding
* create reusable components
* follow responsive design principles
* keep code modular
* avoid unnecessary libraries

---

# 19. Recommended Development Phases

# Phase 1 — Core Setup

* Next.js setup
* Tailwind setup
* folder structure
* layout system

---

# Phase 2 — Main UI

* home page
* navigation
* footer
* responsive layout

---

# Phase 3 — Tours

* listing pages
* detail pages
* itinerary components

---

# Phase 4 — Inquiry Systems

* WhatsApp forms
* custom tours
* transfers

---

# Phase 5 — Optimization

* SEO
* animations
* performance
* responsiveness

---

# 20. Final Project Vision

The MVP should feel like:

* a premium travel brand
* modern
* cinematic
* trustworthy
* mobile optimized
* conversion focused

The goal is NOT technical complexity.

The goal is:

* lead generation
* tourism branding
* inquiry conversion
* SEO visibility
* future scalability
