# Beyond Sea Travels

## Fullstack Tourism Lead Management Platform

Beyond Sea Travels is a production-style fullstack tourism platform built for a luxury travel business. It combines a public-facing destination and tour website with backend inquiry capture, WhatsApp lead generation, JWT-secured admin access, and an inquiry management dashboard.

This project demonstrates real-world fullstack engineering across frontend architecture, REST API design, database modeling, authentication, cloud deployment, SEO, and product-focused lead management.

![Next.js](https://img.shields.io/badge/Next.js-App%20Router-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-API-111827?style=for-the-badge&logo=express)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/Neon-PostgreSQL-00E599?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-7C3AED?style=for-the-badge&logo=jsonwebtokens)

![Frontend](https://img.shields.io/badge/Frontend-Vercel-black?style=flat-square&logo=vercel)
![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=flat-square&logo=render&logoColor=black)
![Database](https://img.shields.io/badge/Database-Neon-00E599?style=flat-square&logo=postgresql&logoColor=white)
[![CI](../../actions/workflows/ci.yml/badge.svg)](../../actions/workflows/ci.yml)

---

## Live Demo

Live Website - https://beyondsea.gihantharukaweb.online/ 


---

## Project Overview

Tourism businesses often rely on WhatsApp conversations for sales, but many lose visibility into leads because inquiries are never stored in a structured system. Beyond Sea Travels solves this by combining a premium tourism website with a backend lead capture system.

The platform lets travelers browse tours, build custom itineraries, request private transfers, and contact the business through familiar WhatsApp workflows. Before WhatsApp opens, each inquiry is saved to Neon PostgreSQL through the Express API. Staff can then log into a protected admin dashboard, review leads, filter inquiries, and update lead status.

This turns a simple marketing website into a practical lead management platform.

---

## Key Features

### Public Website

- Luxury tourism landing page with premium visual storytelling and conversion-focused sections.
- Dynamic tour listing and tour detail pages built with reusable Next.js App Router components.
- Custom tour builder that captures destinations, duration, interests, budget, passengers, and contact details.
- Private transfer booking flow with pickup/drop-off locations, passenger count, estimated vehicle, and pricing summary.
- About and contact pages designed to build trust and drive qualified leads.

### Inquiry Management

- Contact inquiries are saved before opening WhatsApp.
- Tour quote requests are stored with tour title and slug snapshots.
- Custom tour inquiries store selected destinations and interests as flexible structured data.
- Transfer inquiries store route, vehicle, distance, passenger count, and estimated price.
- Inquiry statuses support `NEW`, `CONTACTED`, `CONFIRMED`, and `CANCELLED`.

### Admin Dashboard

- JWT-secured admin login.
- Dashboard cards for total, new, contacted, confirmed, and cancelled inquiries.
- Inquiry management table with type and status filters.
- Detail modal for reviewing full inquiry data.
- Inline status updates persisted through protected API routes.

### Security

- Passwords are hashed with bcrypt before storage.
- JWT authentication protects admin-only API routes.
- Public inquiry creation remains open while inquiry reads and status updates require authorization.
- Backend CORS is configured through environment variables.

### SEO & Performance

- SEO-ready page metadata.
- Sitemap and robots.txt support.
- JSON-LD structured data strategy for search engines.
- Static generation for public content where appropriate.
- Responsive, mobile-first UI with optimized layout and reusable components.

### Deployment

- Frontend designed for Vercel deployment.
- Backend designed for Render deployment.
- Database hosted on Neon PostgreSQL.
- Environment-based configuration for local and production environments.

---

## System Architecture

```mermaid
flowchart TD
  User[Traveler / Website Visitor] --> Frontend[Next.js Frontend]
  Frontend --> PublicPages[Public Website Pages]
  PublicPages --> InquiryForms[Inquiry Forms]
  InquiryForms --> API[Express API]
  API --> Validation[Zod Validation]
  Validation --> Services[Service Layer]
  Services --> Prisma[Prisma ORM]
  Prisma --> Neon[(Neon PostgreSQL)]
  InquiryForms --> WhatsApp[WhatsApp Lead Conversation]

  Admin[Staff Admin] --> AdminUI[Protected Admin Dashboard]
  AdminUI --> Login[JWT Login]
  Login --> AuthAPI[Auth API]
  AuthAPI --> Neon
  AdminUI --> ProtectedInquiryAPI[Protected Inquiry APIs]
  ProtectedInquiryAPI --> Prisma
```

---

## Database Design

Major entities:

| Entity | Purpose |
| --- | --- |
| `User` | Stores admin user credentials, role, and authentication identity. |
| `ContactInquiry` | Captures general website inquiries and contact form submissions. |
| `TourInquiry` | Stores tour-specific quote requests with snapshot fields for tour title and slug. |
| `CustomTourInquiry` | Stores custom itinerary requests including destinations, interests, duration, and budget. |
| `TransferInquiry` | Stores private transfer leads with pickup, drop-off, vehicle, distance, and estimated price. |
| `Tour` | Represents public tour packages with pricing, images, itinerary days, activities, and destinations. |
| `Destination` | Represents travel destinations connected to tours. |
| `Testimonial` | Stores customer testimonials for public trust-building sections. |
| `TransferLocation` | Stores available pickup/drop-off points. |
| `TransferRoute` | Stores transfer routes, distance, pricing, duration, and recommended stops. |

Inquiry data is separated by type instead of forced into one generic table. This keeps each workflow explicit while still allowing the admin dashboard to combine all inquiry types into one lead management view.

---

## API Overview

### Auth

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/api/auth/login` | Public | Authenticates admin and returns JWT. |
| `GET` | `/api/auth/me` | Protected | Returns current authenticated admin user. |
| `POST` | `/api/auth/logout` | Protected | Client-side logout helper endpoint. |

### Tours

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/api/tours` | Public | Returns all tours with optional filters. |
| `GET` | `/api/tours/:slug` | Public | Returns one tour with images, itinerary, activities, and destinations. |

Supported query filters:

| Query | Example |
| --- | --- |
| `country` | `/api/tours?country=Sri Lanka` |
| `duration` | `/api/tours?duration=7` |
| `featured` | `/api/tours?featured=true` |

### Destinations

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/api/destinations` | Public | Returns destinations with optional featured/country filters. |

### Testimonials

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/api/testimonials` | Public | Returns testimonials with optional featured filter. |

### Transfers

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/api/transfers/locations` | Public | Returns all transfer locations. |
| `GET` | `/api/transfers/routes` | Public | Returns routes with pickup and drop-off locations. |
| `GET` | `/api/transfers/estimate` | Public | Returns estimated route pricing and recommended vehicle. |

Example:

```txt
GET /api/transfers/estimate?pickup=colombo&dropoff=galle&passengers=4
```

### Inquiries

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/api/inquiries/contact` | Public | Creates a contact inquiry. |
| `POST` | `/api/inquiries/tour` | Public | Creates a tour inquiry. |
| `POST` | `/api/inquiries/custom-tour` | Public | Creates a custom tour inquiry. |
| `POST` | `/api/inquiries/transfer` | Public | Creates a transfer inquiry. |
| `GET` | `/api/inquiries` | Protected | Returns combined inquiry data and counts. |
| `GET` | `/api/inquiries/:type/:id` | Protected | Returns one inquiry by type and ID. |
| `PATCH` | `/api/inquiries/:type/:id/status` | Protected | Updates inquiry status. |

Protected requests use:

```txt
Authorization: Bearer <token>
```

---

## Technical Highlights

### Monorepo Architecture

The project is organized into separate `frontend` and `backend` applications, allowing independent deployment and clean ownership boundaries.

### Service Layer Pattern

Business logic lives in service modules instead of route handlers, keeping the API easier to test, extend, and maintain.

### Controller-Service Separation

Controllers validate input, call services, and return consistent responses. Services own Prisma access and application logic.

### Validation with Zod

Backend request payloads are validated with Zod to protect the database and keep API contracts explicit.

### Prisma ORM

Prisma provides type-safe database access, migrations, schema modeling, and clean relations across tours, destinations, inquiries, transfers, and users.

### JWT Authentication

Admin authentication uses JWTs for protected dashboard and inquiry management workflows.

### Responsive Design

The frontend uses Tailwind CSS and reusable components to provide a polished experience across mobile, tablet, and desktop.

### SEO Strategy

The public website includes metadata, sitemap, robots.txt, and structured data planning to support organic search visibility.

---

## Skills Demonstrated

| Skill | Demonstrated Through |
| --- | --- |
| Fullstack Development | Complete frontend, backend, database, and deployment-ready architecture. |
| REST API Design | Public catalogue APIs, inquiry creation APIs, and protected admin endpoints. |
| Authentication & Authorization | JWT login, protected routes, bcrypt password hashing, and auth middleware. |
| Database Modeling | Prisma schema with relational and workflow-specific inquiry models. |
| Cloud Deployment | Architecture designed for Vercel, Render, and Neon. |
| TypeScript Development | Strongly typed frontend components, backend services, validators, and API clients. |
| System Design | Clear separation between public website, API, database, admin dashboard, and WhatsApp workflow. |
| Software Architecture | Monorepo structure, service layer, controller separation, reusable utilities, and modular routes. |
| UI/UX Implementation | Premium tourism UI, responsive layouts, conversion-focused forms, and admin workflows. |
| API Integration | Frontend forms persist data through backend APIs before opening WhatsApp. |
| Product Thinking | Solves a real lead management problem for tourism businesses, not just a technical exercise. |

---

## Challenges Solved

### Frontend and Backend Separation

The project evolved from a frontend-only website into a fullstack monorepo with independent frontend and backend deployment paths.

### Prisma and Neon Integration

The backend uses Prisma migrations, Prisma Client, pooled runtime connections, and direct migration connections for Neon PostgreSQL.

### JWT Authentication

Admin login required secure password hashing, token generation, token verification, protected Express middleware, and frontend token handling.

### Inquiry Workflow Design

The platform preserves the WhatsApp-first sales workflow while saving every lead to the database before redirecting the customer.

### CORS Configuration

The backend uses environment-driven CORS configuration so the frontend can safely communicate with the API locally and in production.

### Production Deployment

The system is structured for production hosting across Vercel, Render, and Neon with environment variable separation.

---

## Deployment Architecture

```mermaid
flowchart LR
  Browser[User Browser] --> Vercel[Vercel: Next.js Frontend]
  Vercel --> Render[Render: Express API]
  Render --> Neon[(Neon PostgreSQL)]
  Render --> JWT[JWT Auth]
  Vercel --> WhatsApp[WhatsApp Lead Conversation]
  Admin[Admin User] --> Vercel
```

| Layer | Platform | Responsibility |
| --- | --- | --- |
| Frontend | Vercel | Public website and admin dashboard. |
| Backend | Render | REST API, auth, inquiry management, transfer estimates. |
| Database | Neon | PostgreSQL storage for catalogue, users, and inquiries. |

---

## Local Setup

### Prerequisites

- Node.js
- npm
- Neon PostgreSQL database

### Clone Repository

```bash
git clone <repository-url>
cd Tourism-Website
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```txt
http://localhost:3000
```

Frontend environment:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

### Backend Setup

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run prisma:seed
npm run dev
```

Backend runs at:

```txt
http://localhost:5001/api
```

Backend environment:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/neondb?sslmode=require"
DIRECT_URL="postgresql://USER:PASSWORD@DIRECT_HOST/neondb?sslmode=require&channel_binding=require"
JWT_SECRET="replace-with-long-random-secret"
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
PORT=5001
```


### Useful Commands

Frontend:

```bash
cd frontend
npm run lint
npm run build
npm run start
npm run test
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

Backend:

```bash
cd backend
npm run build
npx prisma validate
npx prisma generate
```

---

## Repository Structure

```txt
Tourism-Website/
├── frontend/
│   ├── src/app/
│   ├── src/components/
│   ├── src/services/
│   ├── src/lib/
│   └── src/types/
├── backend/
│   ├── prisma/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── routes/
│       ├── services/
│       ├── validators/
│       ├── utils/
│       └── types/
├── docs/
└── README.md
```

---

## Future Enhancements

- CMS for managing tours, destinations, testimonials, and homepage content.
- Analytics dashboard for lead sources, conversion rates, and follow-up performance.
- Booking engine with availability, itinerary confirmation, and internal notes.
- Payment integration for deposits and confirmed bookings.
- Google Maps route pricing for distance-based transfer estimates.
- Multi-language support for international travelers.
- Email notifications for new inquiries.
- Role-based admin permissions for larger operations teams.

---

## Why This Project Matters

Beyond Sea Travels is not a CRUD tutorial project. It is a production-style business platform designed around a realistic tourism sales workflow.

It demonstrates how a modern fullstack application can connect marketing, lead capture, database persistence, authentication, admin operations, and deployment into one coherent system.

The project shows practical software engineering judgment: clean architecture, typed APIs, database modeling, protected admin workflows, SEO-minded frontend development, and business-focused product thinking.

For recruiters and technical interviewers, this project demonstrates the ability to build more than screens. It shows the ability to design and ship a real fullstack product that solves an operational problem.
## Continuous Integration

GitHub Actions runs on every `push` and `pull_request` using Node.js 20.

Frontend CI:

```bash
cd frontend
npm ci
npm run lint
npm run build
```

Backend CI:

```bash
cd backend
npm ci
npx prisma validate
npx prisma generate
npx prisma migrate deploy
npm run prisma:seed
npm run build
npm run test
npm audit --audit-level=high
```

Docker CI:

```bash
docker compose build
```

The backend CI job uses an ephemeral PostgreSQL service with placeholder environment variables. It does not require Neon, Vercel, Render, or production secrets, and it does not reset or mutate production data.

## Docker

Docker support is provided for local development only. It does not change the existing production deployment model:

```txt
Frontend: Vercel, root = frontend/
Backend: Render, root = backend/
Database: Neon PostgreSQL
```

### Local Docker With Neon

This mode runs the frontend and backend in containers while the backend continues to use the existing `backend/.env` Neon connection.

```bash
docker compose build
docker compose up
```

Open:

```txt
Frontend: http://localhost:3000
Backend health: http://localhost:5001/api/health
```

Stop containers:

```bash
docker compose down
```

### Local Docker With PostgreSQL

Use the optional override when you want a local PostgreSQL container instead of Neon:

```bash
docker compose -f docker-compose.yml -f docker-compose.local-db.yml up --build
```

Then run migrations and seed data against the backend container:

```bash
docker compose exec backend npx prisma migrate dev
docker compose exec backend npm run prisma:seed
```

Stop containers and keep the database volume:

```bash
docker compose -f docker-compose.yml -f docker-compose.local-db.yml down
```

Remove the local PostgreSQL volume:

```bash
docker compose -f docker-compose.yml -f docker-compose.local-db.yml down -v
```

### Docker Environment

See `.env.docker.example` for non-secret Docker environment documentation.

Important:

- `docker-compose.yml` uses `backend/.env` for backend variables.
- Do not commit real `.env` secrets.
- `NEXT_PUBLIC_API_URL` is set to `http://localhost:5001/api` for local containers.

## Deployment Direction

This layout supports separate frontend and backend deployments, clean environment separation, Docker-based local development, and incremental API integration without disturbing the existing tourism website.
