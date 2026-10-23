# Start Here — AuthMaster

Welcome to **AuthMaster**, a chapter-based course for understanding authentication deeply enough to build, debug, review, and teach secure web applications.

This repository is a learning curriculum and lab collection. It is **not** a production-ready identity provider. Never expose a learning lab to the public internet or reuse its secrets in a real service.

## The learning loop

For every chapter, follow this order:

1. **Understand** — read the chapter overview and define unfamiliar terms.
2. **Trace** — draw the request lifecycle and identify trust boundaries.
3. **Implement** — write the example yourself instead of only copying it.
4. **Break safely** — test invalid input, expired credentials, missing identity, and denied access.
5. **Explain** — describe why the implementation works and what it does not protect against.
6. **Teach back** — explain the concept without looking at the notes.

## Your first 7 sessions

| Session | Work | Evidence you should produce |
|---|---|---|
| 1 | Read [the learning map](docs/00-learning-map.md) and [study method](docs/01-study-method.md) | A personal plan and glossary |
| 2 | Study [authentication fundamentals](docs/02-authentication-fundamentals.md) | Explain identity, authentication, and authorization |
| 3 | Study [HTTP and browser security](docs/03-http-browser-security.md) | Draw a browser-to-server request |
| 4 | Start [Identity and Authentication](01-Authentication-Fundamentals/01-Identity-and-Authentication/README.md) | Complete its exercises |
| 5 | Study [HTTP and Request Lifecycle](01-Authentication-Fundamentals/02-HTTP-and-Request-Lifecycle/README.md) | Trace headers, cookies, status codes, and errors |
| 6 | Read [Password Security](docs/04-password-security.md) | Explain why passwords are hashed, not encrypted |
| 7 | Review your notes, redo exercises from memory, and update [progress](PROGRESS.md) | A short teach-back recording or written explanation |

Do not rush to JWT. First understand HTTP, browser state, password verification, and server-side sessions.

## Main navigation

- [Complete course map](COURSE-MAP.md)
- [Detailed learning map](docs/00-learning-map.md)
- [Study method](docs/01-study-method.md)
- [Chapter-by-chapter learning and teaching path](docs/35-chapter-by-chapter-learning-and-teaching-path.md)
- [Master learning system](docs/35-master-learning-system.md)
- [End-to-end reference architecture](docs/36-end-to-end-reference-architecture.md)
- [Authentication glossary](docs/37-authentication-glossary-in-depth.md)
- [Chapter expansion roadmap](docs/38-chapter-expansion-roadmap.md)
- [Session-auth API lab](labs/session-auth-api/README.md)
- [Mastery checklist](checklists/mastery-checklist.md)
- [Security review checklist](checklists/security-review.md)
- [Teaching resources](teaching/)

## How to know you have mastered a chapter

You are not finished just because the code runs. You should be able to:

- Explain the problem the mechanism solves.
- Draw its lifecycle from memory.
- Implement a small example without copying.
- Test a successful case and relevant failure cases.
- Identify its security boundaries and limitations.
- Debug a deliberately broken version.
- Teach the idea in simple language.

## Local lab safety

Before running the lab, read [its README](labs/session-auth-api/README.md) and [security notes](labs/session-auth-api/SECURITY-NOTES.md). Use a local development database, a unique random secret, and fake test accounts. Do not commit `.env`, passwords, tokens, private keys, or real user data.

**Course principle:** Learn the security model first, implement the mechanism second, and test the failure cases before calling it complete.
