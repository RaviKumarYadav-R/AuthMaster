# Session Authentication API Lab

This is a small educational Express API for exploring registration, password hashing, server-side sessions, cookies, session rotation, current-user lookup, and logout. It is not a production-ready identity service.

## What this lab demonstrates

- Request validation with Zod
- Password hashing and verification with Argon2id
- MongoDB user persistence through Mongoose
- Server-side session middleware
- Session identifier regeneration after successful login
- HttpOnly, SameSite, and environment-dependent Secure cookie settings
- Baseline Helmet security headers
- Baseline in-memory rate limits for login and registration
- No-store caching headers for authentication routes
- Generic internal-server-error responses and bounded JSON bodies

## What it does not implement

- A production session store
- A complete CSRF protection strategy
- Distributed rate limiting and monitoring
- Email verification or password-reset flows
- MFA, passkeys, or external identity-provider integration
- Account disablement, session management UI, or audit-event system
- A complete browser/integration security test suite
- Environment-specific reverse-proxy, TLS, CORS, CSP, and deployment hardening

Read [SECURITY-NOTES.md](SECURITY-NOTES.md) before running or adapting the lab. Do not expose it to the public internet or use real credentials.

## Requirements

- Node.js 20 or newer
- MongoDB running locally or a development connection string
- A REST client that preserves cookies for the login session

## Setup

From this directory:

1. Copy the .env.example file to .env.
2. Generate a random session secret with this command:

   ```bash
   node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
   ```

3. Replace the placeholder SESSION_SECRET in .env with the generated output. Never commit .env.
4. Set MONGODB_URI to a local/development database.
5. Install dependencies:

   ```bash
   npm install
   ```

6. Start the API:

   ```bash
   npm run dev
   ```

7. In another terminal, check GET http://localhost:3000/health.
8. Follow [POSTMAN-EXAMPLES.md](POSTMAN-EXAMPLES.md).

## Routes

| Method | Path | Purpose | Authentication |
|---|---|---|---|
| POST | /auth/register | Create a user account | No |
| POST | /auth/login | Verify password and create a session | No |
| GET | /auth/me | Return the current safe profile | Valid session |
| POST | /auth/logout | Destroy the session and clear cookie | Session optional |
| GET | /health | Local process health check | No |

## Expected flow

1. Register a synthetic test account.
2. Login using the same test account.
3. Inspect the response's Set-Cookie header in your local REST client.
4. Call /auth/me with the cookie jar enabled.
5. Logout.
6. Call /auth/me again and expect 401.
7. In an isolated test client, replay the old cookie and verify server-side invalidation.

Never paste a live cookie into GitHub issues, screenshots, chat, or logs.

## Tests

Run:

```bash
npm test
```

The current automated tests cover credential-input validation only. They do **not** prove the whole login/session/logout flow is secure. Follow [the test plan](test/README.md) before treating the lab as complete.

## Rate-limit note

The included express-rate-limit configuration uses the default in-memory store. It is useful for demonstrating a baseline but does not coordinate limits across multiple app instances and is not a complete abuse-prevention system. Production needs a suitable shared store, proxy/IP configuration review, monitoring, and policy tuning.

## Cookie and CSRF note

The lab uses HttpOnly and SameSite=Lax cookies and sets Secure when NODE_ENV=production. This is not a complete CSRF defense for every deployment topology. Add and test a deliberate CSRF strategy before using cookie-authenticated state-changing routes in a real application.

## Troubleshooting

- **Startup says SESSION_SECRET is invalid:** replace the placeholder with at least 32 bytes of random data.
- **MongoDB connection fails:** confirm MongoDB is running and MONGODB_URI is correct.
- **Login returns 400:** verify JSON content type, valid email, and password length of 12–128 characters.
- **Login returns 401:** use the same password that was used during registration.
- **/auth/me returns 401 after login:** make sure your client preserves and sends the cookie.
- **Cookie is not sent in production:** verify HTTPS, Secure, domain, SameSite, and reverse-proxy configuration rather than weakening attributes blindly.

## Before real deployment

Use a maintained persistent session store; configure TLS and trusted proxies; add a CSRF defense; use a shared rate-limit store; implement account recovery and verification; add integration and browser tests; configure safe logging, monitoring, and alerting; scan dependencies and secrets; and obtain an independent security review.
