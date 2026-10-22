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
