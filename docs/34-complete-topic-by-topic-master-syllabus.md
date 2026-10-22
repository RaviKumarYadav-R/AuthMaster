# AuthMaster — Complete Topic-by-Topic Master Syllabus

> **Purpose:** This is the course blueprint for every chapter. Use it as the central table of contents, checklist, and quality standard. The course order is intentional: understand browser and identity fundamentals first, build server-side sessions next, study JWT and refresh tokens after that, and then learn OAuth/OIDC and advanced authenticators.

## How to study each topic

Every topic should be learned in six passes:

1. **Understand:** define the problem in plain language and explain why it exists.
2. **Visualize:** draw actors, trust boundaries, data flow, and state transitions.
3. **Read code:** identify the file, function, input, output, and side effects.
4. **Implement:** build the smallest safe version using maintained libraries.
5. **Prove:** test normal cases, invalid input, expired state, replay, concurrency, and denied permissions.
6. **Teach:** explain the flow, trade-offs, common mistakes, and limitations without reading notes.

For every lesson, keep a short record: learning objective, prerequisites, diagram, key vocabulary, implementation notes, test cases, common mistakes, exercises, teach-back questions, and references.

## Course map

| Stage | Chapters | Milestone |
|---|---|---|
| Foundations | 01–04 | Explain identity, HTTP, browser behavior, and password storage |
| Core authentication | 05–09 | Build and test sessions, tokens, authorization, and recovery concepts |
| Protocols and security | 10–12 | Understand OAuth/OIDC, threat modeling, and deployment boundaries |
| Application integration | 13–20 | Connect a frontend, design contracts, test controls, and assess readiness |
| Deep dives | 21–30 | Debug state, model identity, validate tokens, design policies, and respond to incidents |
| Project and mastery | 31–34 | Deliver a capstone, pass review, build the API, and track every topic |

---

## Chapter 01 — Study method

**Goal:** Learn how to study a security-sensitive system without falling into copy-paste learning.

### Sections to master
- How to set a learning objective and identify prerequisites.
- How to draw the request flow before coding.
- How to trace a request across middleware, route, service, database, and response.
- How to write tests from security properties rather than implementation details.
- How to keep a decision log, glossary, and list of unresolved questions.
- How to explain a concept at beginner and technical levels.
- How to know when a chapter is complete.

**Practical output:** one-page notes, one diagram, a working exercise, three negative tests, and a five-minute teach-back.

## Chapter 02 — Authentication fundamentals

**Goal:** Separate identity, authentication, session establishment, authorization, and auditing.

### Sections to master
- Identity, account, principal, credential, authenticator, factor, and assurance.
- Identification versus authentication versus authorization.
- Registration, verification, login, reauthentication, renewal, logout, recovery, and deletion.
- Password, one-time code, security key, passkey, session, and token terminology.
- Trust boundaries: browser, application, database, administrator, email provider, and identity provider.
- Authentication state versus authorization policy.
- Account lifecycle state machine and revocation events.

**Practical output:** draw the complete account lifecycle and explain why a logged-in user can still receive 403 Forbidden for a resource.

## Chapter 03 — HTTP and browser security

**Goal:** Understand what the browser sends, what the server receives, and what browser policies do—and do not—protect.

### Sections to master
- HTTP methods, status codes, headers, body, content type, and caching.
- HTTPS/TLS, transport confidentiality, integrity, and endpoint assumptions.
- Same-origin policy and the difference between an origin and a site.
- Cookie creation and delivery: Set-Cookie, Cookie, Path, Domain, Max-Age, Expires.
- HttpOnly, Secure, SameSite, cookie scope, and expiry.
- Browser storage choices and their threat-model trade-offs.
- CORS preflight, allowed origins, methods, headers, and credentials.
- CSRF: ambient credentials, state-changing requests, tokens, Origin checks, and SameSite defense-in-depth.
- XSS: injection, output encoding, content security policy, and why HttpOnly does not eliminate XSS.
- Cache-Control on sensitive responses, request-size limits, timeouts, and malformed JSON.

**Practical output:** annotate one browser login flow in DevTools and identify which protections are enforced by the browser versus the server.

## Chapter 04 — Password security

**Goal:** Store and verify passwords safely and understand the limits of password hashing.

### Sections to master
- Why passwords must not be stored in plaintext.
- Hashing versus encryption versus encoding.
- Salt, work factor, memory cost, and offline guessing.
- Argon2id and the role of maintained password-hashing libraries.
- Password input length, Unicode/normalization decisions, and avoiding silent truncation.
- Verification APIs and safe hash-parameter upgrades.
- Generic login errors and account enumeration.
- Credential stuffing, brute force, rate limits, monitoring, and breached-password checks.
- Password change, forced reset, and session revocation policy.
- Protecting passwords from logs, analytics, error reporting, and support systems.

**Practical output:** create a user, inspect the stored hash, verify a correct password, reject a wrong password, and prove no endpoint returns the hash.

## Chapter 05 — Session authentication

**Goal:** Implement a complete server-side session lifecycle.

### Sections to master
- Opaque session identifier versus server-side session state.
- Session creation, lookup, regeneration, persistence, expiry, and destruction.
- Login order: validate, find account, verify hash, rotate ID, set principal, save, respond.
- Cookie flags and production HTTPS requirements.
- Idle timeout versus absolute lifetime.
- Session store selection, TTL cleanup, multiple instances, and store outage behavior.
- Logout, revocation, account disablement, password change, and session invalidation.
- Session fixation, theft, replay, and safe diagnostics.
- Why clearing the cookie alone is insufficient.
- CSRF implications of cookie-based authentication.

**Practical output:** register, login, call the current-user endpoint, logout, and prove the old cookie cannot authenticate.

## Chapter 06 — JWT and access tokens

**Goal:** Understand the token format and implement explicit verification policy.

### Sections to master
- Header, payload, signature, Base64URL, and why a signed JWT is not automatically encrypted.
- Registered claims: sub, iss, aud, exp, iat, nbf, and jti.
- Issuer, audience, subject, expiry, token purpose, and required claims.
- Allowed algorithms, trusted key selection, key IDs, and rejecting algorithm confusion.
- Access token versus ID token versus refresh token.
- Token scope, roles/permissions, and the risk of stale authorization claims.
- Key generation, storage, rotation, overlap, retirement, and compromise.
- Revocation options: short lifetime, deny list, token version, session lookup, or opaque tokens.
- Fail-closed behavior and safe verification errors.

**Practical output:** write a validation checklist and test wrong signature, wrong issuer, wrong audience, expired token, unsupported algorithm, and wrong token purpose.

## Chapter 07 — Refresh tokens

**Goal:** Understand renewal, rotation, replay detection, and race-safe state transitions.

### Sections to master
- Why access tokens are short-lived and refresh credentials are high-value.
- Token generation and safe storage of token hashes/digests.
- Token family, expiry, client/session binding, consumed state, and revocation.
- Rotation state machine: consume old token, issue new token, reject old token.
- Reuse detection and family revocation policy.
- Concurrent refresh requests and atomic database updates.
- Browser versus native-app storage trade-offs.
- Logout, device/session management, and account compromise.
- Retry behavior when a network failure occurs after rotation.
- Cleanup of expired token records and audit events without secrets.

**Practical output:** model the refresh-token family and test replay, expiry, concurrent redemption, and revoked-token behavior.

## Chapter 08 — Authorization

**Goal:** Enforce access to every resource, not merely access to the application.

### Sections to master
- Authentication versus authorization.
- Roles, permissions, ownership, groups, and tenant boundaries.
- RBAC, ABAC, relationship-based policy, and resource ownership checks.
- Deny-by-default and least privilege.
- Object-level authorization and broken object-level authorization (BOLA/IDOR).
- Authorization on read, create, update, delete, export, bulk operations, and background jobs.
- Server-derived identity and distrust of client-supplied role/owner/tenant fields.
- 401 versus 403 behavior and resource-existence disclosure.
- Permission changes, stale claims, and step-up authentication.
- Testing denied requests and ensuring no state mutation.

**Practical output:** create two users and prove user A cannot read, update, or delete user B's resources by changing an ID.

## Chapter 09 — Account recovery

**Goal:** Design recovery as a sensitive authentication flow, not a simple email form.

### Sections to master
- Threat model: enumeration, email compromise, token theft, replay, and support abuse.
- High-entropy, purpose-bound, expiring, single-use recovery tokens.
- Store token hashes rather than raw tokens where appropriate.
- Generic responses and rate limits.
- Trusted URL construction and safe email links.
- Atomic redemption and concurrency.
- Password update, notification, and active-session revocation.
- Lost MFA, email change, account disablement, and assisted recovery.
- Audit events, abuse monitoring, and retention.
- Testing expired, replayed, wrong-purpose, and concurrently redeemed tokens.

**Practical output:** draw the reset lifecycle and specify every state transition and failure response.

## Chapter 10 — OAuth 2.0 and OpenID Connect

**Goal:** Understand delegated authorization and federated authentication without confusing their tokens.

### Sections to master
- OAuth roles: resource owner, client, authorization server, and resource server.
- OpenID Connect identity layer and the purpose of ID tokens.
- Authorization Code flow and PKCE verifier/challenge.
- State, nonce, redirect URI, authorization code, access token, and ID token.
- Discovery metadata, JWKS, issuer, audience, signature, expiry, and nonce validation.
- Public versus confidential clients and client-secret handling.
- External identity mapping by issuer plus subject.
- Account linking, verified identifiers, and collision handling.
- Local logout versus provider logout.
- Why maintained protocol libraries are preferable to handwritten protocol implementations.

**Practical output:** draw the entire redirect flow and test wrong state, nonce, issuer, audience, and redirect URI.

## Chapter 11 — Threat modeling and security testing

**Goal:** Convert risks into testable security properties.

### Sections to master
- Scope, assets, actors, entry points, data flows, and trust boundaries.
- STRIDE-style threat discovery and identity-specific attack scenarios.
- Credential stuffing, fixation, replay, CSRF/XSS, recovery takeover, BOLA, tenant leakage, and key compromise.
- Risk ranking, mitigation owner, residual risk, and retest date.
- Unit, integration, browser, dependency, configuration, and operational tests.
- Positive, negative, boundary, replay, concurrency, and abuse cases.
- Test isolation, synthetic identities, cleanup, and avoiding production data.
- Evidence versus assumptions: what passing tests do and do not prove.

**Practical output:** write a threat model and map every high-priority threat to a control and a test.

## Chapter 12 — Production architecture

**Goal:** Understand the operational system around the authentication code.

### Sections to master
- Edge proxy, TLS termination, app instances, database, session store, email provider, identity provider, secrets manager, logs, and monitoring.
- Single-process versus multi-instance state.
- Shared session/rate-limit stores, consistency, failover, and TTL cleanup.
- Secrets management, environment separation, least privilege, and rotation.
- Trust proxy configuration, forwarded headers, IP handling, and Secure cookies.
- Readiness/liveness, graceful shutdown, timeouts, body limits, connection pools, and resource exhaustion.
- Backups, restore drills, migrations, dependency patching, and incident runbooks.
- Monitoring for login failures, credential stuffing, token replay, and unusual privilege changes.
- Deployment review and independent security assessment.

**Practical output:** produce a deployment diagram, operations checklist, and recovery drill plan.

## Chapter 13 — React integration

**Goal:** Connect the API to a frontend without making the UI the security boundary.

### Sections to master
- Same-origin versus cross-origin deployment.
- API client/service layer and typed request/response contracts.
- Auth state: loading, authenticated, and unauthenticated.
- Current-user bootstrap on refresh and handling expired sessions.
- Context/query cache design and avoiding duplicated auth state.
- Cookie credentials, CORS, CSRF, and browser behavior.
- Route guards as UX, not authorization.
- Form validation, loading states, error states, and duplicate submission prevention.
- Logout across tabs and stale client state.
- Testing direct API calls and cross-user access independent of the UI.

**Practical output:** build login/register forms and a protected page, then verify the backend rejects unauthorized requests even when UI guards are bypassed.

## Chapter 14 — Glossary

**Goal:** Use accurate security vocabulary and distinguish commonly confused terms.

### Sections to master
- Identity, principal, credential, authenticator, session, token, claim, issuer, audience, and scope.
- Authentication versus authorization.
- OAuth versus OIDC.
- JWT versus session.
- Cookie versus session.
- Encoding versus encryption versus hashing.
- CORS versus CSRF versus XSS.
- Access token versus ID token versus refresh token.
- Password change versus password reset.
- Revocation, rotation, replay, fixation, and credential stuffing.

**Practical output:** explain ten random terms without notes, then give one concrete request or code example for each.

## Chapter 15 — Architecture decision records

**Goal:** Make design choices explicit and reviewable.

### Sections to master
- Context, requirements, constraints, and threat model.
- Options considered and reasons for rejection.
- Security and operational consequences.
- Assumptions and failure modes.
- Verification evidence and ownership.
- Session versus JWT decision.
- Cookie versus Authorization header decision.
- Local identity versus external identity provider.
- Centralized versus distributed revocation.
- When a decision should be revisited.

**Practical output:** write an ADR comparing server-side sessions and JWTs for the same app and justify the chosen architecture.

## Chapter 16 — Cookies, CSRF, and CORS deep dive

**Goal:** Make browser security decisions from the actual origin and credential topology.

### Sections to master
- Cookie scope, lifetime, HttpOnly, Secure, and SameSite.
- Origin versus site and same-site cross-origin cases.
- Ambient credential threat model.
- Anti-CSRF token patterns and Origin/Referer validation.
- CORS preflight and credentialed requests.
- Why wildcard origins do not work with credentialed browser access.
- State-changing HTTP methods and safe GET semantics.
- CSRF defenses for session cookies and refresh-token cookies.
- Browser testing versus curl/Postman testing.
- Common misconfiguration and debugging patterns.

**Practical output:** test a hostile-origin state-changing request in a browser and separately demonstrate what CORS and CSRF controls each do.

## Chapter 17 — Passwords, MFA, and passkeys

**Goal:** Understand stronger authenticators and the lifecycle around them.

### Sections to master
- Knowledge, possession, and inherence factors.
- MFA assurance and the difference between two steps and two independent factors.
- TOTP secret enrollment, code verification, clock window, replay policy, and rate limits.
- Recovery codes and lost-device procedures.
- WebAuthn/passkeys: challenge, origin, RP ID, credential ID, public key, and authenticator data.
- Phishing resistance and origin binding.
- Enrollment, removal, step-up authentication, and account recovery.
- Secure storage and lifecycle of authenticator metadata.
- Using maintained libraries and current standards.
- Tests for replay, wrong challenge, wrong origin, and recovery abuse.

**Practical output:** draw MFA enrollment and passkey login ceremonies, including failure and recovery branches.

## Chapter 18 — API contracts

**Goal:** Define endpoint behavior before implementing handlers.

### Sections to master
- Method, path, authentication, authorization, CSRF requirement, request schema, response schema, and status.
- 400, 401, 403, 404, 409, 413, 429, and 500 semantics.
- Consistent error format and safe error disclosure.
- Input size limits, content type, schema validation, and normalization.
- Cache policy for sensitive data.
- Rate limits and retry behavior.
- Idempotency and state-changing requests.
- API versioning and compatibility.
- OpenAPI/schema documentation and examples.
- Mapping each contract row to automated tests.

**Practical output:** document register, login, current-user, logout, password change, and recovery endpoints with success and failure examples.

## Chapter 19 — Testing strategy

**Goal:** Build a test suite that checks behavior and security invariants.

### Sections to master
- Unit tests for validators and policy functions.
- Integration tests with isolated database and session/token stores.
- End-to-end browser tests for cookies, CORS, CSRF, redirects, and multiple tabs.
- Negative tests, boundary tests, fuzzing/property-based tests where appropriate.
- Replay, expiry, concurrency, race, and retry tests.
- Authorization matrix tests with multiple users and tenants.
- Test data setup, deterministic cleanup, and avoiding real email/SMS.
- Dependency and secret scanning.
- CI workflow and test reports.
- Coverage limitations and tracking of untested risks.

**Practical output:** build a matrix linking threat → control → test → expected evidence.

## Chapter 20 — Production readiness

**Goal:** Decide readiness from evidence, not confidence.

### Sections to master
- Architecture and threat-model review.
- Persistent stores, session revocation, and account lifecycle.
- CSRF, CORS, cookie, TLS, CSP, and proxy review.
- Authorization and tenant-isolation evidence.
- Recovery and MFA policy.
- Rate limiting, monitoring, alerting, and abuse response.
- Secret rotation, dependency patching, backup and restore.
- Privacy, retention, deletion, and audit-event policy.
- Deployment rollback and incident playbooks.
- Residual-risk register and go/no-go decision.

**Practical output:** complete the readiness checklist and identify every item without test evidence.

## Chapter 21 — Debugging guide

**Goal:** Diagnose failures by following the request and state.

### Sections to master
- Reconstruct request timeline and status codes.
- Inspect body, Content-Type, response headers, Set-Cookie, and subsequent Cookie.
- Separate validation, database, password verification, session store, and browser causes.
- Debug Secure cookie and reverse-proxy behavior.
- Debug CORS without weakening security.
- Debug stale session, logout replay, and expiry.
- Use correlation IDs and safe structured logging.
- Avoid logging secrets and raw request bodies.
- Hypothesis-driven troubleshooting and regression tests.

**Practical output:** document three real or simulated failures with hypothesis, evidence, root cause, fix, and regression test.

## Chapter 22 — Identity data model

**Goal:** Represent identity and credential lifecycles without leaking secrets or violating uniqueness.

### Sections to master
- User, session, external identity, recovery token, MFA authenticator, audit event, tenant, and membership entities.
- Normalization and uniqueness rules.
- Password hash selection and field allow-listing.
- External identity keyed by issuer plus subject.
- Expiry, consumed, revoked, and disabled states.
- Unique indexes and duplicate-key race handling.
- Transactions and atomic updates for one-time tokens.
- TTL cleanup, retention, deletion, backups, and restore.
- Sensitive field classification and audit-log redaction.
- Data model invariants and ownership boundaries.

**Practical output:** draw an ER diagram and identify which invariant is enforced by schema, index, transaction, service, or test.

## Chapter 23 — Session lifecycle deep dive

**Goal:** Model session handling as a state machine.

### Sections to master
- Anonymous, authenticated, rotated, expired, revoked, and invalid states.
- State transitions on login, logout, password change, account disablement, and suspected compromise.
- Session fixation and identifier entropy.
- Idle timeout, absolute lifetime, and store TTL.
- Session store failure and fail-closed behavior.
- Multi-instance session lookup and consistency.
- Per-device sessions and global logout.
- Step-up authentication for sensitive operations.
- Safe observability without exposing session IDs.
- Tests for stale sessions, expiry, replay, and store outage.

**Practical output:** draw a session state diagram and write a test for every security-critical transition.

## Chapter 24 — JWT validation deep dive

**Goal:** Define a verifier policy that fails closed.

### Sections to master
- Token purpose and accepted algorithms.
- Trusted keys and constrained key selection.
- Signature, issuer, audience, subject, expiry, not-before, and required claims.
- Clock skew and time validation.
- Token type confusion and cross-service acceptance.
- Key ID and rotation strategy.
- Revocation and session-version strategies.
- Safe error handling and internal diagnostics.
- Invalid token test matrix.
- Library-specific validation behavior and documentation review.

**Practical output:** implement a checklist-driven verifier using a maintained library and test one mutation for every required claim and signature rule.

## Chapter 25 — OAuth/OIDC flow deep dive

**Goal:** Understand every protocol artifact and callback validation step.

### Sections to master
- Browser, client, authorization server, and resource server roles.
- Authorization request and redirect response.
- State, nonce, PKCE challenge, verifier, code, access token, and ID token.
- Discovery metadata and JWKS trust.
- Strict redirect URI matching and open-redirect risks.
- Issuer, audience, signature, expiry, nonce, and code validation.
- Public/confidential client behavior and secret storage.
- External identity mapping and account linking.
- Local session creation and logout semantics.
- Negative tests using a test identity provider.

**Practical output:** create a sequence diagram and mark which actor creates and validates each artifact.

## Chapter 26 — Incident response

**Goal:** Contain credential, session, refresh-token, or signing-key compromise.

### Sections to master
- Incident roles, severity, escalation, evidence preservation, and communication.
- Password database exposure.
- Session theft and session revocation.
- Refresh-token replay and token-family revocation.
- Signing-key compromise and key rotation.
- Recovery abuse and invalidation of outstanding tokens.
- Safe logs, correlation IDs, and secret redaction.
- Customer notification and privacy obligations.
- Recovery validation and monitoring.
- Post-incident review and regression work.

**Practical output:** run a tabletop exercise for a leaked session or refresh token and produce a containment timeline.

## Chapter 27 — Common failure patterns

**Goal:** Recognize insecure shortcuts and repair their underlying assumptions.

### Sections to master
- Plaintext password storage and secret-bearing logs.
- JWT decode mistaken for verification.
- Missing session rotation and cookie-only logout.
- In-memory stores in production.
- CORS mistaken for authorization or CSRF protection.
- Client-controlled role, owner, tenant, and redirect fields.
- Reusable reset or refresh tokens.
- Error leakage and missing request limits.
- UI-only protection and external-account linking errors.
- Root-cause analysis and regression tests.

**Practical output:** write five bad-versus-corrected examples and explain the violated security invariant.

## Chapter 28 — Security headers and configuration

**Goal:** Configure the runtime and response headers deliberately.

### Sections to master
- Helmet and common response security headers.
- Content Security Policy, HSTS, frame protection, Referrer Policy, and content-type sniffing.
- CSP compatibility and limits.
- Startup validation of environment variables and secrets.
- Environment separation and secret rotation.
- Proxy trust and forwarded headers.
- Secure cookie behavior behind TLS termination.
- Port, URI, body limit, timeout, and dependency configuration.
- Automated configuration tests.
- Edge proxy versus application responsibility.

**Practical output:** inspect headers, test invalid configuration, and explain which layer sets each security control.

## Chapter 29 — Authorization policy design

**Goal:** Express access rules consistently across all paths into data.

### Sections to master
- Subject, action, resource, tenant, context, and policy inputs.
- Role/permission matrices and ownership constraints.
- ABAC and policy-based decisions.
- Resource-scoped queries and defense in depth.
- Bulk, export, background job, and administrative access.
- Deny-by-default and policy-engine failure.
- Stale membership and privilege changes.
- Step-up authentication and sensitive operations.
- Policy unit tests and cross-tenant integration tests.
- Auditability and policy change review.

**Practical output:** write a read/create/update/delete/share/admin matrix and test allowed and denied combinations.

## Chapter 30 — Threat model template

**Goal:** Produce a threat model that drives engineering work.

### Sections to master
- Scope, assets, security objectives, actors, and assumptions.
- Data-flow diagram and trust boundaries.
- Entry points, third-party services, and sensitive data stores.
- Spoofing, tampering, repudiation, information disclosure, denial of service, and privilege escalation.
- Authentication-specific abuse cases.
- Likelihood, impact, mitigation, owner, and due date.
- Residual risk and accepted exceptions.
- Mapping threats to automated tests and operational controls.
- Review triggers after architecture or provider changes.
- Evidence and versioning of the threat model.

**Practical output:** complete the template for the capstone and link each high-risk threat to a control and verification artifact.

## Chapter 31 — Capstone authentication service

**Goal:** Demonstrate the whole lifecycle with architecture, code, tests, and operational thinking.

### Required sections
- Product requirements, explicit non-goals, and client assumptions.
- Architecture and trust-boundary diagram.
- Data model and sensitive-field inventory.
- API contracts and status/error behavior.
- Registration, login, current-user, logout, password change, and recovery.
- Session/token lifecycle, expiry, rotation, revocation, and disablement.
- Authorization matrix and tenant isolation.
- Threat model and prioritized controls.
- Unit, integration, browser, abuse, and concurrency tests.
- Deployment, monitoring, backup/restore, and incident response.
- Demo plan and five-minute teaching lesson.

**Practical output:** a reproducible capstone with synthetic accounts and a written list of residual risks.

## Chapter 32 — Review and interview mastery

**Goal:** Explain mechanisms, trade-offs, and evidence under questioning.

### Sections to master
- Clear definitions and distinctions.
- Whiteboard flow and state diagrams.
- Password hashing and abuse controls.
- Session fixation, expiry, and revocation.
- JWT validation and key rotation.
- Refresh-token replay and concurrency.
- CORS, CSRF, and XSS distinctions.
- Authorization and tenant isolation.
- OAuth/OIDC artifacts and validation.
- Incident containment and production-readiness judgment.

**Practical output:** answer each question in 60 seconds, then expand with a diagram, code example, failure case, and test.

## Chapter 33 — Build the API step by step

**Goal:** Follow the implementation path in a real local project.

### Sections to master
- Environment setup and safe secrets.
- Project structure and responsibility boundaries.
- Input validation and schema behavior.
- User model, unique index, and password hash.
- Registration and duplicate-account handling.
- Login and session ID regeneration.
- Cookie flags and browser behavior.
- Current-user route and safe profile response.
- Logout and old-cookie replay testing.
- Middleware order, error handling, and request limits.
- Automated tests, debugging, and mastery exercises.

**Practical output:** complete the [code-first walkthrough](33-build-auth-api-step-by-step.md) and prove each step locally.

## Chapter 34 — Topic-by-topic mastery tracker

**Goal:** Make progress measurable and reveal weak areas.

For each topic, mark one level:

- **0 — Not started:** not yet studied.
- **1 — Familiar:** can define it after reading.
- **2 — Explained:** can explain it without notes.
- **3 — Implemented:** can build a small working example.
- **4 — Tested:** can prove success and failure behavior.
- **5 — Teach-ready:** can explain trade-offs and remaining risks to another developer.

Do not award yourself level 4 or 5 based on reading alone. Link your evidence: code path, test name, diagram, or teaching note.

---

## Recommended repository lesson format

Every chapter should use this visual structure:

1. **At a glance:** goal, prerequisites, estimated effort, and final deliverable.
2. **Learning objectives:** observable things the learner can explain or build.
3. **Why this matters:** realistic problem and threat model.
4. **Mental model:** diagram and terminology.
5. **Step-by-step flow:** numbered sequence with inputs, state changes, and outputs.
6. **Code walkthrough:** annotated implementation, file paths, and why each decision exists.
7. **Request/response examples:** success and failure behavior.
8. **Failure modes:** common mistakes and safe troubleshooting.
9. **Testing lab:** unit, integration, browser, replay, or concurrency checks as appropriate.
10. **Hands-on exercises:** beginner, intermediate, and advanced.
11. **Security checklist:** controls, assumptions, and remaining gaps.
12. **Teach-back:** questions, mini-lesson, and mastery criteria.
13. **References:** official standards and maintained implementation documentation.

## Global completion rule

The course is complete only when the learner can explain the architecture, draw the critical flows, implement the local lab, test negative cases, reason about trade-offs, and state what remains unproven. A passing test suite or a completed chapter is evidence of progress—not proof that a system is secure.
