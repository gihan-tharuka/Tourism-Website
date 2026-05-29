# Beyond Sea Travels API

Express, TypeScript, PostgreSQL, and Prisma backend for the Beyond Sea Travels platform.

## Setup

```bash
npm install
npm run prisma:generate
npm run dev
```

The API defaults to `http://localhost:5000`.

## Scripts

- `npm run dev` starts the development server with `ts-node-dev`
- `npm run build` compiles TypeScript into `dist/`
- `npm run start` runs the compiled server
- `npm run prisma:generate` generates the Prisma client
- `npm run prisma:migrate` runs a development migration

## Health Check

```txt
GET /api/health
```

Returns:

```json
{
  "status": "ok"
}
```
