# Beyond Sea Travels

Beyond Sea Travels is now structured as a fullstack monorepo-style tourism platform with a Next.js frontend and an Express/PostgreSQL backend foundation.

## Structure

```txt
Tourism-Website/
├── frontend/   # Next.js App Router tourism website
├── backend/    # Express API, TypeScript, Prisma, PostgreSQL
├── docs/       # Architecture and project documentation
├── README.md
└── .gitignore
```

## Frontend

The frontend preserves the existing Next.js App Router application, routes, components, services, data, TypeScript config, ESLint config, and public assets.

```bash
cd frontend
npm install
npm run dev
npm run lint
npm run build
```

Default local URL:

```txt
http://localhost:3000
```

Frontend environment values live in `frontend/.env.local`.

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Backend

The backend provides the Phase 1 public API layer with Express, TypeScript, Prisma, PostgreSQL models, migrations, and seed data.

```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
npm run dev
```

Default API URL:

```txt
http://localhost:5000
```

Health check:

```txt
GET /api/health
```

Expected response:

```json
{
  "success": true,
  "data": {
    "status": "ok"
  }
}
```

Backend environment values live in `backend/.env`.

```env
PORT=5000
FRONTEND_URL=http://localhost:3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/beyond_sea_travels?schema=public"
JWT_SECRET="replace-with-a-secure-jwt-secret"
```

## Backend Scripts

```bash
npm run dev
npm run build
npm run start
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

Public API routes:

```txt
GET /api/tours
GET /api/tours/:slug
GET /api/destinations
GET /api/testimonials
GET /api/transfers/locations
GET /api/transfers/routes
GET /api/transfers/estimate?pickup=colombo&dropoff=galle&passengers=4
```

## Deployment Direction

This layout supports separate frontend and backend deployments, clean environment separation, future Docker support, and incremental API integration without disturbing the existing tourism website.
