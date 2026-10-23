# Mastery Checklist

Check an item only after you can demonstrate it, not just because you read the chapter.

## Foundations
- [ ] 01 — Explain authentication vs. authorization; draw a login flow.
- [ ] 02 — Explain requests, responses, headers, status codes, and cookies.
- [ ] 03 — Explain origin, SOP, XSS, CSRF, and browser trust boundaries.
- [ ] 04 — Model users, credentials, sessions, verification tokens, and audit events.

## Credentials and login
- [ ] 05 — Explain why passwords need a password-hashing algorithm, not plaintext or reversible encryption.
- [ ] 06 — Design registration and verification with expiring, single-use tokens.
- [ ] 07 — Test login failures, throttling, generic errors, and session rotation.

## Sessions and tokens
- [ ] 08 — Trace a server-side session and explain cookie attributes.
- [ ] 09 — Explain JWT claims, signature verification, expiry, issuer, audience, and trade-offs.
- [ ] 10 — Explain refresh-token rotation, reuse detection, and revocation.

## Access control and recovery
- [ ] 11 — Enforce ownership and tenant boundaries on the server.
- [ ] 12 — Design recovery without leaking account existence.
- [ ] 13 — Compare TOTP, WebAuthn/passkeys, and recovery codes.

## Federated identity
- [ ] 14 — Distinguish OAuth authorization from OpenID Connect authentication.
- [ ] 15 — Trace authorization code + PKCE and explain state/nonce validation.

## Application engineering
- [ ] 16 — Restore frontend auth state safely; don't rely on UI route guards for security.
- [ ] 17 — Test positive, negative, boundary, and abuse cases.
- [ ] 18 — Write a threat model with assets, actors, trust boundaries, and mitigations.
- [ ] 19 — Explain secret handling, logs, monitoring, and incident response.
- [ ] 20 — Demonstrate the capstone and defend its security decisions.

## Final teach-back
- [ ] I can explain the whole system without reading notes.
- [ ] I can show where authentication and authorization decisions are made.
- [ ] I can demonstrate that users cannot read or modify each other's resources.
- [ ] I can explain remaining limitations and risks.
