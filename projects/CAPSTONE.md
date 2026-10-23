# Capstone — AuthMaster Identity Lab

Build a small local web application progressively as the chapters introduce each concept. This is an educational lab, not a production identity platform.

## Product goal
A user can register, verify an account in a local development workflow, sign in, view and edit their own profile, manage a session, request account recovery, and sign out. Later milestones add role checks, tenant ownership tests, and a frontend.

## Suggested stack
- Node.js LTS and Express
- MongoDB with Mongoose, or a database supported by a particular lab
- React for the frontend milestone
- Maintained password-hashing library, security middleware, and validation library
- Automated API tests with a maintained test runner

Do not implement cryptographic primitives yourself. Read the current documentation for chosen dependencies.

## Proposed structure
```text
authmaster-capstone/
  server/src/
    app.js
    server.js
    config/
    routes/
    controllers/
    services/
    repositories/
    middleware/
    validators/
    models/
  server/tests/
  client/src/
    api/
    auth/
    components/
    pages/
  docs/
    threat-model.md
    request-flows.md
```
This is a target structure, not a claim that the application code already exists.

## Milestones
1. **HTTP baseline:** health route, JSON validation, consistent error responses.
2. **Identity model:** user record and unique normalized identifier.
3. **Registration:** validate input and hash passwords with a maintained library.
4. **Verification:** high-entropy, expiring, single-use token; safe local-only delivery.
5. **Login:** verify credentials, use generic client-facing errors, throttle abuse, establish a fresh session.
6. **Session lifecycle:** cookie settings, expiry, rotation, logout, server-side invalidation.
7. **Authorization:** protect profile operations and prove users cannot access each other's records.
8. **Recovery:** expiring single-use reset flow; invalidate relevant sessions after reset.
9. **Frontend:** loading, authenticated, unauthenticated, and error states; server remains authoritative.
10. **Security tests:** malformed requests, duplicate registration, invalid credentials, expiry, replay, CSRF/XSS considerations, object-level authorization.
11. **Threat model and operations:** document secrets, logs, monitoring, backups, and incident response.

## Acceptance criteria
- No plaintext passwords or real secrets in source control.
- Protected routes reject unauthenticated requests.
- Every resource operation checks ownership and tenant policy on the server.
- Verification and recovery tokens expire and cannot be reused.
- Logout invalidates the server-side session or follows a documented revocation design.
- Automated tests cover success and denial cases.
- Threat model records assumptions and residual risks.

Use local synthetic accounts only. Production deployment requires a separate security review.
