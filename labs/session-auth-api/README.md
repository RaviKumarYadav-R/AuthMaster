# Session Authentication API Lab

A small educational Express API for exploring registration, login, server-side sessions, `/auth/me`, and logout. It is a learning lab, not a production-ready identity service.

## Requirements
- Node.js 20+
- MongoDB running locally or a development connection string

## Setup
1. Copy `.env.example` to `.env`.
2. Set a long random `SESSION_SECRET` and a valid `MONGODB_URI`.
3. Run `npm install`.
4. Start with `npm run dev`.
5. Use a REST client that preserves cookies.

## Routes
- `POST /auth/register` — create an account
- `POST /auth/login` — verify credentials and establish a session
- `GET /auth/me` — return the authenticated user's safe profile
- `POST /auth/logout` — invalidate session and clear cookie

## Learning tasks
Test duplicate registration, incorrect passwords, missing fields, login session regeneration, anonymous `/auth/me`, logout, and replay of the old cookie. Inspect cookie flags. Add CSRF defenses and rate limiting before considering any deployment.

## Safety notes
The default development session store is not suitable for production. Configure HTTPS, secure cookies, a persistent session store, CSRF protections, rate limiting, and logging without credentials before deployment. Obtain an independent security review.
