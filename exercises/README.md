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

## How to complete every exercise

For each exercise, create a small branch or focused commit. Before coding, write the expected behavior, draw the flow, identify untrusted input, and list at least one failure case. After coding, run the test, inspect the diff, and explain what the change does not protect against. Use synthetic data only.

## Expanded practice ladder

### Level 1 — Understand
- Define the core terms without notes.
- Draw registration, login, authenticated request, and logout.
- Annotate a request and response with method, status, headers, body, and cookie behavior.

### Level 2 — Implement
- Validate input server-side.
- Hash and verify passwords using a maintained library.
- Implement a server-side session and safe current-user response.
- Write a predictable API contract for success and failure.

### Level 3 — Break safely
- Try malformed JSON, missing fields, unexpected role fields, wrong credentials, expired sessions, and old-cookie replay.
- Change a resource ID to test cross-user authorization.
- Attempt reuse of a one-time recovery or refresh token in a test environment.

### Level 4 — Test and explain
- Add regression tests for each discovered issue.
- Assert denied requests do not mutate state.
- Draw a threat boundary and explain one design trade-off.
- Teach the concept in five minutes and answer follow-up questions.

## Evidence required for an exercise to count as complete

A commit or note should include: objective, implementation summary, test command, expected result, observed result, failure case tested, and remaining limitation. A green test alone is not sufficient evidence that a system is production secure.

