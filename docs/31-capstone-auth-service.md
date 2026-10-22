# 31 — Capstone: Design an Authentication Service

The capstone is a design and learning exercise. Do not expose a student-built identity service to real users without a security review.

## Objective
Design a small service that supports account registration, login, session management, logout, profile retrieval, password change, account recovery, and resource-level authorization. Treat MFA and OIDC as later extension tracks.

## Required deliverables
1. Architecture diagram with trust boundaries.
2. Data model for users, sessions, external identities, recovery tokens, and audit events.
3. API contract with success and failure responses.
4. Threat model covering credential theft, CSRF, account recovery, and authorization bypass.
5. Session lifecycle diagram including rotation, expiry, logout, and disablement.
6. Test matrix with positive, negative, expiry, replay, concurrency, and abuse cases.
7. Deployment and operations checklist.
8. A five-minute teach-back lesson for another developer.

## Milestones

### Milestone 1 — Fundamentals
Write definitions for identity, credential, authentication, authorization, session, and principal. Draw a login flow before coding.

### Milestone 2 — Password and session
Use a maintained password-hashing library, a server-side session, and a cookie policy. Test session rotation and logout replay.

### Milestone 3 — Authorization
Add a sample private resource and prove that one user cannot access another user's record by changing an identifier.

### Milestone 4 — Recovery design
Design single-use, expiring verification/reset tokens. Document storage, rate limits, notifications, session revocation, and concurrency behavior. A written design is acceptable before implementing email delivery.

### Milestone 5 — Hardening plan
Document CSRF, rate limiting, production session store, TLS/proxy configuration, logging redaction, dependency scanning, monitoring, and incident response.

### Milestone 6 — Review and teach
Run the test matrix, record gaps honestly, ask another person to review the design, and teach the architecture without reading the notes.

## Acceptance criteria
- No plaintext password storage.
- No client-side-only authorization.
- No secret values in Git or logs.
- Session ID rotates after login.
- Logout invalidates server-side state.
- Protected resource ownership is enforced server-side.
- Expiry, replay, and invalid-input cases are tested.
- Missing production controls are clearly documented.
- The author can explain each decision and its trade-offs.

A completed capstone is evidence of learning, not a security certification.

## Expanded capstone rubric

### Required deliverables
1. Product requirements and explicit non-goals.
2. Architecture and trust-boundary diagrams.
3. Identity data model with sensitive-field classification and lifecycle.
4. API contracts for register, login, current user, logout, password change, recovery, and protected resources.
5. Session policy covering rotation, idle/absolute expiry, revocation, disablement, and store failure.
6. Password policy and abuse controls.
7. Authorization matrix including cross-user and cross-tenant denial.
8. Threat model with prioritized mitigations.
9. Unit, integration, browser, and abuse test plan.
10. Deployment, secrets, monitoring, backup/restore, and incident playbooks.
11. Teach-back guide and demo using synthetic accounts.

### Evaluation
Score each area from 0 to 3: 0 means missing; 1 means described but not demonstrated; 2 means implemented and tested; 3 means tested, explained, and includes failure/operational handling. The capstone is incomplete if authorization boundaries, session revocation, recovery, or secret handling are only described but not tested.

### Final demo
Demonstrate successful login, failed login, anonymous denial, cross-user denial, logout, replay rejection, rate limiting, and safe errors. Explain one trade-off and one remaining risk without claiming the service is production secure.

