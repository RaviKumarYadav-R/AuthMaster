# Security Notes for the Learning Lab

This project demonstrates a small flow for learning. It is intentionally not production-ready.

## Known limitations
- The default express-session MemoryStore is not suitable for production.
- Login and registration need rate limiting and abuse monitoring before exposure.
- The example does not implement a complete anti-CSRF token strategy. SameSite is defense-in-depth, not a guarantee for every architecture.
- Email verification, password reset, MFA, account disablement, audit events, and account deletion are not implemented.
- Session lifetime and revocation policy are minimal.
- Error logging is simplified; production logging needs structured redaction and monitoring.
- Proxy/TLS settings have not been hardened for a specific hosting environment.
- The example has not undergone an independent security audit.

## Before adapting it
1. Use a persistent, maintained session store.
2. Add distributed rate limiting and monitoring.
3. Implement CSRF protection based on the actual client topology.
4. Add account lifecycle and recovery controls.
5. Enforce authorization on every resource route.
6. Validate cookie, TLS, proxy, CORS, and security-header configuration.
7. Add route integration and browser security tests.
8. Run dependency/secret scanning and independent review.

Never use real user passwords or production credentials in this lab.
