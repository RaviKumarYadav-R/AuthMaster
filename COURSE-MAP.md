# AuthMaster — Course Map

This is the high-level navigation page. For the detailed syllabus, lesson structure, and mastery gates, see the [chapter-by-chapter learning and teaching path](docs/35-chapter-by-chapter-learning-and-teaching-path.md) and [course blueprint](docs/34-course-blueprint.md).

## Stage 1 — Foundations

**Goal:** Understand the identity problem and how a browser communicates with a server.

1. [Authentication fundamentals](docs/02-authentication-fundamentals.md)
2. [HTTP and browser security](docs/03-http-browser-security.md)
3. [Identity and Authentication chapter](01-Authentication-Fundamentals/01-Identity-and-Authentication/README.md)
4. [HTTP and Request Lifecycle chapter](01-Authentication-Fundamentals/02-HTTP-and-Request-Lifecycle/README.md)

Mastery gate: explain the difference between identity, authentication, and authorization; trace a request; explain why CORS is not authentication.

## Stage 2 — Passwords, registration, and sessions

**Goal:** Understand credentials and server-managed login state.

1. [Password security](docs/04-password-security.md)
2. [Password Security chapter](01-Authentication-Fundamentals/03-Password-Security/README.md)
3. [Registration and Validation chapter](01-Authentication-Fundamentals/04-Registration-and-Validation/README.md)
4. [Session authentication](docs/05-session-authentication.md)
5. [Server-Side Sessions chapter](01-Authentication-Fundamentals/05-Server-Side-Sessions/README.md)
6. [Cookies, CSRF, and CORS chapter](01-Authentication-Fundamentals/06-Cookies-CSRF-and-CORS/README.md)

Mastery gate: explain password hashing, session identifiers, cookie attributes, session expiry, logout, and CSRF defenses.

## Stage 3 — Middleware and access control

**Goal:** Enforce identity and permissions at the server boundary.

1. [Authentication Middleware chapter](01-Authentication-Fundamentals/07-Authentication-Middleware/README.md)
2. [Authorization and Tenant Isolation chapter](01-Authentication-Fundamentals/08-Authorization-and-Tenant-Isolation/README.md)
3. Review the [security review checklist](checklists/security-review.md).

Mastery gate: show that a user cannot access another user's resource by changing an ID, and prove the server denies unauthorized requests.

## Stage 4 — JWT and token lifecycle

**Goal:** Understand token structure, validation, expiration, rotation, and revocation.

1. [JWT and tokens](docs/06-jwt-and-tokens.md)
2. [Refresh tokens](docs/07-refresh-tokens.md)
3. [JWT deep-dive materials](docs/)

Mastery gate: explain why decoding a JWT is not verification; validate issuer, audience, signature, and expiry; describe refresh-token rotation and replay detection.

## Stage 5 — Frontend integration and account lifecycle

**Goal:** Connect the backend to a client without treating frontend state as a security boundary.

Study the React integration, database design, account verification, password recovery, and MFA topics in the [detailed course blueprint](docs/34-course-blueprint.md) and [chapter-by-chapter path](docs/35-chapter-by-chapter-learning-and-teaching-path.md).

Mastery gate: explain reload behavior, expired sessions, account recovery risks, and backend-enforced permissions.

## Stage 6 — OAuth 2.0, OpenID Connect, MFA, and passkeys

**Goal:** Understand delegated authorization and federated identity.

Study the relevant chapters through the [chapter-by-chapter path](docs/35-chapter-by-chapter-learning-and-teaching-path.md) and verify protocol details against the [official resources index](resources/README.md).

Mastery gate: explain Authorization Code + PKCE, state, nonce, issuer, audience, and identity-token validation.

## Stage 7 — Testing, operations, and capstone

**Goal:** Demonstrate security properties with evidence and understand production constraints.

- [Security review checklist](checklists/security-review.md)
- [Production security gates](checklists/production-security-gates.md)
- [Advanced scenario exercises](exercises/advanced-scenarios.md)
- [Capstone project](docs/31-capstone-auth-service.md)
- [Step-by-step API build](docs/33-build-auth-api-step-by-step.md)
- [Official references](resources/README.md)

Mastery gate: produce a threat model, automated tests for failure cases, architecture diagram, deployment notes, and a clear list of residual risks.

## Learning and teaching resources

- [Study method](docs/01-study-method.md)
- [Mastery checklist](checklists/mastery-checklist.md)
- [Lesson template](teaching/lesson-template.md)
- [Teach-back rubric](teaching/teach-back-rubric.md)
- [Flashcards](teaching/flashcards.md)
- [Quiz](teaching/quiz.md)
- [Progress tracker](PROGRESS.md)

## Important rule

Do not copy a security example into a real application merely because it passes a happy-path test. Use maintained libraries, read the security notes, test negative cases, and seek a security review for production systems.
