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

## Deep dive: convert threats into evidence

### Scope and assets
List passwords, sessions, tokens, recovery secrets, personal data, tenant boundaries, signing keys, and administrative actions. Identify actors, entry points, third parties, trust boundaries, and assumptions. Threat modeling is a living record that should change with architecture and incidents.

### Threat-to-test method
For each threat, write the attacker capability, desired impact, control, and test. Example: a user changes a document ID to access another account's data. The test authenticates user A, requests user B's resource, expects denial, and confirms no mutation occurred.

### Testing layers
Use unit tests for pure validation/policy logic, integration tests for API plus persistence, browser tests for cookies/CORS/CSRF/redirects, abuse tests for rate limits and replay, and operational drills for key rotation and recovery. Passing tests show only the properties actually exercised.

### Risk register
Record likelihood, impact, existing controls, mitigation, owner, due date, verification evidence, and residual risk. Avoid unsupported claims that the service is secure solely because a test suite passes.

