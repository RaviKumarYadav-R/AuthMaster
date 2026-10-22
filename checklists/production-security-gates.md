# Production Security Gates

Treat a checked box as requiring evidence—a test, configuration, runbook, or review—not merely an assertion.

## Identity and credentials

- [ ] Passwords use a maintained password-hashing library with an approved configuration.
- [ ] Passwords are not logged, emailed, reversibly encrypted for display, or silently truncated.
- [ ] Identifier normalization is consistent across registration, login, and recovery.
- [ ] Database uniqueness constraints protect identifiers under concurrency.
- [ ] Public responses do not unnecessarily reveal account existence.
- [ ] Login and recovery abuse controls are layered and monitored.

## Sessions and tokens

- [ ] Session IDs and random tokens use a cryptographically secure generator.
- [ ] Cookies use Secure, HttpOnly, and a deliberate SameSite/Path/Domain/expiry policy.
- [ ] Session IDs rotate after authentication and relevant privilege changes.
- [ ] Server-side idle and absolute expiration are enforced.
- [ ] Logout and revocation invalidate server-side credentials.
- [ ] JWT validation checks algorithm policy, signature, issuer, audience, expiry, token type, and required claims.
- [ ] Refresh-token rotation and reuse detection are atomic under concurrency.
- [ ] Tokens and reset links are absent from logs and analytics.

## Browser and API boundaries

- [ ] Unsafe cookie-authenticated actions have a documented CSRF defense.
- [ ] CORS uses an explicit origin allowlist and is not treated as authorization.
- [ ] State changes do not occur through GET.
- [ ] Sensitive responses have appropriate cache policies.
- [ ] Server-side schemas are narrow and resist mass assignment.
- [ ] Authentication and authorization failures are handled consistently.

## Authorization and tenant isolation

- [ ] Every protected operation has a documented policy.
- [ ] Object lookups enforce ownership and tenant constraints.
- [ ] Client-provided role, owner, tenant, and verification fields are not trusted.
- [ ] List, search, export, download, nested, and bulk endpoints are reviewed.
- [ ] Admin and service identities follow least privilege.
- [ ] Negative tests cover cross-user and cross-tenant access.

## Operations

- [ ] Production secrets are managed outside committed files.
- [ ] Key rotation and emergency revocation are documented and tested.
- [ ] Required production configuration is validated at startup.
- [ ] Logs are structured, redacted, access-controlled, and appropriately retained.
- [ ] Alerts cover unusual login failures, credential stuffing, replay, and privileged changes.
- [ ] Dependency outages fail safely.
- [ ] Backups, restoration, and incident-response steps are exercised.
- [ ] The application has a threat model and known residual-risk list.

For every unchecked item, record owner, risk, mitigation, target date, and whether deployment is blocked. This checklist is not a certification and cannot replace a threat model or independent review.
