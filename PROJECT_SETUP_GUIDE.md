# Beyond Sea Travels — Project Setup Guide

# 1. Overview

This document contains the complete setup guide for the Beyond Sea Travels MVP project.

The project is built using:

* Next.js 15
* TypeScript
* Tailwind CSS
* shadcn/ui
* Framer Motion

The MVP is a frontend-focused tourism platform designed for future scalability into a fullstack application using Node.js backend architecture.

---

# 2. System Requirements

Before starting, ensure the following tools are installed.

---

# 3. Required Software

## Node.js

Install:

* Node.js LTS (Recommended: v20+)

Verify installation:

```bash
node -v
npm -v
```

---

## Git

Install Git for version control.

Verify:

```bash
git --version
```

---

## Visual Studio Code

Recommended IDE:

* VS Code

---

# 4. Recommended VS Code Extensions

Install the following extensions:

| Extension                 | Purpose                 |
| ------------------------- | ----------------------- |
| Tailwind CSS IntelliSense | Tailwind autocomplete   |
| ESLint                    | Linting                 |
| Prettier                  | Formatting              |
| ES7+ React Snippets       | React snippets          |
| GitLens                   | Git integration         |
| Error Lens                | Better error visibility |
| Path Intellisense         | Import autocomplete     |

---

# 5. Create the Next.js Project

Run:

```bash
npx create-next-app@latest beyond-sea-travels
```

Recommended configuration:

```txt
✔ TypeScript → Yes
✔ ESLint → Yes
✔ Tailwind CSS → Yes
✔ src/ directory → Yes
✔ App Router → Yes
✔ Turbopack → Yes
✔ Import Alias → Yes
```

---

# 6. Enter the Project Directory

```bash
cd beyond-sea-travels
```

---

# 7. Create the Recommended Folder Structure

# Mac/Linux/Git Bash

```bash
mkdir -p src/{components/{layout,home,tours,transfers,custom-tour,forms,shared,ui},data,services,lib,hooks,types,store,styles,assets} src/app/{about,contact,tours,custom-tour,transfers,gallery,testimonials,api}
```

---

# Windows PowerShell

```powershell
mkdir src/components/layout
mkdir src/components/home
mkdir src/components/tours
mkdir src/components/transfers
mkdir src/components/custom-tour
mkdir src/components/forms
mkdir src/components/shared
mkdir src/components/ui

mkdir src/data
mkdir src/services
mkdir src/lib
mkdir src/hooks
mkdir src/types
mkdir src/store
mkdir src/styles
mkdir src/assets

mkdir src/app/about
mkdir src/app/contact
mkdir src/app/tours
mkdir src/app/custom-tour
mkdir src/app/transfers
mkdir src/app/gallery
mkdir src/app/testimonials
mkdir src/app/api
```

---

# 8. Create Initial Files

# Mac/Linux/Git Bash

```bash
touch src/data/{tours.ts,destinations.ts,activities.ts,vehicles.ts}

touch src/services/{tour.service.ts,transfer.service.ts,whatsapp.service.ts}

touch src/lib/{utils.ts,constants.ts,seo.ts}

touch src/types/{tour.ts,destination.ts,vehicle.ts,inquiry.ts}
```

---

# Windows PowerShell

```powershell
New-Item src/data/tours.ts
New-Item src/data/destinations.ts
New-Item src/data/activities.ts
New-Item src/data/vehicles.ts

New-Item src/services/tour.service.ts
New-Item src/services/transfer.service.ts
New-Item src/services/whatsapp.service.ts

New-Item src/lib/utils.ts
New-Item src/lib/constants.ts
New-Item src/lib/seo.ts

New-Item src/types/tour.ts
New-Item src/types/destination.ts
New-Item src/types/vehicle.ts
New-Item src/types/inquiry.ts
```

---

# 9. Install Required Dependencies

Run:

```bash
npm install framer-motion lucide-react swiper react-hook-form zod clsx tailwind-merge
```

---

# 10. Install shadcn/ui

Initialize shadcn:

```bash
npx shadcn@latest init
```

Recommended options:

```txt
✔ Style → New York
✔ Base Color → Slate
✔ CSS Variables → Yes
```

---

# 11. Install Prettier

Run:

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

---

# 12. Configure TypeScript Path Aliases

Update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

# 13. Create Root Files

Create the following files in the project root:

```txt
README.md
PROJECT_ARCHITECTURE_PLAN.md
PROJECT_SETUP_GUIDE.md
.env.local
```

---

# 14. Environment Variables

Add the following to `.env.local`

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_SITE_URL=
```

---

# 15. Start the Development Server

Run:

```bash
npm run dev
```

The project should run at:

```txt
http://localhost:3000
```

---

# 16. Recommended Initial Development Order

# Phase 1 — Core Setup

* setup project
* setup folder structure
* setup typography
* setup colors
* setup layout

---

# Phase 2 — Shared Components

* navbar
* footer
* buttons
* section headings
* cards

---

# Phase 3 — Homepage

* hero section
* featured tours
* destinations
* testimonials
* CTA sections

---

# Phase 4 — Tours

* listing page
* detail page
* itinerary section
* activity cards

---

# Phase 5 — Inquiry Features

* WhatsApp forms
* custom tour builder
* transfer inquiry page

---

# Phase 6 — Optimization

* responsiveness
* SEO
* animations
* performance optimization

---

# 17. Recommended Git Workflow

Initialize Git:

```bash
git init
```

Initial commit:

```bash
git add .
git commit -m "Initial project setup"
```

Create GitHub repository and push code.

---

# 18. Deploy to Vercel

# Steps

1. Push project to GitHub
2. Login to Vercel
3. Import GitHub repository
4. Deploy

No additional configuration should be required.

---

# 19. Important Development Rules

# MUST FOLLOW

* Use TypeScript everywhere
* Keep components reusable
* Use service layer pattern
* Keep business logic outside UI
* Avoid hardcoding data
* Keep files small and modular
* Mobile-first development
* SEO-first structure

---

# 20. Recommended Future Backend Architecture

Future architecture:

```txt
Next.js Frontend
↓
REST API
↓
Node.js Backend
↓
PostgreSQL Database
```

Potential backend stack:

* Express.js
  OR
* NestJS
* Prisma ORM
* PostgreSQL

---

# 21. AI Coding Agent Instructions

AI coding agents working on this project MUST:

* preserve architecture
* avoid hardcoded logic
* maintain modular structure
* create reusable components
* follow responsive design
* optimize for scalability
* avoid unnecessary dependencies

---

# 22. Final Goal

The MVP should become:

* a premium tourism website
* mobile optimized
* SEO optimized
* visually modern
* conversion focused
* scalable into a future SaaS platform

The focus is:

* lead generation
* tourism branding
* inquiry conversion
* future scalability
