# AuthMaster — Chapter-by-Chapter Learning and Teaching Path

This is the **friendly route through the whole repository**. The repository contains many documents, so do not try to read every file in folder order. Learn one small lesson at a time, prove that you understand it, then teach it back.

> **Safety boundary:** AuthMaster is an educational curriculum. Use synthetic accounts and local development systems. Do not treat the demo API as production-ready.

## How the course is organized

- **Part** = a major area of authentication.
- **Chapter** = one concept you should master.
- **Lesson** = a small 30–60 minute study session.
- **Lab** = code you run or change.
- **Teach-back** = explain the concept without reading your notes.
- **Mastery gate** = evidence that you are ready to continue.

### The repeatable lesson routine

Use this routine for every chapter. A lesson can take more than one day; understanding matters more than speed.

1. **Read (5–10 min):** read only the chapter's relevant section.
2. **Explain simply (5 min):** write a 2–4 sentence explanation as if speaking to a beginner.
3. **Draw (5–10 min):** draw the actors, arrows, trust boundaries, and stored state.
4. **Trace (5–10 min):** follow one real request from the browser to the server and back.
5. **Build (10–20 min):** run the lab or implement one small exercise.
6. **Break it safely (5–10 min):** test one invalid, expired, replayed, or unauthorized case in the local lab.
7. **Teach (5 min):** explain why the design exists, how it works, and what it does not protect against.
8. **Recall tomorrow:** answer the review questions from memory before rereading.

If you cannot explain a chapter without notes, mark it **Practising**, not **Mastered**.

---

## Part 0 — Learn how to learn and teach

### Chapter 00 — Set up your learning system
**Read:** [Complete learning map](00-learning-map.md), [Complete course blueprint](34-course-blueprint.md), [Lesson template](../teaching/lesson-template.md).

**Lessons**
- 00.1 — Understand the repository map and how to navigate it.
- 00.2 — Set up a learning log: concept, diagram, code changed, tests run, doubts.
- 00.3 — Learn the difference between reading, understanding, implementing, and teaching.
- 00.4 — Use spaced repetition: review after 1 day, 3 days, 7 days, and 14 days.

**Teach-back:** Explain the difference between “I read it” and “I can teach it.”

**Mastery evidence:** You can describe your study routine and locate the chapter, lab, test, and teaching material for a topic.

---

## Part I — Foundations: understand the problem before writing code

### Chapter 01 — Identity and authentication vocabulary
**Read:** [Authentication fundamentals](02-authentication-fundamentals.md), [Glossary](14-glossary.md).

**Lessons**
- 01.1 — Identity, identifier, account, and principal.
- 01.2 — Credential versus authenticator.
- 01.3 — Authentication versus authorization.
- 01.4 — Session, token, claims, assurance, and trust boundary.
- 01.5 — Trace a user signing in and then requesting a protected resource.

**Draw:** User → browser → API → user store → session/token → protected resource.

**Teach-back:** Explain authentication and authorization using one example and one non-example.

**Mastery gate:** Explain each key term in your own words and draw a login lifecycle without notes.

### Chapter 02 — HTTP and request/response basics
**Read:** [HTTP and browser security](03-http-browser-security.md), [API contracts](18-api-contracts.md).

**Lessons**
- 02.1 — Methods, paths, headers, bodies, and status codes.
- 02.2 — HTTPS, TLS termination, reverse proxies, and forwarded headers.
- 02.3 — Why server validation is mandatory even when the frontend validates.
- 02.4 — Generic error responses and safe response contracts.
- 02.5 — Inspect one request using browser DevTools or an API client.

**Lab:** Write down the exact request and response for a successful and failed login.

**Mastery gate:** Read a request and identify which fields are user-controlled and which data must never be returned.

### Chapter 03 — Browser security boundaries
**Read:** [HTTP/browser security](03-http-browser-security.md), [Cookies, CSRF, and CORS](16-cookies-csrf-cors.md), [Security headers and configuration](28-security-headers-and-config.md).

**Lessons**
- 03.1 — Origin versus site.
- 03.2 — Cookies: Domain, Path, Secure, HttpOnly, SameSite, expiry.
- 03.3 — CORS: what it allows and what it does not protect.
- 03.4 — CSRF: attacker-controlled cross-site requests and defenses.
- 03.5 — XSS: script execution, impact, output encoding, CSP, and safe DOM use.
- 03.6 — Browser storage choices and their trade-offs.
- 03.7 — Redirects, caching, and sensitive responses.

**Draw:** A same-origin request and a cross-site attack attempt.

**Mastery gate:** Explain why CORS is not authentication, HttpOnly does not stop every XSS impact, and CSRF and XSS are different threats.

---

## Part II — Accounts and passwords

### Chapter 04 — Identity data model
**Read:** [Identity data model](22-identity-data-model.md).

**Lessons**
- 04.1 — User, credential, session, external identity, and recovery-token records.
- 04.2 — Unique constraints and race conditions.
- 04.3 — Normalizing identifiers without accidentally merging different users.
- 04.4 — Sensitive fields, data minimization, retention, and deletion.
- 04.5 — Sketch a schema and explain every field.

**Mastery gate:** Draw a small data model and justify unique constraints and sensitive-data handling.

### Chapter 05 — Password security
**Read:** [Password security](04-password-security.md), [Passwords, MFA, and passkeys](17-passwords-mfa-passkeys.md).

**Lessons**
- 05.1 — Why passwords must be hashed, not reversibly encrypted.
- 05.2 — Password hashing versus fast general-purpose hashing.
- 05.3 — Salts, work factors, pepper, and Argon2id.
- 05.4 — Password verification and constant-time comparison where applicable.
- 05.5 — Password policy, breached-password checks, and user experience.
- 05.6 — Rate limiting, credential stuffing, and denial-of-service trade-offs.
- 05.7 — Rehashing and migration when hashing parameters change.
- 05.8 — Tests for wrong passwords, malformed records, and legacy hashes.

**Lab:** Run the password example; identify whether each piece is runnable code or an illustrative excerpt before adapting it.

**Teach-back:** Explain what a salt does, what it does not do, and why hashing cost matters.

**Mastery gate:** Implement or trace password hashing with a maintained library and test both successful and failed verification.

### Chapter 06 — Registration and account verification
**Read:** [Authentication fundamentals](02-authentication-fundamentals.md), [API contracts](18-api-contracts.md), [Account recovery](09-account-recovery.md).

**Lessons**
- 06.1 — Validate registration input on the server.
- 06.2 — Handle duplicate identifiers and concurrent registrations.
- 06.3 — Avoid leaking account existence unnecessarily.
- 06.4 — Create and verify single-use, expiring verification tokens.
- 06.5 — Rate limits, resend behavior, and delivery-provider failure.
- 06.6 — Test expired, reused, malformed, and already-used verification tokens.

**Mastery gate:** Draw registration from submission through verification and list the state changes at each step.

### Chapter 07 — Login and session establishment
**Read:** [Session authentication](05-session-authentication.md), [Build the API step by step](33-build-auth-api-step-by-step.md).

**Lessons**
- 07.1 — Validate the login request.
- 07.2 — Verify credentials without revealing which field failed.
- 07.3 — Establish a new authenticated state only after verification.
- 07.4 — Rotate identifiers at authentication boundaries.
- 07.5 — Handle rate limits, lockout trade-offs, and dependency outages.
- 07.6 — Trace the full login request through the reference lab.

**Mastery gate:** Explain when the user becomes authenticated and what credential the browser receives.

---

## Part III — Sessions and browser-based authentication

### Chapter 08 — Server-side sessions
**Read:** [Session authentication](05-session-authentication.md), [Session lifecycle deep dive](23-session-lifecycle-deep-dive.md).

**Lessons**
- 08.1 — Session ID versus session data.
- 08.2 — Why the server-side session store matters.
- 08.3 — Idle timeout versus absolute lifetime.
- 08.4 — Session fixation and session rotation.
- 08.5 — Logout, logout-all-devices, revocation, and password-change behavior.
- 08.6 — Persistent stores, multiple app instances, and proxy/TLS settings.
- 08.7 — Cookie replay and stale-session tests.

**Lab:** Start the session API, log in, call the current-user endpoint, log out, and verify that the old session cannot be reused.

**Mastery gate:** Explain what logout invalidates and how you would prove that it worked.

### Chapter 09 — React frontend integration
**Read:** [React integration](13-react-integration.md).

**Lessons**
- 09.1 — Loading, authenticated, unauthenticated, and error states.
- 09.2 — Bootstrap the current user on page load.
- 09.3 — Prevent stale UI state after logout or expiry.
- 09.4 — Route guards improve navigation but do not enforce server security.
- 09.5 — Cookie credentials, CSRF protections, CORS, and cross-tab behavior.
- 09.6 — Test refresh, network failure, and expired-session UI.

**Mastery gate:** Explain why hiding a button or guarding a React route is not an authorization boundary.

---

## Part IV — Tokens and JWTs

### Chapter 10 — Token fundamentals and JWT structure
**Read:** [JWT and tokens](06-jwt-and-tokens.md), [JWT validation deep dive](24-jwt-validation-deep-dive.md).

**Lessons**
- 10.1 — Opaque token versus structured token.
- 10.2 — JWT header, payload, claims, Base64URL, and signature.
- 10.3 — Signing is not encryption.
- 10.4 — Access tokens versus ID tokens.
- 10.5 — Token lifetime, scopes, audiences, and intended purpose.
- 10.6 — Decode for inspection without mistaking decoding for validation.

**Mastery gate:** Explain what anyone who holds a JWT can read and what must be verified before trusting it.

### Chapter 11 — Secure token validation
**Read:** [JWT validation deep dive](24-jwt-validation-deep-dive.md), [Failure patterns](27-common-failure-patterns.md).

**Lessons**
- 11.1 — Pin allowed algorithms and trusted key sources.
- 11.2 — Validate signature, issuer, audience, expiry, not-before, and subject.
- 11.3 — Validate token purpose and reject wrong-token-type substitution.
- 11.4 — Handle clock skew and key rotation.
- 11.5 — Avoid trusting attacker-controlled key URLs or algorithm choices.
- 11.6 — Write one negative test per validation rule.

**Mastery gate:** Produce a checklist of invalid tokens and expected rejection behavior before writing verification middleware.

### Chapter 12 — Refresh-token lifecycle
**Read:** [Refresh tokens](07-refresh-tokens.md).

**Lessons**
- 12.1 — Why access and refresh tokens have different jobs.
- 12.2 — Store refresh credentials safely and track their family.
- 12.3 — Rotate refresh tokens and invalidate the previous token.
- 12.4 — Detect reuse and decide how to revoke a token family.
- 12.5 — Handle concurrent refresh requests and retry behavior.
- 12.6 — Revoke on logout, password change, account disablement, or compromise.
- 12.7 — Test replay, expiry, reuse, and races.

**Mastery gate:** Draw normal refresh, expired refresh, reused refresh, and concurrent refresh flows.

---

## Part V — Authorization and permissions

### Chapter 13 — Authorization fundamentals
**Read:** [Authorization](08-authorization.md), [Authorization policy design](29-authorization-policy-design.md).

**Lessons**
- 13.1 — Principal + action + resource + context → decision.
- 13.2 — Deny by default and least privilege.
- 13.3 — Roles versus attributes and resource-specific policy.
- 13.4 — Authentication middleware versus authorization policy.
- 13.5 — Safe 401 and 403 behavior.

**Mastery gate:** Explain who is making the request, what they want to do, which resource is targeted, and why the server allows or denies it.

### Chapter 14 — Ownership, IDOR/BOLA, and tenant isolation
**Read:** [Authorization](08-authorization.md), [Authorization policy design](29-authorization-policy-design.md).

**Lessons**
- 14.1 — Why an unguessable ID does not prove permission.
- 14.2 — Enforce ownership in database queries and service logic.
- 14.3 — Protect read, update, delete, export, and bulk actions.
- 14.4 — Isolate tenants in queries, jobs, caches, and admin paths.
- 14.5 — Test with two synthetic users and two tenants.
- 14.6 — Turn each denied-access finding into a regression test.

**Lab:** Create two test users. Prove that user A cannot access, modify, delete, or export user B's resources.

**Mastery gate:** Show a failing unauthorized-access test, fix the policy, and keep the test as a regression check.

---

## Part VI — Recovery and stronger authenticators

### Chapter 15 — Password reset and account recovery
**Read:** [Account recovery](09-account-recovery.md).

**Lessons**
- 15.1 — Why recovery is part of the authentication boundary.
- 15.2 — Generate high-entropy, single-use, expiring tokens.
- 15.3 — Store token hashes where appropriate and invalidate on use.
- 15.4 — Prevent replay, enumeration, and unsafe redirects.
- 15.5 — Decide what happens to existing sessions after reset.
- 15.6 — Handle email-provider failure and rate limits.
- 15.7 — Test token reuse, expiry, and concurrent reset attempts.

**Mastery gate:** Threat-model account recovery as carefully as login.

### Chapter 16 — MFA, TOTP, recovery codes, and passkeys
**Read:** [Passwords, MFA, and passkeys](17-passwords-mfa-passkeys.md).

**Lessons**
- 16.1 — Authentication factors and assurance.
- 16.2 — TOTP enrollment and verification.
- 16.3 — Recovery-code generation, storage, and one-time use.
- 16.4 — MFA reset and account-recovery risks.
- 16.5 — Passkeys/WebAuthn at a conceptual level.
- 16.6 — Step-up authentication for sensitive actions.
- 16.7 — Test replay, throttling, lost authenticator, and recovery paths.

**Mastery gate:** Compare password-only, password + TOTP, and passkey flows, including their recovery risks.

---

## Part VII — OAuth 2.0 and OpenID Connect

### Chapter 17 — Protocol roles and artifacts
**Read:** [OAuth/OIDC](10-oauth-oidc.md), [OAuth/OIDC flow](25-oauth-oidc-flow.md).

**Lessons**
- 17.1 — Client, authorization server, resource server, identity provider, relying party.
- 17.2 — OAuth authorization versus OIDC authentication.
- 17.3 — Authorization code, access token, ID token, scopes, and consent.
- 17.4 — Redirect URI matching and trust boundaries.
- 17.5 — Why an access token is not automatically proof of user identity.

**Mastery gate:** Identify who creates, receives, stores, and validates each protocol artifact.

### Chapter 18 — Authorization Code + PKCE
**Read:** [OAuth/OIDC flow](25-oauth-oidc-flow.md).

**Lessons**
- 18.1 — Draw the full redirect flow.
- 18.2 — State and CSRF protection.
- 18.3 — Code verifier and code challenge in PKCE.
- 18.4 — Nonce and ID-token validation in OIDC.
- 18.5 — Discovery metadata, JWKS, issuer, audience, and key rotation.
- 18.6 — Account linking and local identity mapping.
- 18.7 — Local logout versus identity-provider logout.
- 18.8 — Use a maintained OIDC client; do not invent protocol cryptography.

**Mastery gate:** Review an integration design and identify missing state, nonce, PKCE, redirect, or token-validation controls.

---

## Part VIII — Testing, threat modeling, and debugging

### Chapter 19 — Authentication test strategy
**Read:** [Testing strategy](19-testing-strategy.md), [Threat model and testing](11-threat-model-and-testing.md).

**Lessons**
- 19.1 — Unit tests for policy and validation.
- 19.2 — Integration tests for routes and state transitions.
- 19.3 — Browser end-to-end tests for cookies and redirects.
- 19.4 — Negative tests: invalid, expired, revoked, replayed, and unauthorized.
- 19.5 — Race-condition and abuse-control tests.
- 19.6 — Assert state changes and forbidden side effects, not only status codes.
- 19.7 — Make every security bug a regression test.

**Mastery gate:** Link every security property to a test and evidence.

### Chapter 20 — Threat modeling
**Read:** [Threat-model template](30-threat-model-template.md), [Threat model and testing](11-threat-model-and-testing.md).

**Lessons**
- 20.1 — Assets, actors, entry points, and trust boundaries.
- 20.2 — Draw data flows and identify attacker-controlled inputs.
- 20.3 — Enumerate abuse cases for login, session, recovery, and authorization.
- 20.4 — Connect threat → security property → mitigation → test.
- 20.5 — Record residual risk and assumptions.

**Mastery gate:** Create a threat model for one small authentication feature with matching tests.

### Chapter 21 — Debugging authentication failures
**Read:** [Debugging guide](21-debugging-guide.md), [Failure patterns](27-common-failure-patterns.md).

**Lessons**
- 21.1 — Cookie not set or not sent.
- 21.2 — CORS preflight and credential problems.
- 21.3 — Session store, expiry, and proxy issues.
- 21.4 — JWT claim, issuer, audience, key, and clock failures.
- 21.5 — OAuth redirect and state/nonce failures.
- 21.6 — Debug using safe metadata; never log passwords, raw tokens, cookies, or recovery secrets.
- 21.7 — Fix root cause and add a regression test.

**Mastery gate:** Write a symptom → hypothesis → safe observation → fix → regression test report.

---

## Part IX — Production thinking and architecture decisions

### Chapter 22 — Production architecture and operations
**Read:** [Production architecture](12-production-architecture.md), [Production readiness](20-production-readiness.md), [Security headers and configuration](28-security-headers-and-config.md).

**Lessons**
- 22.1 — Secrets, configuration, and environment separation.
- 22.2 — Persistent session/token stores and multi-instance deployments.
- 22.3 — TLS, reverse proxies, secure cookies, and trusted proxy configuration.
- 22.4 — Rate limits, monitoring, safe logs, and alerting.
- 22.5 — Dependency/secret scanning, patching, backups, and restore drills.
- 22.6 — Graceful shutdown and dependency outage behavior.
- 22.7 — Production-readiness evidence versus assumptions.

**Mastery gate:** Review the lab honestly and list controls still needed before real deployment.

### Chapter 23 — Choose the right authentication architecture
**Read:** [Architecture decisions](15-auth-architecture-decisions.md).

**Lessons**
- 23.1 — Server-side sessions versus JWTs.
- 23.2 — Browser app, BFF, mobile client, and service-to-service differences.
- 23.3 — Managed identity provider versus self-managed credentials.
- 23.4 — Revocation, scaling, operations, and incident-response trade-offs.
- 23.5 — Write an architecture decision record with context, options, decision, and consequences.

**Mastery gate:** Defend a design choice based on requirements rather than trends.

### Chapter 24 — Incident response
**Read:** [Incident response](26-incident-response.md).

**Lessons**
- 24.1 — Suspected password compromise.
- 24.2 — Stolen session or refresh token.
- 24.3 — Signing-key compromise.
- 24.4 — Containment, revocation, investigation, communication, and recovery.
- 24.5 — Preserve evidence without collecting secrets unnecessarily.
- 24.6 — Conduct a tabletop exercise and write follow-up actions.

**Mastery gate:** Walk through a simulated incident and identify who does what, in what order, and how recovery is verified.

---

## Part X — Capstone: build, test, review, and teach

### Chapter 25 — Build the reference authentication service
**Read:** [Build API step by step](33-build-auth-api-step-by-step.md), [Capstone](31-capstone-auth-service.md), [Lab security notes](../labs/session-auth-api/SECURITY-NOTES.md).

**Lessons**
- 25.1 — Read the project structure and trace one route end-to-end.
- 25.2 — Write API contracts and data-model constraints.
- 25.3 — Implement or trace registration, login, current-user, and logout.
- 25.4 — Add authorization and ownership checks.
- 25.5 — Add verification and recovery lifecycle behavior.
- 25.6 — Add tests for success, denial, expiry, replay, and concurrency.
- 25.7 — Document the architecture, threat model, limitations, and setup.
- 25.8 — Perform a security review and record unresolved risks.

**Mastery gate:** A working local demo, reproducible test results, diagrams that match the code, and an explicit list of limitations.

### Chapter 26 — Teach authentication to another developer
**Read:** [Review/interview questions](32-authentication-review-interview.md), [Lesson template](../teaching/lesson-template.md), [Quiz](../teaching/quiz.md), [Flashcards](../teaching/flashcards.md).

**Lessons**
- 26.1 — Plan a 5-minute beginner explanation.
- 26.2 — Draw the flow before showing code.
- 26.3 — Teach one happy path and one failure path.
- 26.4 — Ask the learner to predict behavior before running a test.
- 26.5 — Let the learner find and fix a deliberate bug in the local lab.
- 26.6 — Ask follow-up questions and correct misconceptions without shaming.
- 26.7 — Re-teach after 1, 3, 7, and 14 days using recall, not rereading.

**Mastery gate:** The learner can draw the flow, explain the security boundary, predict a failure, and solve a small task without copying your solution.

---

## The teaching pattern for every single lesson

Use this seven-part mini-lesson:

1. **Problem:** What goes wrong if we do not have this control?
2. **Mental model:** Explain it in plain language, then refine the analogy.
3. **Diagram:** Show actors, arrows, trust boundaries, and state.
4. **Code:** Trace the smallest relevant code path.
5. **Prediction:** Ask what should happen for a valid and invalid request.
6. **Evidence:** Run a test and compare actual versus expected behavior.
7. **Teach-back:** Ask the learner to explain the why, the how, and the limitation.

### Questions to ask your learner

- What problem does this component solve?
- What data does it trust, and why?
- Where is the credential or state stored?
- What expires it or revokes it?
- What happens if the request is replayed?
- What does this control **not** protect against?
- Which test proves the expected behavior?
- What would you inspect first if it failed?

## Progress tracker

Copy this into your notes and update one row after each chapter.

| Chapter | Read | Diagram | Lab/code | Negative test | Teach-back | Status |
|---|---|---|---|---|---|---|
| 00 — Learning system | [ ] | [ ] | [ ] | [ ] | [ ] | Not started |
| 01 — Identity fundamentals | [ ] | [ ] | [ ] | [ ] | [ ] | Not started |
| 02 — HTTP | [ ] | [ ] | [ ] | [ ] | [ ] | Not started |
| 03 — Browser security | [ ] | [ ] | [ ] | [ ] | [ ] | Not started |
| 04 — Identity data model | [ ] | [ ] | [ ] | [ ] | [ ] | Not started |
| 05 — Passwords | [ ] | [ ] | [ ] | [ ] | [ ] | Not started |
| 06 — Registration | [ ] | [ ] | [ ] | [ ] | [ ] | Not started |
| 07 — Login | [ ] | [ ] | [ ] | [ ] | [ ] | Not started |
| 08 — Sessions | [ ] | [ ] | [ ] | [ ] | [ ] | Not started |
| 09 — React integration | [ ] | [ ] | [ ] | [ ] | [ ] | Not started |
| 10 — JWT structure | [ ] | [ ] | [ ] | [ ] | [ ] | Not started |
| 11 — Token validation | [ ] | [ ] | [ ] | [ ] | [ ] | Not started |
| 12 — Refresh tokens | [ ] | [ ] | [ ] | [ ] | [ ] | Not started |
| 13 — Authorization | [ ] | [ ] | [ ] | [ ] | [ ] | Not started |
| 14 — Ownership/tenancy | [ ] | [ ] | [ ] | [ ] | [ ] | Not started |
| 15 — Recovery | [ ] | [ ] | [ ] | [ ] | [ ] | Not started |
| 16 — MFA/passkeys | [ ] | [ ] | [ ] | [ ] | [ ] | Not started |
| 17 — OAuth/OIDC roles | [ ] | [ ] | [ ] | [ ] | [ ] | Not started |
| 18 — PKCE flow | [ ] | [ ] | [ ] | [ ] | [ ] | Not started |
| 19 — Testing | [ ] | [ ] | [ ] | [ ] | [ ] | Not started |
| 20 — Threat modeling | [ ] | [ ] | [ ] | [ ] | [ ] | Not started |
| 21 — Debugging | [ ] | [ ] | [ ] | [ ] | [ ] | Not started |
| 22 — Operations | [ ] | [ ] | [ ] | [ ] | [ ] | Not started |
| 23 — Architecture choices | [ ] | [ ] | [ ] | [ ] | [ ] | Not started |
| 24 — Incident response | [ ] | [ ] | [ ] | [ ] | [ ] | Not started |
| 25 — Capstone | [ ] | [ ] | [ ] | [ ] | [ ] | Not started |
| 26 — Teaching mastery | [ ] | [ ] | [ ] | [ ] | [ ] | Not started |

## Important note about the existing chapter files

This guide **groups and sequences** existing documents; it does not claim that every listed lesson already has a separate file or that every code sample is a complete production implementation. Follow the links, inspect each lab's security notes, and record any missing runnable example or test as a follow-up task. Expand one lesson at a time using the [course blueprint](34-course-blueprint.md) and [lesson template](../teaching/lesson-template.md).
