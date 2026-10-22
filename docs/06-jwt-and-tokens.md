# 06 — JWTs and Token Authentication

## Structure

A compact signed JWT commonly has three Base64URL-encoded parts: `header.payload.signature`. A normal signed JWT is not encrypted. Do not place secrets or unnecessary sensitive data in its payload. Decoding is not verification.

## Important claims

- `sub`: subject
- `iss`: issuer
- `aud`: intended audience
- `exp`: expiration
- `iat`: issued-at time
- `nbf`: not-before time
- `jti`: token identifier

A verifier must enforce an allowed algorithm, validate signature and time constraints, and apply relevant issuer/audience/subject rules. Syntactic validity is not enough.

## Revocation trade-off

Self-contained tokens are not automatically revocable everywhere. Strategies include short lifetimes, server-side deny lists, token-version checks, or opaque tokens backed by server state. Each has costs.

## Do not assume

JWT means authentication is secure; payload is private; a decoded token is trustworthy; refresh tokens belong on every API; library defaults match your requirements.

## Exercise

Write a verification checklist before coding middleware: allowed algorithms, expiry, issuer, audience, error handling, and where the token is accepted.

## Deep dive: token validation policy

### Decode is not verification
Base64URL decoding reveals content; it does not prove who created the token or whether it has been altered. A signed JWT is generally readable and should not contain secrets merely because it is signed.

### Write the policy first
Specify token purpose, accepted algorithms, trusted key source, issuer, audience, subject, expiry, not-before time, required claims, acceptable clock skew, and any revocation/session-version check. Reject unexpected token types and missing required claims. Do not allow untrusted header fields to make arbitrary keys or URLs trusted.

### Key lifecycle
Document key generation, secure storage, distribution, rotation, overlap, retirement, and emergency compromise response. A key ID can select a key from an already trusted set; it must not turn an attacker-controlled key into a trusted one.

### Test matrix
Start with one valid token. Then independently test invalid signature, altered payload, expired token, future not-before, wrong issuer, wrong audience, unsupported algorithm, missing required claim, and token intended for another service. Every invalid case must fail closed.

