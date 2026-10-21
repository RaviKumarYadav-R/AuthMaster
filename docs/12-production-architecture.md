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
