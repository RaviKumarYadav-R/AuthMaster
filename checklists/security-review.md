# Security Review Checklist

Use this as a review aid, not as a substitute for a professional assessment.

## Credentials
- [ ] Passwords are hashed with a maintained password-hashing library.
- [ ] Passwords, hashes, tokens, and session IDs are never logged.
- [ ] Secrets are absent from Git history and frontend bundles.

## Sessions and tokens
- [ ] Session identifiers rotate after authentication and privilege changes where appropriate.
- [ ] Logout invalidates server-side state and clears the cookie.
- [ ] Cookie flags and CSRF protections match the deployment architecture.
- [ ] JWT verifier enforces algorithm and relevant claims.
- [ ] Refresh tokens are protected, rotated, expired, and revocable.

## Access control
- [ ] Every protected endpoint checks authorization server-side.
- [ ] Resource ownership and tenant boundaries are tested.
- [ ] Admin-only actions cannot be invoked by changing client data.

## Recovery and operations
- [ ] Reset and verification tokens expire and can be used only once.
- [ ] Login and recovery endpoints are rate-limited.
- [ ] Errors do not expose sensitive internals.
- [ ] HTTPS, monitoring, dependency updates, and incident response are planned.
- [ ] Negative tests cover expired, revoked, malformed, and unauthorized requests.
