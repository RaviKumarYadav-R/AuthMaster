# AuthMaster Progress Tracker

Use this file as a lightweight checkpoint. Tick a box only after you have completed the work and can explain it without reading the chapter. Commit your progress periodically so you can return to the exact point where you stopped.

## Foundations

- [ ] Read [Start Here](START-HERE.md)
- [ ] Read [the course map](COURSE-MAP.md)
- [ ] Read the [study method](docs/01-study-method.md)
- [ ] Complete Identity and Authentication
- [ ] Complete HTTP and Request Lifecycle
- [ ] Explain authentication vs. authorization vs. identification
- [ ] Draw a browser-to-server request lifecycle
- [ ] Explain cookies, CORS, CSRF, and XSS at a high level

## Passwords and sessions

- [ ] Complete Password Security
- [ ] Complete Registration and Validation
- [ ] Explain password hashing, salts, and work factors
- [ ] Build and test registration and login locally
- [ ] Complete Server-Side Sessions
- [ ] Explain session creation, rotation, expiry, and destruction
- [ ] Complete Cookies, CSRF, and CORS
- [ ] Test logout and session invalidation

## Middleware and authorization

- [ ] Complete Authentication Middleware
- [ ] Complete Authorization and Tenant Isolation
- [ ] Test missing, invalid, and expired identity
- [ ] Test resource ownership and role boundaries
- [ ] Verify authorization is enforced on the server

## Tokens

- [ ] Explain JWT header, payload, and signature
- [ ] Distinguish encoding, hashing, encryption, and signing
- [ ] Validate token signature, algorithm, issuer, audience, and expiry
- [ ] Explain access tokens vs. refresh tokens
- [ ] Implement refresh rotation in a local lab
- [ ] Test replay, revocation, expiry, and concurrent refresh behavior
- [ ] Compare session and token architectures

## Advanced identity

- [ ] Explain OAuth 2.0 roles and Authorization Code + PKCE
- [ ] Explain the difference between OAuth 2.0 and OpenID Connect
- [ ] Explain state, nonce, issuer, audience, and redirect URI validation
- [ ] Study MFA, recovery codes, and passkeys
- [ ] Explain account linking and recovery risks

## Security and operations

- [ ] Create a threat model for the capstone
- [ ] Complete the security review checklist
- [ ] Test brute-force protections and safe error responses
- [ ] Test IDOR/BOLA and privilege escalation scenarios
- [ ] Review secrets, HTTPS, cookies, logs, and rate limits
- [ ] Document deployment assumptions and residual risks
- [ ] Complete the capstone project
- [ ] Write an architecture decision record explaining key trade-offs

## Teaching mastery

- [ ] Explain each core concept from memory
- [ ] Draw each important flow without looking at the repository
- [ ] Solve the chapter exercises without copying the solution
- [ ] Debug one deliberately broken implementation
- [ ] Teach a 5–10 minute lesson on sessions
- [ ] Teach a 5–10 minute lesson on JWT and refresh tokens
- [ ] Teach a 5–10 minute lesson on authorization
- [ ] Revisit difficult flashcards after 1, 3, 7, and 14 days

## Weekly review

Copy this block into your own notes at the end of each week:

- **Topics completed:**
- **What I can explain from memory:**
- **What I built:**
- **Tests I ran:**
- **Failure I debugged:**
- **Security misconception corrected:**
- **Topics still confusing:**
- **Next week's concrete goal:**

## Definition of done

A chapter is complete only when you can explain its purpose, trace its lifecycle, implement a small example, test success and failure cases, identify its limitations, and teach it back. Reading alone does not count as mastery.
