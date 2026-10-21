# Practice Exercises

Complete these in order. Commit each exercise separately and include a short explanation in the commit message.

## Fundamentals
1. Explain authentication vs authorization using a notes app.
2. Draw the lifecycle from signup to logout.
3. Inspect HTTP request and response headers.

## Passwords
4. Implement password hashing and verification with a maintained library.
5. Add tests for incorrect password and malformed hash.
6. Add login rate limiting and explain its distributed-deployment limitations.

## Sessions
7. Implement login, `/auth/me`, and logout.
8. Test that logout invalidates the old session.
9. Test session ID regeneration after login.
10. Document cookie flags and CSRF protections.

## Tokens
11. Write a JWT verification checklist.
12. Explain why a signed JWT is not encrypted.
13. Design refresh-token rotation and reuse detection.
14. Write a test plan for concurrent refresh requests.

## Authorization
15. Prevent cross-user note access.
16. Implement read-only sharing.
17. Test tenant isolation and role escalation.

## Recovery and federation
18. Design a single-use password reset token.
19. Threat-model email change.
20. Draw an OIDC Authorization Code + PKCE flow.

## Teaching
21. Teach sessions in five minutes.
22. Compare sessions and JWTs without saying one is always better.
23. Review a deliberately flawed authentication implementation and document the risks.
