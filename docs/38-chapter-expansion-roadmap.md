# Chapter Expansion Roadmap — From Foundations to Mastery

## Purpose

The current foundational curriculum and 15 deep-dive companion guides establish a common teaching structure. The next milestone is to expand each topic into a multi-file textbook with runnable labs, line-by-line walkthroughs, diagrams, threat scenarios, test suites, and instructor notes.

Do not treat 1,000 lines as a hard quota. Use that scale when the subject needs it; split a large chapter into focused subchapters rather than padding one file.

## Required deliverables for every major topic

1. **Concepts:** precise definitions, plain-language explanations, prerequisites, terminology, misconceptions, and boundaries.
2. **Internals:** lifecycle, data model, state transitions, protocol details, diagrams, and timing/concurrency considerations.
3. **Runnable lab:** setup, environment variables, file tree, commands, complete source, expected output, cleanup, and troubleshooting.
4. **Line-by-line walkthrough:** explain important code decisions, including what the code does not protect against.
5. **Negative lab:** intentionally broken isolated example, observed failure, diagnosis, corrected implementation, regression test.
6. **Security review:** attacker capabilities, assets, trust boundaries, abuse cases, mitigations, residual risks, and operational controls.
7. **Testing:** unit, integration, negative, boundary, concurrency, expiry, revocation, and dependency-outage tests where relevant.
8. **Practice:** beginner, intermediate, and advanced exercises; hints separated from solutions; challenge variants.
9. **Teaching:** lesson plan, analogy limits, diagram exercise, learner predictions, teach-back rubric, interview prompts.
10. **Retention:** flashcards, retrieval questions, spaced review, and a mastery checklist.

## Topic-by-topic expansion map

### 01 — Identity and authentication
- Identity vocabulary and identity proofing vs authentication
- Credentials, authenticators, assurance, phishing resistance
- Account states and lifecycle
- Authentication vs authorization vs accounting
- Principal construction and claims mapping
- Login, reauthentication, step-up authentication, logout
- Identity data model and account linking
- Threat scenarios and teach-back lab

### 02 — HTTP and request lifecycle
- HTTP message anatomy and methods/status codes
- TLS, certificates, reverse proxies, termination, trusted forwarding
- Browser origin/site model, redirects, referrers, caching
- Headers and credential transport
- Request parsing, validation, body limits, error handling
- Logging/redaction and safe observability
- Local proxy lab and request-tracing exercises

### 03 — Password security
- Password policy and usability; Unicode and passphrases
- Hashing vs encryption; salts, pepper, work factors, memory costs
- Argon2id implementation and parameter benchmarking
- bcrypt limitations and legacy migrations
- Online abuse controls, credential stuffing, spraying, enumeration
- Breached-password checks and rate limiting
- Hash upgrade strategy and recovery implications
- Benchmark, test, and migration lab

### 04 — Registration and validation
- DTOs, schema validation, normalization and canonicalization
- Email and username policy; Unicode edge cases
- Unique indexes and concurrent registration races
- Transactions, idempotency, duplicate-key errors
- Mass assignment and over-posting
- Verification state and outbox/mail delivery
- Registration lab with concurrency tests

### 05 — Server-side sessions
- Opaque session IDs and entropy
- Session store data model and TTL strategy
- Cookie scope and attributes
- Rotation and fixation defense
- Idle vs absolute expiry
- Logout, revoke-one, revoke-all, password-change revocation
- Multi-instance storage and outage behavior
- Session lifecycle lab with copied-cookie tests

### 06 — Cookies, CSRF, CORS, and XSS
- Cookie Domain/Path/Secure/HttpOnly/SameSite
- Origin vs site and browser request behavior
- CSRF threat model and synchronizer/double-submit approaches
- CORS preflight and credentialed requests
- XSS, output encoding, CSP, and HttpOnly limits
- OAuth redirect and referrer concerns
- Browser test matrix and exploit/fix lab

### 07 — Authentication middleware
- Credential extraction and verification contracts
- Required vs optional authentication
- Principal construction and request context
- Error mapping and 401 vs 403
- Middleware ordering and route inventory
- Authentication state caching and stale claims
- Dependency failures and observability
- Protected-route inventory tests

### 08 — Authorization and tenant isolation
- RBAC, ABAC, ReBAC, policy enforcement
- Ownership and object-level authorization
- IDOR/BOLA, enumeration, bulk and nested routes
- Tenant-scoped queries and database constraints
- Service accounts, admin boundaries, least privilege
- Policy composition and deny-by-default
- Authorization matrix and cross-tenant integration tests

### 09 — JWT and access tokens
- JWT/JWS/JWE distinctions and encoding
- Claims, issuer, audience, expiry, not-before, token type
- Algorithm allowlists and key selection
- Key rotation and JWKS caching
- Token substitution and ID-token confusion
- Revocation, short lifetimes, opaque token alternatives
- Verification wrapper and adversarial token test corpus

### 10 — Refresh tokens and rotation
- Token families and session/device records
- High-entropy secrets and verifier storage
- Atomic consume-and-issue semantics
- Replay/reuse detection and family revocation
- Concurrent browser tabs and client coordination
- Expiry, logout, password change, and account disable
- Database transaction and concurrency lab

### 11 — Verification and recovery
- Verification vs identity proofing
- Random tokens, purpose binding, expiry, single use
- Password reset, email change, account recovery
- Enumeration and resend throttling
- Trusted link construction and referrer/log risks
- Session revocation and notifications
- Atomic consumption and mail-failure lab

### 12 — OAuth 2.0 and OpenID Connect
- Roles, endpoints, scopes, consent, and trust relationships
- Authorization Code + PKCE
- state, nonce, redirect URI, issuer, audience
- ID tokens vs access tokens
- Discovery, JWKS, validation, key rotation
- Confidential/public clients and backend-for-frontend
- Account linking and logout boundaries
- Provider sandbox lab using a maintained client library

### 13 — MFA and passkeys
- Factor categories and factor independence
- TOTP provisioning, verification, replay, rate limits
- Recovery codes and secure lifecycle
- WebAuthn ceremony, challenge, origin, RP ID, flags
- Credential enrollment, removal, and device lifecycle
- Step-up auth and high-risk actions
- Lost-device and account-recovery threat model
- Local test matrix and usability trade-offs

### 14 — Testing and threat modeling
- Asset inventory and trust boundaries
- Abuse cases and STRIDE as a brainstorming aid
- Security invariants and traceability
- Unit vs integration vs end-to-end tests
- Property-based and concurrency testing
- Fault injection and secret-redaction tests
- Security regression strategy and risk acceptance
- Threat-model capstone

### 15 — Production operations
- Secrets manager, environment configuration, startup validation
- Key rotation, overlap, retirement, emergency revocation
- Rate limiting and abuse telemetry
- Structured logs, metrics, alerts, privacy
- Fail-closed behavior and availability trade-offs
- Incident response, evidence preservation, communication
- Backups, restore, disaster recovery, and post-incident learning
- Production-readiness review and tabletop exercises

## Suggested file layout for a large topic

```text
03-Password-Security/
├── README.md                 # chapter map and learning objectives
├── DEEP-DIVE.md              # central concept and security guide
├── 01-password-model.md      # first-principles concepts
├── 02-hashing-internals.md   # algorithm/library behavior
├── 03-implementation.md     # runnable implementation walkthrough
├── 04-attacks-and-defenses.md
├── 05-testing-and-debugging.md
├── examples/                 # small runnable examples
├── lab/                      # isolated integration lab
├── exercises.md
├── hints.md
├── solutions.md
├── flashcards.md
└── teach-back.md
```

Use this layout only when it improves navigation; small topics can stay smaller.

## Acceptance criteria before calling a chapter complete

- [ ] A beginner can define every key term.
- [ ] The chapter explains why the mechanism exists and what problem it solves.
- [ ] Diagrams match the code and identify trust boundaries.
- [ ] All commands and code examples are reproducible in a clean local environment.
- [ ] Important code paths are explained, including failure behavior.
- [ ] Security-sensitive code uses maintained libraries rather than custom cryptography.
- [ ] Negative tests cover invalid input, wrong identity, expiry, replay, and authorization.
- [ ] Concurrency and dependency failure are tested where relevant.
- [ ] Exercises progress from beginner to advanced, with separate hints and solutions.
- [ ] Teacher notes include misconception checks and teach-back prompts.
- [ ] External standards and official library documentation are linked.
- [ ] The chapter clearly labels educational code and production gaps.
- [ ] No secrets, tokens, personal data, or unsafe real-system testing instructions are included.

## Quality principle

The goal is not the longest possible repository. The goal is a repository that lets a learner **explain, implement, test, debug, compare, and teach** each authentication mechanism without relying on a tutorial. Expand chapters in small reviewable commits and run the repository's Markdown checks after each milestone.
