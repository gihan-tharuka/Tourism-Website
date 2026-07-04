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
- `npm run test` runs the Mocha integration test suite
- `npm run test:watch` reruns backend tests in watch mode
- `npm run prisma:generate` generates the Prisma client
- `npm run prisma:migrate` runs a development migration
- `npm run prisma:seed` loads public catalogue and transfer seed data

## Environment

```env
PORT=5001
FRONTEND_URL=http://localhost:3000
DATABASE_URL="postgresql://USER:PASSWORD@HOST/neondb?sslmode=require"
DIRECT_URL="postgresql://USER:PASSWORD@DIRECT_HOST/neondb?sslmode=require&channel_binding=require"
JWT_SECRET="replace-with-long-random-secret"
JWT_EXPIRES_IN=7d
MONGODB_URI=
MONGODB_LOGGING_ENABLED=false
```

`FRONTEND_URL` controls the CORS origin. `DATABASE_URL` is used by Prisma Client at runtime. `DIRECT_URL` is used by Prisma migrations.

## Optional MongoDB Activity Logging

PostgreSQL remains the source of truth for tours, destinations, transfers, users, and inquiries. MongoDB is optional and is used only for admin activity/audit logs.

Enable MongoDB Atlas logging with:

```env
MONGODB_URI="mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/beyond-sea-travels"
MONGODB_LOGGING_ENABLED=true
```

If `MONGODB_LOGGING_ENABLED` is not `true`, or if `MONGODB_URI` is missing/unavailable, the backend continues running and activity logging becomes a safe no-op.

Protected activity log endpoint:

```txt
GET /api/admin/activity-logs
```

Logged admin actions:

- `ADMIN_LOGIN_SUCCESS`
- `ADMIN_LOGIN_FAILED`
- `ADMIN_VIEWED_INQUIRIES`
- `ADMIN_VIEWED_INQUIRY_DETAIL`
- `ADMIN_UPDATED_INQUIRY_STATUS`

## Testing

Backend tests use Mocha, Chai, and Supertest against the exported Express app in `src/app.ts`.

```bash
npm run test
```

The test suite covers health, auth, tours, transfer estimates, inquiry authentication, and public inquiry validation. Database-backed tests use the configured Prisma database and seeded admin credentials, so run migrations and seed data before testing a fresh environment.

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

## Swagger API Documentation

Interactive OpenAPI documentation is available from the running backend:

```txt
http://localhost:5001/api/docs
```

The raw OpenAPI 3.0 document is also available for API tooling:

```txt
GET /api/docs.json
```

Swagger includes public catalogue routes, transfer routes, inquiry capture routes, admin auth routes, and protected inquiry management routes.

### JWT Authorization in Swagger

1. Start the backend.
2. Open `http://localhost:5001/api/docs`.
3. Run `POST /api/auth/login` with the seeded admin credentials.
4. Copy the returned `token`.
5. Click **Authorize** and paste the raw JWT token into the `bearerAuth` field.

Swagger UI will send protected requests with:

```txt
Authorization: Bearer <token>
```

## Public Endpoints

- `GET /api/tours`
- `GET /api/tours/:slug`
- `GET /api/destinations`
- `GET /api/testimonials`
- `GET /api/transfers/locations`
- `GET /api/transfers/routes`
- `GET /api/transfers/estimate?pickup=colombo&dropoff=galle&passengers=4`
- `GET /api/search/tours?q=sri`
- `GET /api/search/destinations?q=ella`
- `GET /api/search/global?q=safari`

## Search Endpoints

Search uses PostgreSQL through Prisma `findMany` queries. No external search service is required.

```txt
GET /api/search/tours?q=sri&limit=10
GET /api/search/destinations?q=ella&limit=10
GET /api/search/global?q=safari&limit=10
```

Rules:

- `q` is required and trimmed.
- Empty `q` returns `400`.
- Search is case-insensitive.
- `limit` is optional and capped at `20`.
- Global search returns grouped `tours` and `destinations`.

## Inquiry Endpoints

Customer inquiry capture is public so frontend forms can save leads before opening WhatsApp.

- `POST /api/inquiries/contact`
- `POST /api/inquiries/tour`
- `POST /api/inquiries/custom-tour`
- `POST /api/inquiries/transfer`
- `GET /api/inquiries`
- `GET /api/inquiries/:type/:id`
- `PATCH /api/inquiries/:type/:id/status`

Supported inquiry types for read/update routes:

```txt
contact
tour
custom-tour
transfer
```

Inquiry statuses:

```txt
NEW
CONTACTED
CONFIRMED
CANCELLED
```

Read/update inquiry endpoints require an admin JWT.

## Auth Endpoints

- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`

Login response includes a JWT. Send it on protected routes:

```txt
Authorization: Bearer <token>
```

Seeded local admin credentials:

```txt
Email: admin@beyondsea.com
Password: Admin123!
```

Protected inquiry routes:

- `GET /api/inquiries`
- `GET /api/inquiries/:type/:id`
- `PATCH /api/inquiries/:type/:id/status`

### Contact Inquiry

```json
{
  "fullName": "John Smith",
  "email": "john@example.com",
  "whatsapp": "+49123456789",
  "country": "Germany",
  "inquiryType": "Custom Tour",
  "message": "I want to plan a 10 day Sri Lanka trip."
}
```

### Tour Inquiry

```json
{
  "fullName": "Anna Muller",
  "email": "anna@example.com",
  "whatsapp": "+49123456789",
  "country": "Germany",
  "tourSlug": "sri-lanka-7-day-escape",
  "tourTitle": "Sri Lanka 7 Day Escape",
  "travelDate": "2026-08-15",
  "passengerCount": 4,
  "message": "Please send me the full quote."
}
```

### Custom Tour Inquiry

```json
{
  "fullName": "David Lee",
  "email": "david@example.com",
  "whatsapp": "+86123456789",
  "country": "China",
  "travelDate": "2026-09-10",
  "duration": "14 Days",
  "budget": "Luxury",
  "passengerCount": 2,
  "destinations": ["Sigiriya", "Kandy", "Ella", "Mirissa"],
  "interests": ["Culture", "Beaches", "Wildlife"],
  "message": "We want a private honeymoon tour."
}
```

### Transfer Inquiry

```json
{
  "fullName": "Sarah Wilson",
  "email": "sarah@example.com",
  "whatsapp": "+44123456789",
  "country": "United Kingdom",
  "travelDate": "2026-07-20",
  "pickupLocation": "Colombo",
  "dropoffLocation": "Galle",
  "passengerCount": 4,
  "estimatedVehicle": "SUV",
  "estimatedPrice": 207,
  "distanceKm": 120,
  "message": "We need airport-style luggage space."
}
```
