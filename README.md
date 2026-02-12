# Worker Management System (WMS)

Full-stack attendance management platform with worker, admin, and supervisor roles.

## Features

- Worker registration with auto-generated username (first name) and default password (`123456`).
- JWT auth with role-based access (`worker`, `admin`, `supervisor`).
- Worker attendance dashboard with responsive calendar (day/week/month views).
- Custom admin panel:
  - Manage workers
  - Mark slot-wise attendance
  - View/filter records
  - Download attendance PDF
  - Manage slots and groups
- Supervisor panel with restricted worker scope by assigned group.
- MongoDB Atlas integration with Mongoose models.
- Automatic attendance cleanup after 10 days (cron), with PDF export before deletion.

## Project Structure

- `backend/` Express + MongoDB API
- `frontend/` React + Vite UI

## Environment Variables

### Backend (`backend/.env`)

Copy from `backend/.env.example` and fill:

```bash
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/wms
JWT_SECRET=change_this_secret
```

### Frontend (`frontend/.env`)

Copy from `frontend/.env.example`:

```bash
VITE_API_URL=http://localhost:5000/api
```

## Run Locally

```bash
npm install
npm run install:all
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## Core API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET/POST/DELETE /api/admin/workers`
- `POST /api/admin/attendance`
- `GET /api/admin/records`
- `GET /api/admin/records/pdf`
- `POST/GET /api/admin/slots`
- `POST/GET /api/admin/groups`
- `GET /api/worker/attendance`
- `GET /api/supervisor/workers`
- `POST /api/supervisor/attendance`

## Deployment Notes

- Set secure environment variables in your cloud host.
- Serve frontend build via static hosting (Vercel/Netlify) and backend via Node host (Render/Railway/etc).
- Ensure MongoDB Atlas IP allowlist and credentials are configured.
