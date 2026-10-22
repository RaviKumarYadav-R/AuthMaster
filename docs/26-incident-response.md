# 26 — Authentication Incident Response

Prepare a response before a credential incident occurs. Actions depend on evidence, user impact, legal obligations, and system architecture.

## Possible incidents
- Session IDs or refresh tokens exposed in logs
- Password database exfiltration
- Signing key or client secret leakage
- OAuth redirect/configuration abuse
- Account takeover through recovery
- Mass credential stuffing
- Broken object-level authorization
- Identity provider outage or compromise

## Response phases

### 1. Triage
Record detection time, affected systems, indicators, and coordinator. Preserve relevant evidence while avoiding unnecessary copying of credentials or personal data.

### 2. Contain
Depending on the incident, disable affected routes, revoke compromised sessions/tokens, rotate exposed secrets or signing keys, apply temporary rate limits, block malicious automation, or disable vulnerable recovery paths. Consider availability and the risk of locking out legitimate users.

### 3. Investigate
Determine affected credential types, users, services, time periods, and data. Review redacted logs, audit events, deployment changes, and provider alerts. Lack of logs does not prove there was no compromise.

### 4. Recover
Patch the root cause, rotate credentials safely, invalidate sessions or token families as appropriate, restore service, and validate fixes with regression tests and independent review.

### 5. Communicate and learn
Follow applicable legal, contractual, and organizational notification requirements. Record root cause, contributing factors, detection gaps, and action owners.

## Preparation checklist
- [ ] Know how to revoke sessions and refresh-token families.
- [ ] Know how to rotate signing keys and provider secrets.
- [ ] Keep an inventory of credentials and their owners.
- [ ] Keep incident contacts and escalation steps current.
- [ ] Ensure logs support investigation without storing secrets.
- [ ] Rehearse a simulated credential leak.

## Deep dive: identity incident playbooks

### First priorities
Establish scope, preserve useful evidence, contain affected credentials or keys, assess data exposure, and communicate through the incident process. Never copy stolen tokens or passwords into tickets or chat. Follow applicable privacy, legal, and notification requirements.

### Playbooks
- Password database exposure: protect the database, assess hash parameters, decide on resets, revoke sessions where justified, and monitor credential stuffing.
- Session theft: revoke affected sessions, investigate logging/delivery paths, and assess XSS or device compromise.
- Refresh-token replay: identify the token family, revoke according to policy, require reauthentication, and investigate client/storage exposure.
- Signing-key compromise: remove trust in the key, rotate safely, invalidate affected tokens, and verify all services updated configuration.
- Recovery abuse: invalidate outstanding recovery tokens, notify affected users where appropriate, and strengthen rate controls.

### Evidence and recovery
Keep timestamps, request IDs, event categories, and actions while redacting secrets. Define decision owners, customer communication, restoration criteria, and a post-incident review with owners and deadlines.

### Tabletop exercise
A refresh token appears in logs. Identify containment steps, log sources, revocation mechanism, user impact, and a regression test that prevents recurrence.

