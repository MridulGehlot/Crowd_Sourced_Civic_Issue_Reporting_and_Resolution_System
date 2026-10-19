# Crowd-Sourced Civic Issue Reporting and Resolution System

A MERN civic reporting portal. Citizens can report and track public issues, authorities can process assigned reports, and administrators can manage authority accounts.

## Current features

- Cookie-based JWT authentication with citizen, authority, and admin roles.
- Citizen registration, login, session restoration, logout, and protected routes.
- Public issue explorer with search, category/status filtering, pagination metadata, and privacy-safe details.
- Citizen issue creation and personal issue list.
- Authority assigned-issue queue with validated start-work, resolve, and reject actions.
- MongoDB-backed automatic assignment to the least-busy active authority.
- Environment-based API URL, CORS allowlist, cookie security, and health endpoint.

## Stack

- Backend: Node.js, Express, Mongoose, MongoDB, JWT, bcryptjs.
- Frontend: React, Vite, React Router, Zustand, Axios, Tailwind CSS.

## Local setup

Prerequisites: Node.js 20+, MongoDB, and PowerShell on Windows.

```powershell
cd backend
Copy-Item .env.example .env
npm install
npm run dev
```

In another PowerShell terminal:

```powershell
cd frontend/crowdsource
Copy-Item .env.example .env
npm install
npm run dev
```

The frontend defaults to `http://localhost:5173`; the API defaults to `http://localhost:5000`.

## Environment variables

Backend variables are documented in [backend/.env.example](backend/.env.example). `MONGO_URI` and `JWT_SECRET` must be supplied. Set `CORS_ORIGINS` to a comma-separated production frontend allowlist. For a cross-site HTTPS deployment, use `COOKIE_SAME_SITE=none` and HTTPS so the secure cookie is accepted.

Frontend uses `VITE_API_BASE_URL`, for example `https://api.example.com/api`. Never put backend secrets in `VITE_*` variables.

## Commands

```powershell
cd backend
npm start

cd frontend/crowdsource
npm run lint
npm run build
```

## API overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/issues` with `page`, `limit`, `search`, `category`, and `status`
- `GET /api/issues/:id`
- `POST /api/issues` for authenticated citizens
- `GET /api/issues/my` for citizens
- `GET /api/issues/assigned` for authorities
- `PATCH /api/issues/:id/status` for assigned authorities and admins
- `GET /api/departments`, `POST /api/departments`
- `GET /api/admin/authorities`, `POST /api/admin/authorities`
- `GET /health`

Successful responses use `{ success, statusCode, message, data }`. Issue list responses put records in `data.items` and metadata in `data.pagination`.

## Deployment checklist

1. Provision MongoDB Atlas and restrict network access.
2. Set backend `MONGO_URI`, a strong `JWT_SECRET`, `NODE_ENV=production`, `CORS_ORIGINS`, and cookie settings.
3. Deploy the backend with the provider-assigned `PORT` and verify `/health`.
4. Set frontend `VITE_API_BASE_URL` to the deployed API path and run `npm run build`.
5. Configure SPA fallback to `index.html` for React Router deep links.
6. Test login, refresh/session restoration, logout, issue creation, authority transitions, and cross-origin cookies over HTTPS.

## Known limitations

- Image upload is currently URL-field based; a Cloudinary/object-storage integration and file validation still need to be supplied before production image uploads.
- Citizen feedback/rating, dashboard aggregation endpoints, department editing/deactivation, and automated backend/frontend test suites are not yet implemented.
- The existing admin UI is still incomplete; the admin APIs remain available but require a management screen.

Do not use production data while manually testing. No real credentials belong in this repository.
