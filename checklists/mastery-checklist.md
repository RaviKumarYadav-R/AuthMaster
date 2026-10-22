# AuthMaster Mastery Checklist

## Fundamentals
- [ ] Explain identity, credential, authentication, authorization, and session.
- [ ] Draw the full account lifecycle.
- [ ] Explain why each protected request must be validated.

## Browser security
- [ ] Explain HttpOnly, Secure, SameSite, CORS, CSRF, and XSS.
- [ ] Identify which values are visible to JavaScript.
- [ ] Explain why HTTPS is required in deployment.

## Passwords and sessions
- [ ] Use a maintained password-hashing library.
- [ ] Test correct and incorrect password verification.
- [ ] Regenerate session ID after login.
- [ ] Invalidate server-side session on logout.
- [ ] Explain idle timeout and absolute expiry.

## Tokens and authorization
- [ ] Validate JWT signature, algorithm, expiry, issuer, and audience as applicable.
- [ ] Explain that signed JWT payloads are not encrypted by default.
- [ ] Explain refresh rotation, revocation, and reuse detection.
- [ ] Test ownership and tenant isolation on the server.

## Recovery, protocols, operations
- [ ] Use single-use, expiring recovery tokens.
- [ ] Explain OAuth 2.0 vs OIDC and PKCE.
- [ ] Threat-model the most important account flows.
- [ ] Keep credentials out of logs and source control.
- [ ] Document monitoring, revocation, and incident response.

## Teaching readiness
- [ ] Explain a topic without notes.
- [ ] Draw it and answer beginner questions.
- [ ] Demonstrate at least three failure cases.

## Advanced mastery evidence

### Account lifecycle
- [ ] Define verification, password change, recovery, MFA enrollment/removal, account disablement, deletion, and session-revocation behavior.
- [ ] Test recovery-token expiry, replay, wrong purpose, and concurrent redemption.
- [ ] Explain account-enumeration trade-offs and generic error policy.

### JWT and federation
- [ ] Write a validation policy before implementing JWT middleware.
- [ ] Test signature, algorithm, issuer, audience, expiry, not-before, required claims, and token purpose.
- [ ] Explain key rotation and compromise response.
- [ ] Draw Authorization Code with PKCE and identify state, nonce, code, verifier, ID token, and access token.
- [ ] Explain safe external identity mapping and account linking.

### Testing and operations
- [ ] Use unit, integration, browser, abuse, and operational tests appropriately.
- [ ] Demonstrate cross-user and cross-tenant denial without state mutation.
- [ ] Explain session-store and rate-limit behavior across multiple instances.
- [ ] Keep secrets out of source control, client bundles, logs, and reports.
- [ ] Demonstrate a backup restore or document a tested restore plan.
- [ ] Identify incident owners, revocation mechanisms, and alert signals.

### Independent mastery gate
- [ ] Draw the core flows without notes.
- [ ] Implement a small feature without blindly copying a solution.
- [ ] Write at least three negative tests for the feature.
- [ ] Explain one alternative and its trade-offs.
- [ ] Identify residual risks and avoid unsupported claims of production readiness.

