# 12 — Production Authentication Architecture

## Design before code

Document client types, threat model, identity provider, session/token model, data store, revocation behavior, recovery process, MFA requirements, and operational ownership. Choose the simplest architecture that meets the threat model.

## Configuration and secrets

Validate required environment variables at startup. Keep secrets out of source control, logs, client bundles, and error messages. Rotate credentials using a documented process. Use separate secrets and databases across environments.

## Deployment checklist

- HTTPS everywhere; secure cookies in production.
- Persistent session/token storage with expiry and cleanup.
- Rate limiting appropriate to distributed deployment.
- Input validation and safe error handling.
- CSRF and CORS policies reviewed for the actual origin topology.
- Authorization checks on every protected server operation.
- Structured monitoring that excludes credentials.
- Dependency and secret scanning.
- Backup, incident-response, and credential-revocation procedures.
- Tests for account disablement, recovery, logout, and privilege changes.

## Architecture decision record

For each major choice, record context, options considered, decision, security consequences, operational costs, and revisit conditions. Reassess after changes to client type, deployment topology, risk, or standards.

This educational project is not a certification of production readiness. Get an independent security review before deployment.

## Deep dive: production service boundaries

### Architecture map
Include browser/mobile client, edge proxy, application instances, database, session or token store, email provider, identity provider, secret manager, monitoring, and operators. For each connection document TLS, identity, authorization, timeout, retry, and failure behavior.

### Multi-instance concerns
In-memory sessions and rate limits are local to one process and disappear on restart. Multiple instances need suitable shared stores, consistent configuration, tested failover, and clear cleanup policies. Sticky sessions do not replace durable state or a revocation design.

### Operational readiness
Validate secrets at startup, use least-privilege database credentials, configure graceful shutdown, timeouts, health checks, dependency scanning, backups and restore drills, structured redacted logs, alert ownership, patch processes, and incident runbooks. Do not expose internal topology through health endpoints.

### Go/no-go exercise
Show evidence for session revocation, cross-user denial, secure recovery, rate-limit behavior, key rotation, backup restoration, and secret redaction. Record any missing control as a launch blocker or explicitly accepted residual risk; never label the lab production-ready without review.

