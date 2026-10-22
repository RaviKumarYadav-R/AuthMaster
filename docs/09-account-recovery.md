# 09 — Verification and Account Recovery

Recovery endpoints are authentication endpoints. Weak recovery can bypass otherwise strong login controls.

## Email verification

Generate a high-entropy, single-use, time-limited token. Store a hash of the token when practical. Bind it to the account and purpose. On redemption, validate expiry and unused status, then atomically mark it used. Avoid putting sensitive personal data in the URL token.

## Password reset

Return a response that does not unnecessarily reveal whether an account exists. Rate-limit requests. Deliver a short-lived token through a verified channel. Consume it once, invalidate outstanding reset tokens, update the password hash, and consider revoking existing sessions. Do not email passwords.

## Sensitive account changes

For changing email, password, MFA settings, or payout details, consider recent reauthentication, notification to the old verified channel, and an audit event. Protect against token replay and race conditions.

## Exercises

Threat-model a leaked reset link, expired token, token replay, email change, and account enumeration. Specify what sessions are revoked after a password reset.

## Deep dive: one-time recovery lifecycle

### Token generation and storage
Generate a high-entropy random token using a cryptographically secure generator. Store a digest plus subject, purpose, expiry, creation time, and consumed state. Do not store or log the raw token. Build links from a configured trusted origin, not an arbitrary Host header.

### Redemption
Validate the token's purpose, expiry, account state, and digest; atomically consume it; then update the password hash. Define transaction behavior so concurrent requests cannot redeem the same token twice. Decide whether active sessions are revoked and notify the account owner through a trusted channel.

### Abuse and account enumeration
Use generic responses for reset requests where revealing account existence creates risk. Rate-limit by account and network signals, prevent email flooding, and avoid logging reset URLs. Recovery must not be substantially weaker than the normal authentication path.

### Exercises
Test malformed, expired, consumed, wrong-purpose, and replayed tokens; concurrent redemption; delivery failure; database failure; and session revocation. Write down the expected state after every failure.

