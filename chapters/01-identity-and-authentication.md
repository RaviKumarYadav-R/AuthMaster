# Chapter 01 — Identity and Authentication

## Why this matters
Before choosing cookies, JWTs, OAuth, or a database schema, define the problem. **Authentication** answers “Which identity is this request acting as?” **Authorization** answers “May this identity perform this action on this resource?” They are related but not interchangeable.

A user being signed in does not mean they can read every record. Hiding an admin button does not protect the API endpoint. The server must enforce access policy where the protected resource is accessed.

## Learning outcomes
By the end, you should be able to:
- Explain identity, authentication, session, credential, and authorization.
- Draw a login flow from browser to API to data store.
- Identify which component is trusted to make each decision.
- Explain why “logged in” is not the same as “allowed.”
- List common authentication failure cases.

## Vocabulary
| Term | Plain-English meaning | Example |
|---|---|---|
| Identity | Account or principal an action is associated with | User ID `usr_123` |
| Identifier | Value used to locate an account | Email or username |
| Credential | Evidence used to prove control | Password or passkey |
| Authentication (AuthN) | Verifying an identity claim | Verify a password hash |
| Authorization (AuthZ) | Checking permission for an action | May this user edit this note? |
| Principal | Identity context used for access decisions | User ID plus attributes |
| Session | State representing an authenticated interaction | Server-side session |
| Token | Value representing a claim, capability, or reference | Reset token or access token |
| Trust boundary | Crossing between components with different trust levels | Browser to backend |
| Least privilege | Grant only the access required | Normal user cannot manage users |

## Mental model
An office badge reader checks who you are: authentication. A door policy checks whether your badge permits entry to a room: authorization. Passing the lobby does not grant access to the server room.

The analogy has limits. Web credentials can be stolen, requests can be handcrafted, and access may depend on the exact resource. Never treat a visible username or frontend state variable as proof.

## Login and protected-request flow
```text
Browser                   Backend API                User store
   | POST /login                |                         |
   | identifier + password      |                         |
   |--------------------------->| find account            |
   |                            |------------------------>|
   |                            | account record/hash     |
   |                            |<------------------------|
   |                            | verify password safely  |
   |                            | create fresh session    |
   | Set-Cookie / response      |                         |
   |<---------------------------|                         |
   |                            |                         |
   | GET /me + session cookie   | validate session        |
   |--------------------------->| enforce access policy   |
   | profile response           |                         |
   |<---------------------------|                         |
```

This is conceptual, not production-ready code. A real deployment uses HTTPS and a carefully configured session mechanism.

### Step-by-step
1. Browser sends login input over HTTPS in a deployed application.
2. Backend validates request shape and applies abuse controls.
3. Backend finds the account using a normalized identifier.
4. A maintained password-hashing library verifies the password against the stored hash. The server must not decrypt or compare a plaintext password from storage.
5. On success, the backend establishes authenticated state, such as a new server-side session.
6. Browser receives a session cookie according to the configured policy.
7. On protected requests, the backend validates the session and derives the principal from trusted state.
8. The backend checks authorization for the exact action and resource before reading or changing data.

## Two decision gates
```text
Incoming request
      |
      v
Valid authentication evidence?
  | no                    | yes
  v                       v
Reject / challenge    Establish principal
                           |
                           v
                 Is this action allowed?
                    | no          | yes
                    v             v
                  Deny         Perform action
```

A 401 generally means authentication is missing or invalid; a 403 generally means access is not permitted. An application may use generic responses to avoid leaking sensitive information.

## Security invariants
- Backend does not trust the browser to declare the authenticated user ID.
- Every protected operation checks authentication.
- Every resource operation checks authorization for that resource.
- Passwords are never stored in plaintext.
- Session identifiers and secrets are not written into logs.
- Failed authentication does not leave a privileged session active by accident.

## Common mistakes
**“The React route is protected, so the data is protected.”** Users can call API endpoints directly. Test the endpoint without a session.

**“The user has a valid session, so any resource ID is okay.”** This can create IDOR/BOLA. Sign in as User A and attempt to read or modify User B's resource.

**“A JWT is encrypted, so nobody can read it.”** Many JWTs are signed, not encrypted; payloads are often readable. Learn encoding, signing, and encryption as distinct concepts.

**“Hiding a button is authorization.”** UI visibility is not a trusted enforcement point. Call the endpoint directly as a low-privilege user.

## Practice
1. Define authentication, authorization, credential, principal, and session in your own words.
2. Draw a sequence diagram for login followed by editing a note. Label browser, API, session store, and database.
3. List requests the backend should reject: missing session, expired session, cross-user resource, normal user attempting admin action, malformed body. Explain each expected outcome.
4. Would a role stored only in browser state be enough to grant admin access? Why or why not?

## Review questions
1. Difference between identifier and credential?
2. Why isn't authentication sufficient to protect user-owned records?
3. Where should the final authorization check occur?
4. Why is a frontend route guard not a security boundary?
5. What is a trust boundary?
6. Name three failure paths to test.

## Teach-back and mastery gate
Teach the office-building analogy, then draw the request flow without looking. Explain why the backend must check both who the actor is and whether the requested action is allowed. Demonstrate how to test an unauthenticated request and a cross-user resource request.

## Implementation status
This is a conceptual lesson; it does not claim a complete login implementation exists. The progressive implementation is defined in [the capstone plan](../projects/CAPSTONE.md).
