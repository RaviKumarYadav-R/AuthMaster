# 00 — Complete Learning Map

## The 12-phase path

| Phase | Topics | Suggested time | Deliverable |
|---|---|---:|---|
| 1 | Identity, authentication, authorization, lifecycle | 2 days | Explain login without code |
| 2 | HTTP, TLS, cookies, browser storage, CORS, CSRF | 3 days | Annotated request/response flow |
| 3 | Password hashing and abuse controls | 3 days | Password verification lab |
| 4 | Sessions, cookie flags, expiry, revocation | 4 days | Working session-auth API |
| 5 | JWT structure, claims, signing, validation | 4 days | JWT validation checklist |
| 6 | Access/refresh tokens, rotation, reuse detection | 4 days | Refresh lifecycle diagram |
| 7 | RBAC, ownership, tenant isolation | 3 days | Authorization tests |
| 8 | Email verification and account recovery | 3 days | Recovery threat model |
| 9 | Production architecture, secrets, monitoring | 5 days | Architecture decision record |
| 10 | OAuth 2.0, OIDC, PKCE | 5 days | Provider integration plan |
| 11 | Threat modeling and security tests | 5 days | Security test matrix |
| 12 | Capstone and teaching preparation | 7 days | Demo, docs, lesson plan |

These are planning estimates, not guarantees. Revisit difficult topics and check current standards.

## Learning order

**Learn sessions before JWT.** Sessions make the browser/server trust relationship concrete. JWT is a token format, not a complete authentication architecture. After understanding both, compare operational trade-offs.

## Readiness gates

Before moving on, explain the topic plainly, draw the request flow and trust boundaries, implement a small example using maintained libraries, demonstrate at least three failure cases, explain mitigations, and answer a beginner's questions without memorized wording.
