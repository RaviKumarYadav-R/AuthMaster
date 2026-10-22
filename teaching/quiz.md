# AuthMaster Self-Assessment Quiz

Answer before reading the key. For each answer, explain why the other options are wrong.

## Questions

1. Authentication answers:
   - A. Which records can a user delete?
   - B. Whether the system recognizes a claimed identity
   - C. Whether a browser may read a cross-origin response

2. A signed JWT payload is:
   - A. Always encrypted
   - B. Safe to put secrets in
   - C. Usually readable by anyone holding the token

3. HttpOnly:
   - A. Prevents JavaScript from reading the cookie through normal browser APIs
   - B. Prevents all XSS
   - C. Replaces authorization checks

4. CORS:
   - A. Authenticates API callers
   - B. Is a browser cross-origin response-access policy
   - C. Replaces CSRF protections in every architecture

5. After logout from a server-side session system, the strongest expected property is:
   - A. The UI hides the profile
   - B. The cookie is removed only from one tab
   - C. Server-side session state is invalidated and replay of the old ID is rejected

6. A private resource endpoint should:
   - A. Trust the user ID supplied by React
   - B. Enforce ownership/permission on the server
   - C. Rely on a hidden button

7. OAuth 2.0 is best described as:
   - A. An authorization framework
   - B. A password hashing algorithm
   - C. A cookie attribute

8. For OIDC account identity, a stable external key is generally:
   - A. Email alone
   - B. The validated issuer and subject pair
   - C. The display name

9. A refresh token should be treated as:
   - A. Public profile data
   - B. A high-value credential requiring protection and lifecycle controls
   - C. A harmless analytics identifier

10. A test that gets 403 is incomplete if it does not also verify:
    - A. The denied request did not mutate protected state
    - B. The page has a logo
    - C. The API is written in TypeScript

## Answer key

1. B — authentication verifies identity; authorization determines allowed actions.
2. C — signing does not imply confidentiality.
3. A — it reduces direct cookie extraction but does not eliminate XSS impact.
4. B — CORS is not authentication and is not a complete CSRF defense.
5. C — logout must invalidate server-side state when using server-side sessions.
6. B — client state is not authority.
7. A — OIDC adds an identity layer to OAuth 2.0.
8. B — email may change and may not be verified.
9. B — theft can enable new access credentials.
10. A — verify state and side effects, not only the status code.
