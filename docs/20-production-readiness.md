# 20 — Production Readiness Review

This checklist is a starting point, not certification. Authentication systems need review in the context of their users, data, deployment, and threat model.

## Identity lifecycle
- [ ] Registration, verification, login, logout, password change, and recovery are documented.
- [ ] Account disablement and deletion affect active sessions and tokens.
- [ ] Sensitive account changes require appropriate reauthentication.
- [ ] MFA enrollment and recovery are protected.
- [ ] External identity linking cannot silently link the wrong account.

## Credentials
- [ ] Passwords use a maintained password-hashing library and current cost settings.
- [ ] Session IDs and tokens are never logged.
- [ ] Secrets are not committed or exposed in frontend bundles.
- [ ] Credentials have defined expiry, rotation, and revocation behavior.
- [ ] Reset and verification tokens are high entropy, time-limited, and single-use.

## Browser and transport
- [ ] HTTPS is enforced in deployment.
- [ ] Cookies use deliberate Secure, HttpOnly, SameSite, Path, and Domain settings.
- [ ] CSRF protections match the actual browser topology.
- [ ] CORS uses an explicit origin policy.
- [ ] Security headers and CSP are reviewed.
- [ ] XSS prevention is treated as a separate requirement.

## Authorization
- [ ] Every protected API checks authorization on the server.
- [ ] Resource ownership and tenant boundaries are enforced.
- [ ] Admin privileges cannot be granted by client-supplied data.
- [ ] Sensitive operations are auditable.
- [ ] Authorization changes invalidate or refresh stale access where required.

## Reliability and operations
- [ ] Production session store is persistent and suitable for multiple instances.
- [ ] Rate limiting works across instances and has a documented policy.
- [ ] Dependency and secret scanning are enabled where appropriate.
- [ ] Logs and telemetry redact credentials and personal data.
- [ ] Monitoring covers unusual failures, login spikes, reset abuse, and provider outages.
- [ ] Incident response includes revocation and notification decisions.
- [ ] Backup and recovery procedures are tested.
- [ ] Dependency updates and key rotation have owners.

For each checked item, record configuration, test, or review evidence. An unchecked box should have an owner and remediation plan.

## Deep dive: production readiness evidence

### Security gates
Verify TLS and proxy behavior, persistent session/token storage, rotation and revocation, CSRF defenses, resource authorization, account recovery, safe errors, and redacted logs. Review CORS, CSP, cookie scope, cache headers, body limits, timeouts, and rate limits against the actual deployment.

### Operations gates
Confirm least-privilege database credentials, secret management and rotation, dependency scanning, patch ownership, monitoring and alert response, backup restoration, graceful shutdown, health checks, and documented retention/deletion policy.

### Evidence pack
Collect architecture and trust-boundary diagrams, threat model, API contracts, positive/negative test reports, dependency scan results, deployment review, restore/rotation drills, and a list of accepted residual risks with owners.

### Go/no-go questions
Can sessions be revoked quickly? Can accounts be recovered securely? Can cross-user access be proven denied? Can the team detect credential stuffing? Can secrets be rotated? Can backups be restored? If not, record the gap as a blocker or explicitly accepted risk; do not call the lab production-ready.

