# AuthMaster — Learn Authentication Deeply

A hands-on curriculum for learning web authentication, authorization, browser security, and production identity flows — then teaching them to another developer.

> **Educational repository, not a drop-in production identity platform.** Review security notes and obtain a security review before using authentication code in a real application.

## Learning outcomes

- Explain authentication vs. authorization and the account lifecycle.
- Understand HTTP, cookies, browser security, CORS, CSRF, and HTTPS.
- Hash and verify passwords using a dedicated password-hashing algorithm.
- Build session-based authentication and explain its trade-offs.
- Understand JWTs, access tokens, refresh tokens, rotation, and revocation.
- Enforce resource-level authorization on the server.
- Design email verification and password-reset flows.
- Understand OAuth 2.0 and OpenID Connect.
- Test failure cases and teach each concept clearly.

## Suggested stack

JavaScript / Node.js, Express, MongoDB + Mongoose (optional track), React (frontend track), Zod validation, Argon2id password hashing, and server-side sessions for the first implementation.

## Start here

1. Read [`docs/00-learning-map.md`](docs/00-learning-map.md).
2. Follow [`docs/01-study-method.md`](docs/01-study-method.md).
3. Complete chapters in order.
4. Build the session-auth lab in [`labs/session-auth-api/`](labs/session-auth-api/).
5. Prepare lessons with [`teaching/lesson-template.md`](teaching/lesson-template.md).
6. Track progress with [`checklists/mastery-checklist.md`](checklists/mastery-checklist.md).

## Repository map

```text
authmaster/
├── docs/                    # Concepts and architecture
├── labs/session-auth-api/   # Express session-auth teaching lab
├── exercises/               # Deliberate practice
├── diagrams/                # Mermaid diagrams
├── teaching/                # Lesson templates
├── checklists/              # Security and mastery checklists
└── resources/               # Standards and official references
```

## Security principles

- Never store plaintext passwords; use a maintained password-hashing library.
- Use HTTPS in deployed environments.
- Treat browser-held credentials as sensitive.
- Enforce authorization on the backend for every protected operation.
- JWTs are not encrypted by default and are not automatically revocable.
- Rate-limit login, password-reset, and verification endpoints.
- Never log passwords, session IDs, access tokens, or refresh tokens.
- Test denied and expired requests, not only successful login.
- Prefer a maintained identity provider when that is safer than implementing a protocol yourself.

## Study rhythm

**Learn → draw → implement → break → explain → teach.** Understanding a tutorial is not the same as being able to design a secure system independently.

See [`resources/README.md`](resources/README.md) for official documentation and standards.

## License

MIT for the educational materials and starter code in this repository. Third-party references remain the property of their respective owners.
