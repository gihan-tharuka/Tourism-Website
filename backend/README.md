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
PORT=5001
FRONTEND_URL=http://localhost:3000
DATABASE_URL="postgresql://USER:PASSWORD@HOST/neondb?sslmode=require"
DIRECT_URL="postgresql://USER:PASSWORD@DIRECT_HOST/neondb?sslmode=require&channel_binding=require"
JWT_SECRET="replace-with-long-random-secret"
JWT_EXPIRES_IN=7d
```

`FRONTEND_URL` controls the CORS origin. `DATABASE_URL` is used by Prisma Client at runtime. `DIRECT_URL` is used by Prisma migrations.

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
