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
