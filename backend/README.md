# Beyond Sea Travels API

Express, TypeScript, PostgreSQL, and Prisma backend for the Beyond Sea Travels platform.

## Setup

```bash
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
npm run dev
```

The API defaults to `http://localhost:5000`.

## Scripts

- `npm run dev` starts the development server with `ts-node-dev`
- `npm run build` compiles TypeScript into `dist/`
- `npm run start` runs the compiled server
- `npm run prisma:generate` generates the Prisma client
- `npm run prisma:migrate` runs a development migration
- `npm run prisma:seed` loads public catalogue and transfer seed data

## Environment

```env
PORT=5000
FRONTEND_URL=http://localhost:3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/beyond_sea_travels?schema=public"
JWT_SECRET="replace-with-a-secure-jwt-secret"
```

`FRONTEND_URL` controls the CORS origin. `DATABASE_URL` must point to a running PostgreSQL database before migrations or seed scripts can run.

## Health Check

```txt
GET /api/health
```

Returns:

```json
{
  "success": true,
  "data": {
    "status": "ok"
  }
}
```

## Public Endpoints

- `GET /api/tours`
- `GET /api/tours/:slug`
- `GET /api/destinations`
- `GET /api/testimonials`
- `GET /api/transfers/locations`
- `GET /api/transfers/routes`
- `GET /api/transfers/estimate?pickup=colombo&dropoff=galle&passengers=4`
