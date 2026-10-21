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
