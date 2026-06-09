# Beyond Sea Travels Frontend

Next.js App Router frontend for the Beyond Sea Travels tourism platform.

## Environment

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

`NEXT_PUBLIC_API_URL` must point to the Express backend API. The local backend defaults to `http://localhost:5001/api`.

## Inquiry Flow

Customer-facing forms now save leads before opening WhatsApp:

```txt
User submits inquiry
Validate form
POST inquiry to backend
Save lead in Neon PostgreSQL
Open WhatsApp with the existing message
Show success state
```

Integrated forms:

- Contact page: `POST /api/inquiries/contact`
- Tour detail CTAs: `POST /api/inquiries/tour`
- Custom tour builder: `POST /api/inquiries/custom-tour`
- Transfer form: `POST /api/inquiries/transfer`

If the backend request fails, WhatsApp is not opened and the user sees an error message.

## Admin Dashboard

Admin routes:

- `/admin/login`
- `/admin/dashboard`
- `/admin/inquiries`

Seeded development credentials:

```txt
Email: admin@beyondsea.com
Password: Admin123!
```

The admin login stores the JWT in `localStorage`. Protected admin pages read the token and call:

- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/inquiries`
- `GET /api/inquiries/:type/:id`
- `PATCH /api/inquiries/:type/:id/status`

The dashboard shows total, new, contacted, confirmed, and cancelled inquiry counts from the live backend. The inquiry page provides type/status filters, a details modal, and inline status updates.

## Development

```bash
npm install
npm run dev
npm run lint
npm run build
```

The backend should be running before testing inquiry submissions:

```bash
cd ../backend
PORT=5001 npm run dev
```
