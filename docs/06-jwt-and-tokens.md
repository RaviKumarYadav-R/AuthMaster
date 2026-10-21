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
