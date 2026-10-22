# AuthMaster — Learn Authentication Deeply

AuthMaster is a structured, hands-on curriculum for learning web authentication, authorization, browser security, identity protocols, testing, and incident response. It is designed for a learner who wants to understand the mechanisms deeply enough to implement a lab, review architecture, and teach another developer.

> **Important:** This is an educational repository, not a production-ready identity platform. The sample API deliberately omits several controls required before real deployment. Read [the lab security notes](labs/session-auth-api/SECURITY-NOTES.md) before running or adapting it.

## Learning outcomes

- Explain identity, credentials, authentication, authorization, and the account lifecycle.
- Understand HTTP, HTTPS, browser trust, cookies, CORS, CSRF, and XSS.
- Use password-specific hashing and understand abuse prevention.
- Build and inspect server-side sessions, rotation, expiry, logout, and revocation.
- Understand JWT structure, claims, signature validation, and key management.
- Explain refresh-token rotation, replay, reuse detection, and concurrency.
- Enforce resource ownership, roles, and tenant isolation on the server.
- Design verification, password recovery, MFA, and passkey flows.
- Understand OAuth 2.0, OpenID Connect, Authorization Code + PKCE, state, and nonce.
- Threat-model, test, debug, deploy, and respond to authentication incidents.
- Teach each topic using diagrams, failure cases, and hands-on exercises.

## Start here

1. Read the [complete learning map](docs/00-learning-map.md).
2. Follow the [study and teaching method](docs/01-study-method.md).
3. Learn [authentication fundamentals](docs/02-authentication-fundamentals.md) before writing authentication code.
4. Study [HTTP and browser security](docs/03-http-browser-security.md), then [password security](docs/04-password-security.md).
5. Run the [session-auth API lab](labs/session-auth-api/README.md) locally.
6. Read [lab security notes](labs/session-auth-api/SECURITY-NOTES.md) before adapting code.
7. Track progress with the [mastery checklist](checklists/mastery-checklist.md) and [security review checklist](checklists/security-review.md).
8. Use the [lesson template](teaching/lesson-template.md), [flashcards](teaching/flashcards.md), and [self-assessment quiz](teaching/quiz.md) to teach each concept back.

## Curriculum

The full 33-chapter index and an eight-week study plan are in the [learning map](docs/00-learning-map.md).

| Stage | Topics | Main deliverable |
|---|---|---|
| Foundations | Identity, HTTP, cookies, browser security | Explain a complete login request |
| Passwords and sessions | Hashing, session rotation, logout | Run the local Express session lab |
| Tokens | JWT validation, refresh rotation, revocation | Draw and test a token lifecycle |
| Access control | Ownership, RBAC, tenant isolation | Write denied-access tests |
| Account lifecycle | Verification, recovery, MFA, passkeys | Threat-model recovery |
| Federation | OAuth 2.0, OIDC, PKCE | Review a provider flow |
| Operations | Testing, deployment, debugging, incidents | Produce a security review with evidence |
| Teaching | Glossary, flashcards, quiz, lesson plan | Teach concepts without memorized wording |

## Repository map

~~~text
AuthMaster/
├── docs/                         # Numbered chapters and deep dives
├── labs/session-auth-api/        # Express + MongoDB session-auth lab
│   ├── src/                      # App, routes, config, model
│   ├── test/                     # Starter validation test and test plan
│   ├── SECURITY-NOTES.md         # Explicit gaps and safe-use boundaries
│   └── POSTMAN-EXAMPLES.md       # Local HTTP examples
├── exercises/                    # Core, advanced, and week-by-week tasks
├── diagrams/                     # Mermaid flow and trust-boundary diagrams
├── teaching/                     # Lesson template, flashcards, quiz
├── checklists/                   # Mastery and security review
├── resources/                    # Standards and official documentation
├── .github/workflows/            # Lightweight repository checks
├── CONTRIBUTING.md
└── SECURITY.md
~~~

## Lab quick start

Requirements: Node.js 20+ and a local/development MongoDB instance.

1. Open the [lab README](labs/session-auth-api/README.md).
2. Copy the .env.example file to .env.
3. Generate a random secret with:

   ~~~bash
   node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
   ~~~

4. Put the generated value in .env as SESSION_SECRET. Never commit .env.
5. Set MONGODB_URI to a development database.
6. From labs/session-auth-api, run npm install.
7. Run npm run dev.
8. Follow [the local HTTP examples](labs/session-auth-api/POSTMAN-EXAMPLES.md).
9. Run npm test and read [the test plan](labs/session-auth-api/test/README.md).

Do not use real credentials or expose the lab to the public internet. The automated suite covers credential validation, startup configuration, basic HTTP headers, malformed/oversized request bodies, and safe invalid-input responses. It does **not** prove the full authentication flow is secure.

## Security principles

- Never store plaintext passwords; use a maintained password-hashing library.
- Use HTTPS in deployed environments.
- Treat session IDs, passwords, reset tokens, and access/refresh tokens as secrets.
- Enforce authorization on the backend for every protected operation.
- A signed JWT is not encrypted by default; decoding is not verification.
- CORS is not authentication and is not a complete CSRF defense.
- Rate-limit login and registration; production limits need a shared store and monitoring.
- Invalidate server-side session state on logout.
- Test expired, revoked, malformed, replayed, and unauthorized requests—not only success.
- Prefer a maintained identity provider when it is safer than implementing a protocol yourself.
- Do not deploy the lab without adding the controls in [SECURITY-NOTES.md](labs/session-auth-api/SECURITY-NOTES.md) and obtaining an appropriate security review.

## Study rhythm

**Learn → define → draw → implement → test failure cases → explain → teach.**

For every feature, answer:
1. What problem does it solve?
2. Which component makes the security decision?
3. What state or credential is stored, and where?
4. What happens on expiry, logout, replay, and failure?
5. Which test proves the protection works?
6. What risks remain?

## Documentation and practice index

- [Complete learning map](docs/00-learning-map.md)
- [Official standards and documentation](resources/README.md)
- [Mastery checklist](checklists/mastery-checklist.md)
- [Security review checklist](checklists/security-review.md)
- [Advanced scenario exercises](exercises/advanced-scenarios.md)
- [Week-by-week project plan](exercises/week-by-week-projects.md)
- [Lesson template](teaching/lesson-template.md)
- [Flashcards](teaching/flashcards.md)
- [Self-assessment quiz](teaching/quiz.md)
- [Capstone project](docs/31-capstone-auth-service.md)
- [Contributing guide](CONTRIBUTING.md)
- [Security policy](SECURITY.md)

## License

MIT for the educational materials and starter code in this repository. Third-party references remain the property of their respective owners.
