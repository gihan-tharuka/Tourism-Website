# Beyond Sea Travels

[![CI](../../actions/workflows/ci.yml/badge.svg)](../../actions/workflows/ci.yml)

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
NEXT_PUBLIC_API_URL=http://localhost:5001/api
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
http://localhost:5001/api
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
PORT=5001
FRONTEND_URL=http://localhost:3000
DATABASE_URL="postgresql://USER:PASSWORD@HOST/neondb?sslmode=require"
DIRECT_URL="postgresql://USER:PASSWORD@DIRECT_HOST/neondb?sslmode=require&channel_binding=require"
JWT_SECRET="replace-with-a-secure-jwt-secret"
JWT_EXPIRES_IN=7d
```

## Backend Scripts

```bash
npm run dev
npm run build
npm run start
npm run test
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
