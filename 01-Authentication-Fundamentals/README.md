# AuthMaster — Topic-by-Topic Curriculum

This curriculum adopts the folder-per-topic, deep-teaching approach of [JavaScript Zero to Master](https://github.com/RaviKumarYadav-R/javascript-zero-to-master): learn, visualize, trace, predict, run, compare, debug, practice, build, teach, review, master.

## Learning loop

```text
Learn → Understand → Visualize → Trace → Predict → Run → Compare → Debug → Practice → Build → Teach → Review → Master
```

## Numbered chapters

| # | Topic | Core idea |
|---:|---|---|
| 01 | [Identity, Identification, Authentication, Authorization](./01-Identity-and-Authentication/README.md) | An identifier claims an account; an authenticator proves control; authorization decides which actions are permitted. |
| 02 | [HTTP Requests, Responses, HTTPS, and Trust Boundaries](./02-HTTP-and-Request-Lifecycle/README.md) | Auth flows depend on methods, headers, bodies, cookies, status codes, TLS termination, proxies, and durable state. |
| 03 | [Password Hashing, Verification, and Abuse Controls](./03-Password-Security/README.md) | Password storage should resist offline guessing after a database leak. |
| 04 | [Registration, Validation, and Duplicate-Account Races](./04-Registration-and-Validation/README.md) | Client validation is for usability; server validation and database constraints protect integrity. |
| 05 | [Session Creation, Rotation, Expiry, and Logout](./05-Server-Side-Sessions/README.md) | A session connects requests after login while allowing server-side expiry and revocation. |
| 06 | [Cookie Attributes, CSRF, CORS, and XSS Boundaries](./06-Cookies-CSRF-and-CORS/README.md) | Cookie policies, CORS, CSRF defenses, and XSS controls solve different problems. |
| 07 | [Authentication Middleware and Current-User Endpoints](./07-Authentication-Middleware/README.md) | A protected route needs a consistent way to resolve a credential into a verified principal. |
| 08 | [Ownership, Roles, Permissions, and Multi-Tenant Access](./08-Authorization-and-Tenant-Isolation/README.md) | A valid login does not prove entitlement to a specific document, tenant, invoice, or action. |
| 09 | [JWT Structure, Claims, Validation, and Key Management](./09-JWT-and-Access-Tokens/README.md) | A JWT is a token format, not a complete authentication system. Decoding is not verification. |
| 10 | [Refresh Tokens, Rotation, Replay, and Concurrency](./10-Refresh-Tokens-and-Rotation/README.md) | Rotation can detect replay only when one-time consumption is atomic and the reuse policy is explicit. |
| 11 | [Email Verification, Password Reset, and Recovery](./11-Account-Verification-and-Recovery/README.md) | Recovery is an authentication path and must not be weaker than ordinary login. |
| 12 | [OAuth 2.0, OIDC, Authorization Code, and PKCE](./12-OAuth-and-OpenID-Connect/README.md) | OAuth delegates authorization; OpenID Connect adds an identity layer. Tokens have different purposes. |
| 13 | [MFA, TOTP, Recovery Codes, and Passkeys](./13-MFA-and-Passkeys/README.md) | Strong authenticators require secure enrollment, recovery, device replacement, and removal flows. |
| 14 | [Security Testing, Negative Tests, and Threat Modeling](./14-Testing-and-Threat-Modeling/README.md) | Security claims become useful when tied to threats, controls, and reproducible tests. |
| 15 | [Production Readiness, Secrets, Monitoring, and Incidents](./15-Production-Operations-and-Incident-Response/README.md) | Identity security depends on deployment, keys, stores, monitoring, restoration, and practiced incident response—not only route handlers. |

## Files in each topic folder

- `README.md`: motivation, mental model, request flow, internals, rules, mistakes, debugging, and mastery gate.
- `examples.js`: runnable Node.js examples or explicitly labelled teaching pseudocode.
- `exercises.md`: recall, prediction, implementation, debugging, design, and teach-back.
- `solutions.md`: reasoning and guided solutions; attempt exercises first.

## Recommended study process

1. Read slowly and define unfamiliar terms.
2. Draw the flow from memory.
3. Predict example output before running it.
4. Run the code and explain each important line.
5. Complete the exercises without copying the solution.
6. Add at least one negative test.
7. Teach the concept in five minutes.
8. Record limitations and remaining risks.

## Safety boundary

The existing [session-auth API lab](../labs/session-auth-api/README.md) is educational, not production-ready. Read its security notes. Use synthetic credentials only and do not expose the lab publicly without a security review.

## Deep-dive companion guides

Every chapter now includes a `DEEP-DIVE.md` guide. Use it after the chapter README for a more demanding study cycle: mental model → lifecycle trace → security invariants → implementation plan → failure modes → test matrix → debugging → teach-back → spaced review.

| # | Deep dive |
|---:|---|
| 01 | [Identity and Authentication](./01-Identity-and-Authentication/DEEP-DIVE.md) |
| 02 | [HTTP and Request Lifecycle](./02-HTTP-and-Request-Lifecycle/DEEP-DIVE.md) |
| 03 | [Password Security](./03-Password-Security/DEEP-DIVE.md) |
| 04 | [Registration and Validation](./04-Registration-and-Validation/DEEP-DIVE.md) |
| 05 | [Server-Side Sessions](./05-Server-Side-Sessions/DEEP-DIVE.md) |
| 06 | [Cookies, CSRF, and CORS](./06-Cookies-CSRF-and-CORS/DEEP-DIVE.md) |
| 07 | [Authentication Middleware](./07-Authentication-Middleware/DEEP-DIVE.md) |
| 08 | [Authorization and Tenant Isolation](./08-Authorization-and-Tenant-Isolation/DEEP-DIVE.md) |
| 09 | [JWT and Access Tokens](./09-JWT-and-Access-Tokens/DEEP-DIVE.md) |
| 10 | [Refresh Tokens and Rotation](./10-Refresh-Tokens-and-Rotation/DEEP-DIVE.md) |
| 11 | [Account Verification and Recovery](./11-Account-Verification-and-Recovery/DEEP-DIVE.md) |
| 12 | [OAuth and OpenID Connect](./12-OAuth-and-OpenID-Connect/DEEP-DIVE.md) |
| 13 | [MFA and Passkeys](./13-MFA-and-Passkeys/DEEP-DIVE.md) |
| 14 | [Testing and Threat Modeling](./14-Testing-and-Threat-Modeling/DEEP-DIVE.md) |
| 15 | [Production Operations](./15-Production-Operations-and-Incident-Response/DEEP-DIVE.md) |

## Study support

- [Mastery and spaced-learning system](../docs/35-master-learning-system.md)
- [End-to-end reference architecture](../docs/36-end-to-end-reference-architecture.md)
- [Authentication glossary](../docs/37-authentication-glossary-in-depth.md)
- [Flow diagrams](../diagrams/authentication-flow-diagrams.md)
- [Teach-back rubric](../teaching/teach-back-rubric.md)
- [Spaced-repetition flashcards](../teaching/spaced-repetition-flashcards.md)
- [Production security gates](../checklists/production-security-gates.md)

