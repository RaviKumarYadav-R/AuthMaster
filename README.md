# AuthMaster — Learn Authentication Deeply

AuthMaster is a structured, hands-on curriculum for learning web authentication, authorization, browser security, identity protocols, testing, and incident response. It is designed for someone who wants to understand the mechanisms deeply enough to implement a learning lab, review designs, and teach another developer.

> **Important:** This is an educational repository, not a production-ready identity platform. The sample API deliberately omits several controls required before real deployment. Read [the lab security notes](labs/session-auth-api/SECURITY-NOTES.md) before running or adapting it.

## What you will learn

- Identity, credentials, authentication, authorization, and account lifecycle
- HTTP, HTTPS, browser trust, cookies, CORS, CSRF, and XSS
- Password hashing, abuse prevention, MFA, and passkeys
- Server-side sessions, session fixation, expiry, logout, and revocation
- JWT structure and strict token validation
- Access/refresh-token lifecycle, rotation, reuse detection, and revocation
- Resource-level authorization, ownership, roles, and tenant isolation
- Email verification, password recovery, and safe account linking
- OAuth 2.0, OpenID Connect, Authorization Code + PKCE
- Test strategy, threat modeling, production operations, debugging, and incident response
- How to diagram, explain, implement, test, and teach each concept

## Start here

1. Read [the learning map](docs/00-learning-map.md).
2. Follow [the study method](docs/01-study-method.md).
3. Learn [authentication fundamentals](docs/02-authentication-fundamentals.md) before writing auth code.
4. Study [HTTP and browser security](docs/03-http-browser-security.md), then [password security](docs/04-password-security.md).
5. Build and inspect the [session-auth API lab](labs/session-auth-api/README.md).
6. Read [the lab security notes](labs/session-auth-api/SECURITY-NOTES.md) before adapting the code.
7. Track progress with the [mastery checklist](checklists/mastery-checklist.md) and [security review checklist](checklists/security-review.md).
8. Use the [lesson template](teaching/lesson-template.md) to teach each chapter back to another person.

## Learning path

| Stage | Topics | Main deliverable |
|---|---|---|
| Foundations | Identity, HTTP, cookies, browser security | Explain a complete login request flow |
| Passwords and sessions | Hashing, login, session rotation, logout | Run the Express session lab |
| Tokens | JWT validation, refresh rotation, revocation | Draw and test a token lifecycle |
| Access control | Ownership, RBAC, tenant isolation | Write denied-access tests |
| Account lifecycle | Verification, recovery, MFA, passkeys | Threat-model account recovery |
| Federation | OAuth 2.0, OIDC, PKCE | Diagram and review an identity-provider flow |
| Operations | Testing, deployment, debugging, incidents | Produce a security review with evidence |
| Teaching | Glossary, flashcards, lesson plans | Teach the concepts without memorized wording |

Suggested time estimates are in the [learning map](docs/00-learning-map.md). Move at the pace needed to explain and test the concepts correctly.

## Repository map

```text
AuthMaster/
├── docs/                         # Structured chapters and deep dives
├── labs/session-auth-api/        # Express + MongoDB session-auth lab
│   ├── src/                      # Application, routes, config, model
│   ├── test/                     # Starter validation tests and test plan
│   ├── SECURITY-NOTES.md         # Explicit gaps and safe-use boundaries
│   └── POSTMAN-EXAMPLES.md       # Local HTTP examples
├── exercises/                    # Core and advanced practice
├── diagrams/                     # Mermaid sequence and trust-boundary diagrams
├── teaching/                     # Lesson template and flashcards
├── checklists/                   # Mastery and security review
├── resources/                    # Standards and official documentation
├── .github/workflows/            # Lightweight repository checks
├── CONTRIBUTING.md
└── SECURITY.md
```

## Lab quick start

Prerequisites: Node.js 20+ and a local/development MongoDB instance.

1. Open [the lab README](labs/session-auth-api/README.md).
2. Copy `.env.example` to `.env`.
3. Set a long, random local `SESSION_SECRET` and the development `MONGODB_URI`.
4. From `labs/session-auth-api`, install dependencies with `npm install`.
5. Start the API with `npm run dev`.
6. Follow [the local HTTP examples](labs/session-auth-api/POSTMAN-EXAMPLES.md).
7. Run `npm test` and read [the test plan](labs/session-auth-api/test/README.md).

Do not commit `.env`, expose the API to the public internet, or use real credentials. The starter test suite covers request validation; it does **not** prove that the full authentication flow is secure.

## Core security principles

- Never store plaintext passwords; use a maintained password-hashing library.
- Use HTTPS in deployed environments.
- Treat session IDs, passwords, reset tokens, and access/refresh tokens as secrets.
- Enforce authorization on the backend for every protected operation.
- A signed JWT is not encrypted by default; decoding is not verification.
- CORS is not authentication and is not a complete CSRF defense.
- Rate-limit login, registration, password-reset, and verification endpoints.
- Invalidate server-side session state on logout.
- Test expired, revoked, malformed, and unauthorized requests—not only success.
- Prefer a maintained identity provider when it is safer than implementing a protocol yourself.
- Do not deploy the lab without adding the controls in [SECURITY-NOTES.md](labs/session-auth-api/SECURITY-NOTES.md) and obtaining an appropriate security review.

## Study rhythm

**Learn → define → draw → implement → test failure cases → explain → teach.**

For every feature, be able to answer:
1. What problem does it solve?
2. Which component makes the security decision?
3. What state or credential is stored, and where?
4. What happens on expiry, logout, replay, and failure?
5. Which test proves the protection works?
6. What risks remain?

## Documentation index

Start with the [learning map](docs/00-learning-map.md). The complete chapter index and official references are maintained in the `docs/` and `resources/` directories.

## License

MIT for the educational materials and starter code in this repository. Third-party references remain the property of their respective owners.
