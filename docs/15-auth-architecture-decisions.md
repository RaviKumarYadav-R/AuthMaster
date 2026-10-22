# 15 — Choosing an Authentication Architecture

There is no universally best authentication architecture. Choose based on client type, trust boundaries, deployment topology, revocation needs, and operational risk.

## Decision questions

1. Is the client a same-site web app, cross-site SPA, mobile app, CLI, or service-to-service client?
2. Can the backend maintain server-side session state?
3. Must logout or account disablement invalidate access immediately?
4. Are multiple APIs consuming credentials?
5. What are the consequences of credential theft?
6. Who operates the identity system and handles incidents?
7. Would an established identity provider be safer than custom authentication?

## Common patterns

### Server-side session
The browser receives an opaque cookie; the backend validates it against server-side state. This is a useful first learning model for a traditional web app. Production needs a persistent store and careful cookie/CSRF configuration.

### Backend-for-Frontend (BFF)
A server component holds provider tokens and gives the browser a session cookie. This can reduce OAuth-token exposure to browser JavaScript, but adds infrastructure and does not eliminate XSS or CSRF risk.

### OAuth/OIDC with a managed provider
A provider handles complex identity protocols, recovery, MFA, and federation. The application still must validate provider responses, map identities safely, and enforce local authorization.

### API bearer tokens
Useful when clients need explicit credentials, but requires deliberate storage, audience/scope validation, expiry, and revocation. Do not copy a browser design blindly into mobile or service clients.

## Sessions vs JWTs

| Concern | Server-side session | Self-contained signed JWT |
|---|---|---|
| Server state | Usually required | May be reduced, not eliminated |
| Immediate revocation | Straightforward when store is checked | Needs short lifetime or server-side checks |
| Payload privacy | Session ID should be opaque | Signed payload is generally readable |
| Distributed services | Shared session store or routing design | Distributed validation if keys and claims are handled correctly |
| Authorization freshness | Can consult current state | Claims may become stale |
| Operational burden | Store availability, cleanup, scaling | Key management, claim validation, rotation, revocation |
| Common failure | MemoryStore in production; fixation | Weak validation; decode mistaken for verification |

## Decision record template

- **Context:** clients, resources, risks, deployment constraints
- **Options:** realistic alternatives
- **Decision:** what was selected and why
- **Security consequences:** risks reduced and introduced
- **Operational consequences:** monitoring, rotation, scaling, incident response
- **Revisit when:** future changes that invalidate the decision

Prefer the simplest established design that meets the threat model. Use a maintained identity provider when protocol complexity exceeds the team's ability to operate custom authentication safely.
