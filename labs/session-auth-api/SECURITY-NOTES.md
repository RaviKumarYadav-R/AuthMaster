# Security Notes for the Learning Lab

This project demonstrates a small authentication flow for learning. It is intentionally not production-ready and has not undergone an independent security audit.

## Controls currently demonstrated

- Argon2id password hashing through a maintained library
- Server-side sessions and session identifier regeneration after login
- HttpOnly and SameSite=Lax cookie settings; Secure cookies when NODE_ENV is production
- Helmet security headers
- Cache-Control: no-store on authentication routes
- Baseline in-memory rate limits for login and registration
- Bounded JSON request bodies and generic internal error responses
- Startup validation for a sufficiently long, non-placeholder session secret

These controls are teaching examples, not proof of production readiness.

## Known limitations

- The default express-session MemoryStore is not suitable for production.
- Rate limits use an in-memory store and do not coordinate across multiple instances.
- The example does not implement a complete anti-CSRF token strategy. SameSite is defense-in-depth, not a guarantee for every architecture.
- Email verification, password reset, MFA, passkeys, account disablement, audit events, and account deletion are not implemented.
- Session lifetime and revocation policy are minimal.
- The lab does not include full route integration tests or real-browser security tests.
- Proxy/TLS, CORS, CSP, monitoring, and deployment settings have not been hardened for a specific hosting environment.
- The lab has not been independently audited.

## Before adapting it

1. Use a persistent, maintained session store.
2. Use a shared rate-limit store and configure trusted proxy/IP handling correctly.
3. Implement CSRF protection based on the actual client topology.
4. Add account lifecycle, verification, and recovery controls.
5. Enforce authorization on every resource route.
6. Validate cookie, TLS, proxy, CORS, cache, and security-header configuration in the deployed environment.
7. Add route integration and browser security tests.
8. Add structured monitoring and redaction without storing credentials.
9. Run dependency and secret scanning.
10. Obtain an independent security review appropriate to the system's risk.

Never use real user passwords or production credentials in this lab. Do not expose it to the public internet.
