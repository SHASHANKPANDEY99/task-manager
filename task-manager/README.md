# Task Management App (Next.js 14 + MongoDB)

A minimal, production-ready Task Manager built with Next.js App Router, MongoDB (Mongoose), JWT auth (httpOnly cookies), TailwindCSS, and SWR.

## Features
- Email+password auth with bcrypt hashing
- JWT in httpOnly cookies
- CRUD tasks with ownership checks
- Search + status filter + pagination
- Loading and error states
- Clean Tailwind UI
- SWR with optimistic updates (bonus)

## Stack
- Next.js 14 (App Router)
- MongoDB Atlas (Mongoose)
- JWT (jsonwebtoken) + cookies
- TailwindCSS
- SWR

## Env
Create `.env.local`:
```
MONGODB_URI=...
JWT_SECRET=...
NODE_ENV=development
```

## Run
```
npm install
npm run dev
```
Open http://localhost:3000

## Deploy (Vercel + MongoDB Atlas)
1. Push repo to GitHub
2. Import to Vercel → set env vars (MONGODB_URI, JWT_SECRET, NODE_ENV=production)
3. Deploy

## API
- POST `/api/auth/register` { email, password }
- POST `/api/auth/login` { email, password }
- POST `/api/auth/logout`
- GET `/api/tasks?search=&status=&page=&limit=`
- POST `/api/tasks` { title, description, status }
- GET `/api/tasks/:id`
- PATCH `/api/tasks/:id`
- DELETE `/api/tasks/:id`

## Notes
- `middleware.ts` protects `/dashboard`; APIs validate token per request.
- Cookies use `secure` in production.
- Keep `JWT_SECRET` strong and private.
