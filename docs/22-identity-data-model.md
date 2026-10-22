# 22 — Identity Data Model and Lifecycle

A database schema is part of the security architecture. Store only what is needed and define relationships among accounts, sessions, identities, and recovery credentials.

## Minimal user record
A simple learning application may store a stable internal user ID, normalized login identifier, password hash when password authentication is enabled, account status, timestamps, and verification/security metadata. Do not store plaintext passwords or return authentication secrets in ordinary profile responses.

A unique index should enforce identifier uniqueness at the database layer; an application-level pre-check alone is vulnerable to races.

## Sessions
A session record commonly includes a store-specific key, user ID, creation/last-activity time, expiry, and optional security context. Never treat a browser-supplied user ID as authoritative.

## External identities
For OIDC, use the validated issuer and subject pair as the stable external identity key. Email can change and may not be verified. Account linking must require proof of control and prevent linking an attacker-controlled provider identity to another person's local account.

## Recovery tokens
Store a hash of a high-entropy token where practical, plus user ID, purpose, expiry, used/revoked state, and creation metadata. Consume it atomically so simultaneous requests cannot redeem it twice.

## Data integrity
- Use database constraints for uniqueness.
- Handle duplicate-key errors.
- Use transactions or atomic updates for one-time token consumption and refresh rotation where needed.
- Define cleanup for expired sessions and tokens.
- Avoid returning internal database fields.
- Audit sensitive actions without storing secrets.

## Exercise
Draw collections/tables for users, sessions, external identities, reset tokens, and audit events. Label unique keys, sensitive fields, deletion behavior, and indexes. Explain how a disabled user loses access even if a session still exists.

## Deep dive: schema and lifecycle invariants

### Core entities
Depending on requirements, model User, Session, ExternalIdentity, RecoveryToken, MFAAuthenticator, AuditEvent, Tenant, and Membership. Each entity should represent a real lifecycle or policy requirement rather than being added without purpose.

### Invariants
- Identifier normalization is consistent across registration and login.
- Password hashes never appear in ordinary profile responses.
- External identity uniqueness uses issuer plus subject, not email alone.
- Recovery tokens are purpose-bound, expire, and can be consumed only once.
- Sessions/tokens have clear expiry and revocation behavior.
- Tenant-scoped queries cannot cross the authenticated tenant boundary.
- Audit events exclude passwords and bearer secrets.

### Database design
Use unique indexes for uniqueness and handle duplicate-key races. Use transactions or atomic conditional updates for one-time token redemption and refresh rotation. Plan expiry cleanup, indexes, retention, deletion, backup, and restore behavior.

### Exercise
Draw an ER diagram, mark sensitive fields, and state which invariant is enforced by schema, index, transaction, middleware, or service policy. Add a test for each security-relevant invariant.

