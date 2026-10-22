# 00 — Complete Learning Map

This is the main route through AuthMaster. Read in order, but revisit chapters when a later implementation exposes a gap. The time estimates are flexible study suggestions, not guarantees.

## The full chapter index

| Chapter | Topic | Main outcome |
|---|---|---|
| [01 — Study method](01-study-method.md) | How to learn and teach | A repeatable learn/draw/build/test/teach routine |
| [02 — Fundamentals](02-authentication-fundamentals.md) | Identity, credentials, authentication, authorization | Explain the account lifecycle without code |
| [03 — HTTP and browser security](03-http-browser-security.md) | HTTP, HTTPS, cookies, browser storage, CORS, CSRF, XSS | Annotate a browser/server request |
| [04 — Password security](04-password-security.md) | Hashing, salts, work factors, abuse controls | Explain safe password storage |
| [05 — Sessions](05-session-authentication.md) | Login, session store, cookies, logout | Build and explain the session lab |
| [06 — JWT and tokens](06-jwt-and-tokens.md) | Claims, signing, validation, revocation | Review a token-validation design |
| [07 — Refresh tokens](07-refresh-tokens.md) | Rotation, reuse detection, concurrency | Diagram a refresh lifecycle |
| [08 — Authorization](08-authorization.md) | RBAC, ownership, tenant isolation | Prevent cross-user access |
| [09 — Recovery](09-account-recovery.md) | Verification, password reset, sensitive changes | Threat-model recovery |
| [10 — OAuth/OIDC](10-oauth-oidc.md) | Federation, identity, PKCE | Explain protocol roles |
| [11 — Threat modeling](11-threat-model-and-testing.md) | Assets, threats, negative tests | Produce a test matrix |
| [12 — Production architecture](12-production-architecture.md) | Configuration, secrets, operations | Write an architecture decision record |
| [13 — React integration](13-react-integration.md) | Auth context, loading, stale UI state | Build client state without trusting it for security |
| [14 — Glossary](14-glossary.md) | Precise vocabulary | Explain terms accurately |
| [15 — Architecture decisions](15-auth-architecture-decisions.md) | Sessions vs JWT, BFF, provider choice | Justify an architecture based on requirements |
| [16 — Cookies/CSRF/CORS](16-cookies-csrf-cors.md) | Browser request security | Explain which control solves which problem |
| [17 — Passwords/MFA/passkeys](17-passwords-mfa-passkeys.md) | Modern authenticators and recovery | Compare authentication strengths and risks |
| [18 — API contracts](18-api-contracts.md) | Routes, statuses, safe responses | Specify predictable API behavior |
| [19 — Testing strategy](19-testing-strategy.md) | Unit, integration, browser, operational tests | Test denied behavior and lifecycle transitions |
| [20 — Production review](20-production-readiness.md) | Readiness evidence | Prepare a review with proof for each control |
| [21 — Debugging](21-debugging-guide.md) | Cookie, CORS, session, JWT failures | Debug from evidence without leaking secrets |
| [22 — Identity data model](22-identity-data-model.md) | Users, sessions, external identities, recovery records | Draw a secure data model |
| [23 — Session deep dive](23-session-lifecycle-deep-dive.md) | Fixation, expiry, logout, store, proxy | Review a session lifecycle |
| [24 — JWT deep dive](24-jwt-validation-deep-dive.md) | Strict validation, key management, audience | Build a verifier checklist |
| [25 — OAuth/OIDC flow](25-oauth-oidc-flow.md) | Authorization Code + PKCE, state, nonce | Review an identity-provider integration |
| [26 — Incident response](26-incident-response.md) | Containment, investigation, recovery | Rehearse a credential incident |
| [27 — Failure patterns](27-common-failure-patterns.md) | Common security mistakes | Turn failure patterns into regression tests |

Additional reference material: [official standards](../resources/README.md), [mastery checklist](../checklists/mastery-checklist.md), [security review](../checklists/security-review.md), [advanced scenarios](../exercises/advanced-scenarios.md), [lesson template](../teaching/lesson-template.md), and [flashcards](../teaching/flashcards.md).

## Suggested eight-week plan

### Week 1 — Foundations
Read chapters 01–04. Draw a login request/response sequence. Explain authentication vs authorization, cookies, CORS, CSRF, XSS, and password hashing without reading notes.

**Deliverable:** a one-page concept map and a short glossary in your own words.

### Week 2 — Sessions
Read chapters 05, 16, and 23. Run the session lab locally. Inspect the cookie, login, call /auth/me, log out, and verify the old session cannot be replayed. Read the lab's security notes before adapting it.

**Deliverable:** working local demo plus a list of missing production controls.

### Week 3 — Tokens
Read chapters 06, 07, and 24. Compare session and token architecture. Draw normal refresh, expired refresh, revoked refresh, and reuse-detection flows.

**Deliverable:** token-validation checklist and a refresh-token threat model.

### Week 4 — Authorization and account lifecycle
Read chapters 08, 09, 17, and 22. Model users, sessions, external identities, and recovery tokens. Design ownership checks and account disablement behavior.

**Deliverable:** data model and negative authorization test plan.

### Week 5 — Federation and frontend
Read chapters 10, 13, and 25. Draw Authorization Code + PKCE and label state, nonce, code verifier, ID token, and local session. Design frontend loading/anonymous/authenticated states.

**Deliverable:** provider integration design; do not implement protocols from scratch.

### Week 6 — Testing and debugging
Read chapters 11, 18, 19, 21, and 27. Add tests for denied requests, expiry, replay, invalid input, and safe errors. Use synthetic accounts only.

**Deliverable:** test matrix with expected results and evidence.

### Week 7 — Production operations
Read chapters 12, 20, and 26. Write an architecture decision record, readiness review, and incident-response plan.

**Deliverable:** documented production gaps and an owner/remediation plan. Do not claim the lab is production-ready.

### Week 8 — Teach-back and capstone
Review chapter 14 and complete the advanced exercises. Teach sessions, JWT, authorization, and OAuth/OIDC to another person. Ask them to draw the flow and identify the trust boundaries.

**Deliverable:** a demo, a diagram, a test report, and a short lesson for each core topic.

## Readiness gate for every chapter

Do not move forward only because the page was read. You should be able to:

1. Define the concept in plain language.
2. Give one valid example and one non-example.
3. Draw the request flow and identify trust boundaries.
4. Explain what state or credential is stored, where, and for how long.
5. Implement a small example with maintained libraries.
6. Demonstrate at least three failure cases.
7. Explain what the control does not protect against.
8. Teach the concept without reciting the documentation.

## Project boundary

The Express session lab is a teaching tool. It does not implement every chapter. MFA, passkeys, complete recovery, robust CSRF protection, distributed rate limiting, production session storage, and independent security review remain separate work. Never interpret the presence of a chapter as evidence that its controls exist in the sample code.
