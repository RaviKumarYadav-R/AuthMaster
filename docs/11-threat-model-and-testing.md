# 11 — Threat Modeling and Security Testing

## Assets and trust boundaries

Assets include passwords, sessions, refresh credentials, recovery tokens, personal data, roles, and tenant boundaries. Trust boundaries include browser/server, server/database, app/identity provider, and tenant/resource boundaries.

## Threats to model

- Brute force and credential stuffing
- Session fixation and hijacking
- XSS and CSRF
- Token theft and replay
- Account enumeration
- Weak recovery flows
- Broken object-level authorization
- Privilege escalation
- Secret leakage in logs or reports
- Rate-limit bypass across instances
- Race conditions in refresh-token rotation

## Minimum test matrix

| Scenario | Expected property |
|---|---|
| Wrong password | No authenticated state is created |
| Missing/invalid session | Protected endpoint rejects request |
| Expired/revoked session | Access is denied |
| User changes resource ID | Ownership rule still enforced |
| Reused reset token | Rejected |
| Reused rotated refresh token | Detection policy executes |
| Excessive login attempts | Rate limit activates |
| Malformed input | Validation rejects safely |
| Disabled account | Protected actions are denied |
| Unexpected JWT algorithm | Token rejected |
| Cross-origin request | CORS and CSRF policy behaves as intended |

## Operational practices

Use structured logs without credentials; keep secrets in a secret manager or deployment environment; monitor unusual authentication patterns; update dependencies; prepare a response plan for credential leakage; test deployed cookie and TLS behavior, not only local development.
