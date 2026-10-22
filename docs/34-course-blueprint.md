# AuthMaster — Complete Course Blueprint

This document defines the teaching standard for every chapter in AuthMaster. Use it as the table of contents, study contract, and quality checklist. The aim is not to memorize API names: it is to understand flows, write the code, verify security properties, debug failures, and teach the design.

> Safety: all labs use synthetic accounts and isolated development/test systems. This repository is educational and is not a production-ready identity platform.

## How each topic should be studied

Every lesson should contain the following sections, in this order:

1. **Why this exists** — the user or system problem and the threat it addresses.
2. **Learning objectives** — observable things you can explain or demonstrate.
3. **Prerequisites** — what must already be understood.
4. **Mental model** — a plain-language explanation and an analogy, followed by the precise technical model.
5. **Actors and trust boundaries** — browser, API, database, identity provider, email provider, and attacker-controlled inputs where relevant.
6. **End-to-end flow** — numbered steps and a Mermaid sequence/flow diagram.
7. **Data and state** — what is stored, where, for how long, and what invalidates it.
8. **Code walkthrough** — complete runnable code or a clearly identified excerpt; explain important lines and the reason for each decision.
9. **Request/response example** — HTTP method, URL, headers, sample body, expected status, safe response, and relevant cookie/token behavior.
10. **Failure paths** — missing, malformed, expired, replayed, unauthorized, rate-limited, dependency-failure, and concurrency cases as appropriate.
11. **Security pitfalls** — common incorrect implementations and why they fail.
12. **Tests** — unit, integration, browser, and negative tests appropriate to the topic.
13. **Debugging guide** — symptoms, hypotheses, observations, and fixes without logging secrets.
14. **Trade-offs** — benefits, costs, assumptions, alternatives, and when not to use the design.
15. **Practice ladder** — beginner, intermediate, advanced, and challenge tasks.
16. **Teach-back** — a short explanation, diagram, code review prompt, and questions to ask a learner.
17. **Mastery checklist** — evidence that the learner can explain, implement, test, and critique the topic.
18. **References** — official standards and maintained library documentation.

## Curriculum map

### Part I — Foundations

- Study method: learn, draw, trace, implement, test, explain, teach.
- Identity vocabulary: identity, principal, identifier, credential, authenticator, authentication, authorization, session, token, assurance.
- HTTP: methods, status codes, headers, request bodies, cookies, HTTPS, proxies, caching, error handling.
- Browser security: origin versus site, cookie rules, CORS, CSRF, XSS, CSP, storage choices, redirect behavior.
- Data handling: input validation, normalization, output allow-listing, secret redaction, safe error contracts.

**Part I deliverable:** draw a browser-to-server login request and explain which parts are untrusted.

### Part II — Password and account lifecycle

- Registration and identifier normalization.
- Password policy, Argon2id, salts, work factors, verification, rehashing, and abuse resistance.
- Email/phone verification and account enumeration policy.
- Login, generic credential failures, rate limiting, and session establishment.
- Password change, recovery, reset tokens, account disablement, deletion, and notifications.
- MFA, TOTP, recovery codes, passkeys, and WebAuthn.

**Part II deliverable:** implement a local registration/login flow and test correct credentials, incorrect credentials, malformed inputs, and duplicate accounts.

### Part III — Session-based authentication

- Session ID and server-side session state.
- Session rotation at authentication and privilege boundaries.
- Cookie flags, session expiry, idle timeout, absolute lifetime, and revocation.
- Persistent session stores, multiple instances, proxy/TLS behavior, and operational failure.
- Logout, logout-all-devices, password-change consequences, and account disablement.

**Part III deliverable:** demonstrate login, current-user lookup, logout, and rejection of a replayed old session.

### Part IV — Tokens and JWT

- Opaque tokens versus structured tokens.
- JWT header, payload, signature, claims, encoding, and the difference between signing and encryption.
- Validation policy: algorithm, key source, issuer, audience, expiry, not-before, subject, token purpose, and clock skew.
- Access-token scope and lifetime.
- Refresh-token rotation, storage, replay detection, family revocation, and concurrency.
- Key rotation, compromise response, revocation strategies, and service boundaries.

**Part IV deliverable:** create a validation checklist and tests for every rejected-token condition before writing middleware.

### Part V — Authorization

- Principal, action, resource, policy, and decision.
- RBAC, ABAC, ownership checks, resource sharing, and tenant isolation.
- Deny-by-default, least privilege, policy composition, and step-up authentication.
- Broken object-level authorization (BOLA/IDOR), bulk operations, exports, background jobs, and admin paths.
- Safe 401/403 behavior and avoiding resource-existence leaks.

**Part V deliverable:** use two users and prove that one cannot read, update, delete, or export the other's resources.

### Part VI — OAuth 2.0 and OpenID Connect

- Authorization server, client, resource server, identity provider, and relying party.
- Authorization Code with PKCE, state, nonce, redirect URI, scopes, and consent.
- ID token versus access token; issuer, audience, signature, and time validation.
- Discovery metadata, JWKS, key rotation, account linking, and identity mapping.
- Local logout versus provider logout; common integration failures.

**Part VI deliverable:** draw each protocol artifact and identify who creates, receives, stores, and validates it. Use a maintained OIDC library rather than inventing protocol cryptography.

### Part VII — Testing, threat modeling, and operations

- Unit, integration, browser end-to-end, security, load/abuse, and operational tests.
- Threat modeling assets, actors, entry points, trust boundaries, abuse cases, and residual risk.
- Dependency scanning, secret scanning, logging redaction, alerting, and incident response.
- TLS/proxy, CORS/CSP, persistent stores, rate limits, secrets, backups, restore drills, graceful shutdown, and patching.
- Incident playbooks for password, session, refresh-token, and signing-key compromise.

**Part VII deliverable:** a threat model linked to executable tests and a production-readiness evidence pack.

### Part VIII — Frontend integration and capstone

- React authentication state: loading, authenticated, unauthenticated, and expired.
- Current-user bootstrap, logout, cross-tab behavior, network failures, and server-side route enforcement.
- Cookie credentials, CSRF, CORS, UI guards, and safe error states.
- Capstone API contracts, data model, architecture diagram, threat model, test matrix, deployment notes, and teach-back.

**Final deliverable:** a local demo with synthetic users, positive and negative tests, an architecture walkthrough, and an honest list of limitations.

## Mastery ladder

| Level | Evidence required |
|---|---|
| 1 — Recognize | Define terms accurately and identify the relevant file/flow. |
| 2 — Explain | Draw the sequence and explain why each step exists. |
| 3 — Implement | Build the smallest working version without blindly copying. |
| 4 — Verify | Test happy paths, invalid input, replay, expiry, and denied access. |
| 5 — Debug | Form a hypothesis, gather safe evidence, fix root cause, add regression test. |
| 6 — Review | Identify assumptions, trade-offs, missing controls, and deployment risks. |
| 7 — Teach | Deliver a clear lesson and answer follow-up questions using a diagram and code. |

## Required project workflow

1. Create a small issue describing one learning objective.
2. Write the expected behavior before writing code.
3. Draw the flow and identify untrusted inputs.
4. Implement one small change.
5. Add success and failure tests.
6. Run the tests and inspect the diff.
7. Update the relevant chapter and security notes.
8. Explain the change in plain language.
9. Record remaining risks rather than claiming the system is secure.

## Rules for every code sample

- State whether it is runnable code, pseudocode, or an excerpt.
- Show the filename and where the code belongs.
- Include required dependencies and environment variables.
- Never include real credentials, secrets, production URLs, or personal data.
- Do not log passwords, cookies, session IDs, bearer tokens, reset links, or raw credential bodies.
- Explain the failure behavior, not just the success response.
- Use maintained libraries for cryptographic and identity protocol operations.
- Keep examples version-aware and link official references.
- Add tests for the security property being taught.
- Label omitted production controls explicitly.

## Weekly review ritual

At the end of each week, draw the key flows from memory, redo one exercise without notes, add three negative tests, explain one trade-off, and teach one topic in five minutes. Revisit anything you can recognize but cannot implement or test.

## Definition of completion

AuthMaster is a learning repository, not a claim that the sample service is production secure. A topic is mastered only when its model, implementation, failure behavior, tests, trade-offs, and remaining risks can all be explained independently.