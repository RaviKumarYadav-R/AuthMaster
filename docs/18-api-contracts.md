# 18 — Authentication API Contracts

An API contract defines what clients may send, what the server guarantees, and how failures are represented. It is not a substitute for server-side security checks.

## Example learning-lab routes

### POST /auth/register
Request JSON:
~~~json
{ "email": "learner@example.com", "password": "a-long-unique-demo-password" }
~~~
Expected success: 201 Created with a safe user profile. Never return a password hash, session secret, or internal database details.

Possible failures: 400 invalid input; 409 duplicate account according to lab policy; 429 rate limit. A production service may choose responses to reduce account enumeration.

### POST /auth/login
Send email and password over HTTPS. On success, rotate/create the server-side session and return a safe profile. A cookie is set by the server. Do not return the password or hash.

Possible failures: 400 invalid format; 401 invalid credentials; 429 rate limit.

### GET /auth/me
Requires a valid session. Returns only profile fields the client needs. Missing, expired, revoked, or invalid session must not grant access.

### POST /auth/logout
Invalidates server-side session state and clears the browser cookie with matching attributes. Replay of the old session identifier must fail.

## Status-code semantics

- **400 Bad Request:** request cannot be accepted due to invalid input.
- **401 Unauthorized:** authentication is missing or invalid.
- **403 Forbidden:** authenticated principal is not allowed to perform the action; some APIs use generic responses to avoid disclosure.
- **404 Not Found:** resource absent, or deliberately concealed when policy requires.
- **409 Conflict:** conflicts with current state, such as duplicate registration.
- **429 Too Many Requests:** rate limit reached.
- **500 Internal Server Error:** unexpected failure; response must not expose stack traces or secrets.

## Contract rules

- Validate type, length, and format on the server.
- Bound request body size.
- Use stable response shapes.
- Return safe error messages.
- Do not treat frontend validation as security.
- Never trust user IDs, roles, tenant IDs, or ownership claims from client input.
- Document cookie behavior and CSRF expectations.
- Add tests for success and failure status codes.

## Deep dive: specify endpoints before handlers

For every endpoint document method, path, authentication requirement, CSRF requirement, input schema, success status/body, failure status/body, rate limit, state changes, and audit event. Keep response shapes predictable and never return password hashes, private tokens, or stack traces.

### Example contract

```http
POST /auth/login
Content-Type: application/json

{"email":"learner@example.com","password":"synthetic-demo-password"}
```

A successful response might be HTTP 200 with a safe user profile and Set-Cookie. Invalid credentials should use the documented generic failure response. Malformed JSON, invalid input, and rate limiting should have distinct documented behavior without leaking internals.

### API quality rules
Validate on the server even if the frontend also validates. Bound body sizes, use consistent content types, define retry/idempotency behavior, and enforce authorization on every protected resource. Write contracts before implementation and convert each contract row into a positive and negative test.

