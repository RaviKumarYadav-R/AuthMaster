# 14 — Authentication and Security Glossary

Use these definitions consistently when explaining AuthMaster to another developer.

| Term | Meaning | Important distinction |
|---|---|---|
| Principal | Entity making a request, usually a user or service | Authentication does not grant every permission |
| Identity | Account or subject a system recognizes | An email address alone is not proof of identity |
| Credential | Evidence used to authenticate | Passwords, passkeys, security keys, and tokens differ |
| Authentication | Verifying a claimed identity or authenticator | Does not decide access to every resource |
| Authorization | Deciding whether an action is allowed | Must be enforced by the server |
| Session | Server-recognized state spanning requests | Often represented by an opaque cookie |
| Cookie | Browser-managed data with attributes | A storage/transport mechanism, not a complete security policy |
| Bearer token | Credential usable by whoever possesses it | Theft can enable impersonation |
| JWT | Token format containing claims and optional signing/encryption | A signed JWT is not encrypted by default |
| Access token | Credential presented to a resource server | Audience and scope must match the resource |
| Refresh token | Credential used to obtain new access credentials | Needs strong protection, rotation, and revocation |
| Password hash | Verifier derived using a password-hashing algorithm | Not reversible encryption |
| Salt | Random input used by password hashing | Not a secret; modern libraries manage it |
| MFA | Authentication using multiple factor categories | Two passwords are not two independent categories |
| CSRF | Abuse of automatically attached browser credentials | Different from stealing a credential |
| XSS | Attacker-controlled script executing in a trusted origin | HttpOnly does not prevent script from making authenticated requests |
| CORS | Browser policy for cross-origin script access to responses | Not authentication or authorization |
| PKCE | Binds authorization-code redemption to a client-generated verifier | Protects authorization-code flows |
| OIDC | Identity layer built on OAuth 2.0 | Adds authentication semantics and ID tokens |
| Revocation | Making a credential no longer acceptable | Self-contained tokens are not automatically revocable |
| Least privilege | Granting only necessary access | Applies to users, services, keys, and database permissions |
| Threat model | Analysis of assets, attackers, boundaries, and mitigations | A checklist alone is not a context-specific analysis |

## Explain the differences

**Authentication vs authorization:** A valid login proves the application recognizes a principal. It does not prove that principal owns note 123. The API must check ownership or sharing permissions.

**Encoding vs encryption vs signing:** Encoding changes representation; encryption aims to preserve confidentiality; a signature or MAC helps verify integrity/authenticity. Base64URL does not hide a JWT payload.

**Cookie vs session:** A cookie is browser-managed data sent with matching requests. A session is server-side state. A cookie may carry an opaque session ID.

**OAuth vs OIDC:** OAuth 2.0 is primarily an authorization framework. OIDC adds an identity layer.

## Self-test

For every term, create an example and a non-example. If you cannot explain a term without another undefined term, revisit the chapter.

## How to master the vocabulary

For each term, learn its plain-language definition, where it appears in the request flow, and one common misconception. Use these distinctions actively rather than memorizing isolated definitions.

- Authentication vs authorization: proof of identity versus permission to act.
- OAuth vs OIDC: delegated authorization versus an identity layer built on OAuth.
- JWT vs session: token format versus a server-managed session architecture.
- Encoding vs encryption vs hashing: representation, confidentiality transformation, and one-way digest operation.
- CORS vs CSRF: browser response-reading policy versus cross-site request abuse.
- 401 vs 403: invalid/missing authentication versus a denied permission decision, subject to API contract.
- Access token vs ID token: API access credential versus client-facing authentication assertion.
- Cookie vs session: browser transport/storage mechanism versus server-side state.
- Password reset vs password change: recovery with alternate proof versus authenticated credential update.
- MFA vs two-step verification: multiple steps do not necessarily represent independent factors.

### Retrieval exercise
Choose ten terms randomly. Explain each without notes, give an HTTP or code example, and identify one misconception. Mark weak answers for review after the next implementation exercise.

