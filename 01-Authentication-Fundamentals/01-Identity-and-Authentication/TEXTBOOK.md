# Chapter 01 Textbook — Identity, Identification, Authentication, and Authorization

> **Chapter promise:** By the end, you should be able to explain what an application is trying to prove when a user logs in, distinguish authentication from authorization, trace the security decisions in a request, and design tests for common identity mistakes.
>
> **Prerequisites:** None. Examples use ordinary web-application concepts.
>
> **Safety boundary:** This chapter teaches concepts and local learning exercises. Do not use toy examples as production security implementations.

## 0. How to study this chapter

Do not try to memorize every term in one sitting. Use this cycle:

1. Read one section.
2. Close the document and explain it in your own words.
3. Draw the flow with boxes and arrows.
4. Answer the retrieval questions before looking at the answers.
5. Complete the exercise.
6. Explain one misconception to an imaginary beginner.

Write down the difference between what a mechanism **proves**, what it **does not prove**, and which component is trusted to make the decision.

## 1. The core problem: a server cannot see who is holding the browser

Imagine a notes application. A request arrives at the server asking to read note `note-42`.

The server receives bytes: a method, a path, headers, cookies or authorization data, and possibly a body. It does not directly see a person's identity. Values in a request may be missing, malformed, copied, modified, or deliberately forged.

The application therefore needs a process for deciding:

1. **Which account or subject is being referred to?**
2. **What evidence, if any, proves control of that account?**
3. **Was the evidence verified according to a trusted rule?**
4. **What identity context may the server derive from that verification?**
5. **May that identity perform this exact action on this exact resource?**
6. **What should happen when evidence is invalid, expired, revoked, or unavailable?**

Authentication is one part of this larger decision process. It does not replace authorization, validation, or safe handling of failures.

### 1.1 Assets, actors, and trust

Before implementing an authentication feature, identify:

- **Assets:** user data, account access, private notes, administrator operations, reset links, sessions, signing keys.
- **Actors:** anonymous visitor, account owner, administrator, service process, external identity provider, attacker.
- **Entry points:** registration endpoint, login endpoint, cookies, headers, URL parameters, OAuth callback, password-reset form.
- **Trust boundaries:** browser-to-server, application-to-database, application-to-email provider, application-to-identity provider.
- **Security decisions:** credential verification, session validation, resource ownership, role checks, token revocation.

An account name or user ID is not secret proof. A request field named `isAdmin` is not authority. A frontend component that hides an admin button is not an access-control boundary.

## 2. Vocabulary: learn the distinctions

### 2.1 Subject

A **subject** is the entity about which the system makes a security decision. It may be a human user, a service account, a workload, or another system.

Example: a scheduled worker authenticates to a service. No human is currently typing, but the system still needs to identify and authorize a subject.

### 2.2 Account

An **account** is an application's record representing a subject. It may contain an internal identifier, email address, password hash, account status, preferences, and timestamps.

An account record is data. The existence of that record does not prove that the current requester controls it.

### 2.3 Identifier

An **identifier** helps locate or refer to an account.

Examples:
- Email address
- Username
- Internal user ID
- Organization or tenant ID

An identifier answers something like, “Which record are we talking about?” It does not answer, “What evidence proves the requester controls it?”

Identifiers may be public, guessable, or exposed in URLs. Security must not depend on an identifier being hard to guess unless the value is explicitly designed and treated as a secret capability—and ordinary user IDs should not be treated that way.

### 2.4 Credential

A **credential** is data or evidence presented to an authentication process.

Examples include:
- A password
- A one-time code
- A private-key-backed assertion
- A passkey assertion
- A session identifier or bearer token, depending on the protocol and context

Credentials have different security properties. A password is a shared secret that can be phished. A passkey uses a public-key protocol and can offer phishing resistance when correctly implemented. A session cookie is generally a bearer credential: whoever can use it may be able to act as the associated session.

### 2.5 Authenticator

An **authenticator** is a mechanism used to prove control of an authentication factor or cryptographic credential. The exact meaning depends on the authentication system and standard being discussed.

Examples include a password manager supplying a password, an authenticator application generating a TOTP code, or a passkey capable of signing a challenge.

Do not confuse the authenticator with the account identifier. The identifier selects the account; the authenticator provides evidence.

### 2.6 Identification

**Identification** is the act of claiming or selecting an identity.

For example, submitting an email address says, “I want to act as the account associated with this address.” It does not prove control of that account.

### 2.7 Authentication

**Authentication** is the process of evaluating evidence to establish that a claimant controls an account, credential, or identity under the system's defined rules.

Authentication is not absolute proof of a real-world person. A successful password check shows that the requester supplied the password associated with the account; it does not establish that the person is the legal owner, that the password was not stolen, or that every future request remains safe.

### 2.8 Principal

A **principal** is the identity context a system uses when making access decisions after validating the relevant evidence.

A web server may construct a principal containing an internal user ID and carefully derived attributes. Those attributes must come from trusted records or verified claims, not directly from arbitrary request fields.

### 2.9 Authorization

**Authorization** determines whether a principal may perform a particular action on a particular resource under the application's policy.

Example: a user has authenticated successfully, but may read only notes they own or that have been explicitly shared with them.

Authorization decisions should consider the actual resource and action, not simply whether the user is logged in.

### 2.10 Permission, role, and policy

- **Permission:** a named ability, such as `notes:read`.
- **Role:** a bundle of permissions or responsibilities, such as `editor`.
- **Policy:** the rule used to decide whether access is allowed.
- **Ownership:** a relationship between a principal and a resource.
- **Tenant isolation:** the requirement that one organization cannot access another organization's protected data.

A role is not automatically a complete policy. An `editor` role might permit editing a shared note but not reading another tenant's private billing data.

### 2.11 Session

A **session** is server-recognized state associated with a sequence of requests or a period of interaction. In a common web design, the browser holds a session identifier while the server stores session state.

A session identifier must be treated as a credential, not as a harmless tracking string.

### 2.12 Token

A **token** is a value representing some authority or information within a protocol. The word alone does not tell you what the token proves, who issued it, who may accept it, whether it is confidential, or how it is revoked.

Always ask:
- Who issued it?
- Who is the intended recipient?
- What may it be used for?
- How is it validated?
- When does it expire?
- How is it revoked or invalidated?
- Can it be replayed?
- Where is it stored and transported?

## 3. Authentication versus authorization

Consider the request:

`GET /api/notes/note-42`

The application must answer separate questions.

**Authentication question:** Which verified principal is making this request?

**Authorization question:** Is that principal allowed to read `note-42`?

A valid login is not a universal permission grant. If user A can access their own note, it does not follow that user A can access user B's note by changing the URL.

### 3.1 A simple decision model

A protected operation should conceptually follow this sequence:

1. Parse the request safely.
2. Extract the expected credential from the documented channel.
3. Verify the credential using trusted configuration and maintained libraries.
4. Reject the request if verification fails.
5. Construct a principal from verified identity information.
6. Load or safely scope the target resource.
7. Evaluate policy for this principal, action, resource, and tenant.
8. Perform the operation only if authorized.
9. Return a minimal response and record appropriate redacted security events.

The actual implementation depends on the framework and architecture, but the trust boundaries must remain clear.

### 3.2 Pseudocode mental model

This is intentionally conceptual pseudocode, not a production authentication library:

```text
request
  -> parse and validate
  -> extract credential
  -> verify credential
      -> failure: reject
      -> success: verified identity
  -> construct principal
  -> load target resource
  -> evaluate authorization policy
      -> denied: reject
      -> allowed: perform requested action
  -> return response
```

Never skip verification because a request contains `userId`, `role`, `isAuthenticated`, or `isAdmin`.

## 4. A running example: a private notes application

Suppose the database contains:

```js
const note = {
  id: "note-42",
  ownerId: "user-100",
  title: "Private notes",
  body: "Learning material",
};
```

A request contains:

```http
GET /api/notes/note-42
Cookie: session=<session-credential>
```

The server must validate the session and derive the principal from trusted session state. It then checks whether that principal may read the note.

An unsafe implementation might do this:

```js
// UNSAFE: request input is not proof of identity or permission.
const userId = req.body.userId;
const isAdmin = req.body.isAdmin;
```

An attacker can modify their own request body. These fields must not be trusted as authenticated identity or privilege evidence.

A safer design derives identity from verified authentication state:

```js
// Conceptual only: req.auth must be populated by trusted middleware
// after successful credential verification.
const principalId = req.auth.userId;
```

Even this is not enough by itself. The application must still check authorization for the requested note.

For example, a database query can scope the resource by both its ID and the verified owner ID where that matches the product's sharing policy. Shared resources and administrators require explicit, carefully defined policy—not a client-supplied owner ID.

## 5. What authentication does not guarantee

Successful authentication does not automatically guarantee any of the following:

1. The user is authorized to access every resource.
2. The account's email address has been verified.
3. The account is active and has not been suspended.
4. The credential has not been stolen.
5. The current request is safe from CSRF or XSS.
6. The user has consented to a particular operation.
7. The user is a real-world person of a claimed legal identity.
8. The session will remain valid indefinitely.
9. The request body is valid or safe to store.
10. The application is free of authorization bugs.

Each guarantee needs its own evidence, policy, and tests.

## 6. Account states and lifecycle

A system may represent states such as:

- Pending registration
- Email or contact verification pending
- Active
- Temporarily rate-limited
- Locked under a documented policy
- Suspended
- Recovery in progress
- Deactivated
- Deletion pending
- Deleted or anonymized, according to retention requirements

Do not collapse every state into a single boolean without understanding the transitions. A user can authenticate successfully yet still be disallowed from a sensitive operation because the account is suspended or because step-up verification is required.

Document the allowed transitions and the authority that can trigger them. For example, an email-verification link should be single-use and time-limited; an account recovery operation must not accidentally restore privileges to an account that is suspended.

## 7. Threat model: think like a reviewer

For each endpoint, ask what an attacker can control.

### 7.1 Attacker-controlled data

Assume the requester may control:
- URL path and query parameters
- Request body
- Most request headers
- Cookies and authorization headers they send
- The order and timing of requests
- Repeated attempts and malformed payloads
- Client-side JavaScript and local browser state
- IDs copied from their own browser or observed in URLs

The server must not treat these values as trusted merely because they arrived over HTTP.

### 7.2 Common attacks and the mistaken assumption behind them

| Attack or failure | Incorrect assumption | Core defense |
|---|---|---|
| User ID spoofing | A supplied ID identifies the caller | Derive identity from verified credentials |
| Privilege escalation | A client role field is trustworthy | Derive roles from trusted server-side policy |
| IDOR/BOLA | A valid login permits any object ID | Authorize each resource and action |
| Session theft | A cookie is merely metadata | Protect credentials and use secure lifecycle controls |
| Credential stuffing | A password endpoint can accept unlimited attempts | Rate-limit and monitor abuse |
| Account enumeration | Error messages cannot leak account existence | Design responses and timing carefully |
| Replay | A previously valid one-time credential is always reusable | Enforce expiry, consumption, and replay controls |
| Race condition | Two simultaneous requests behave like one request | Use atomic operations or appropriate transactions |
| Dependency outage | Missing state can be treated as success | Fail safely for protected operations |
| Logging leak | Logs are internal, so secrets are harmless there | Redact credentials and sensitive tokens |

### 7.3 Fail closed, with context

For protected operations, inability to verify a credential or required authorization state should normally result in denial, not accidental access. This is commonly described as **failing closed**.

Failing closed does not mean returning a server error for every invalid request. It means that a verification outage, missing session record, or unavailable policy service must not silently grant access. Use appropriate status codes and safe error handling while preserving the security property.

## 8. Status codes and response semantics

Status codes are part of the API contract. Common examples include:

- `200 OK`: the operation succeeded.
- `201 Created`: a resource was created.
- `400 Bad Request`: the request is malformed or invalid under the API contract.
- `401 Unauthorized`: valid authentication credentials are missing or not accepted; the HTTP name is historically confusing because it means unauthenticated in common API usage.
- `403 Forbidden`: the server understood the request but refuses the operation under its policy.
- `404 Not Found`: the resource is absent, or the API intentionally conceals its existence in a documented design.
- `409 Conflict`: the request conflicts with current state, depending on the API contract.
- `429 Too Many Requests`: a rate limit has been reached.
- `500 Internal Server Error`: an unexpected server failure occurred.

Do not use status codes as a substitute for policy design. Some APIs intentionally use similar responses for nonexistent and unauthorized resources to reduce information disclosure. The right choice depends on the threat model, product requirements, and consistent API behavior.

## 9. Why frontend checks are not security boundaries

A React route guard can improve user experience. It can redirect an anonymous visitor away from a dashboard, avoid rendering irrelevant UI, and show loading states while session status is checked.

It cannot protect an API by itself. An attacker can call the API directly without opening the React page.

Use frontend guards for navigation and presentation. Enforce authentication and authorization in the backend for every protected operation. Do not assume that hiding a button makes its endpoint inaccessible.

## 10. A first request-tracing exercise

For a protected note request, draw these components:

- Browser
- Network / HTTPS boundary
- Express route
- Authentication middleware
- Session store or token verifier
- Principal
- Notes service
- Database
- Authorization policy
- Response

Label each arrow with the information crossing it. Mark which values are untrusted and where the principal is created. Then draw failure branches for missing credentials, invalid credentials, expired session, missing note, wrong owner, and database outage.

### Questions to answer

1. Which component verifies the credential?
2. Where does the principal come from?
3. Can the browser choose its own role?
4. Where is ownership checked?
5. What happens if the session store is unavailable?
6. Which information must never appear in logs?
7. Which failures should be covered by automated tests?

## 11. Hands-on exercises

### Exercise A — Classify the value

Classify each value as an identifier, credential, verified identity context, authorization data, or ordinary input. Some values may have different meanings in different protocols; explain your assumptions.

1. Email address in a login form
2. Password submitted to the login endpoint
3. Internal database user ID
4. Session cookie
5. User ID in a request body
6. Role read from trusted server-side account data
7. `isAdmin: true` supplied by a browser
8. Verified identity-token subject claim
9. Note ID in a URL
10. Permission checked by a server-side policy

For each item, answer: what does it prove, who controls it, and which component is allowed to trust it?

### Exercise B — Find the bug

Review this intentionally unsafe pseudocode:

```js
app.get("/api/admin/reports", (req, res) => {
  if (req.query.isAdmin === "true") {
    return res.json(getReports());
  }

  return res.status(403).json({ error: "Forbidden" });
});
```

Tasks:
1. State the trust-boundary violation.
2. Describe a harmless local test that demonstrates the flaw.
3. Replace the decision with a server-enforced authorization check.
4. Add a regression test for an ordinary user.
5. Add a test for a missing or invalid authentication credential.

### Exercise C — Design the policy

A notes app supports private notes, explicitly shared notes, and administrators.

Write a policy table for:
- Anonymous visitor
- Note owner
- User with read-only share
- User with edit share
- Administrator
- Suspended account

Include read, update, delete, share, and administrative operations. Explain which operations require reauthentication or step-up verification.

### Exercise D — Explain a 401 and a 403

For each case, choose a response and explain why:
1. No session cookie on a protected endpoint.
2. An invalid or expired session.
3. A valid session but no permission to edit a note.
4. A database outage prevents checking authorization.
5. A resource belongs to a different user and the API deliberately conceals its existence.

Do not assume every API must expose resource existence. Document the selected behavior consistently.

### Exercise E — Draw the threat boundary

Draw the browser, API, database, and identity provider. Label which component owns:
- Password verification
- Session/token validation
- Principal creation
- Role and ownership checks
- Data persistence
- OAuth callback validation

Then list three things the browser is allowed to request but not allowed to decide.

## 12. Suggested answers and reasoning

### Exercise A

1. Email address: usually an identifier; it is not proof of account control.
2. Password: a credential presented for verification; it should not be logged or stored in plaintext.
3. Internal user ID: an identifier; possession of the ID alone does not authenticate the requester.
4. Session cookie: commonly carries a session credential; protect it as a secret.
5. Body user ID: untrusted request data; it cannot define the authenticated principal.
6. Trusted server-side role: authorization input, assuming the record and lookup are trustworthy and current.
7. Browser-supplied admin flag: untrusted input; never sufficient to grant admin access.
8. Verified identity-token subject: a claim usable only after the token and its relevant claims have been validated for the intended issuer and client.
9. Note ID: resource identifier; it must be followed by authorization.
10. Server-side permission result: an authorization decision if it is produced by trusted policy using the correct principal, action, and resource.

### Exercise B

The code trusts a query parameter to decide privilege. A caller can choose that parameter. The corrected design authenticates the request, derives a principal from verified evidence, and checks an admin permission using trusted policy or account state. The regression test must prove that changing the query parameter does not change privileges.

### Exercise C

There is no universal correct table without product requirements. A reasonable starting point is: private notes are readable and editable by the owner; read-only shares permit read only; edit shares permit reading and editing but not transferring ownership; administrators have only explicitly defined administrative powers; suspended accounts cannot perform ordinary protected operations. Decide whether administrators can read private content and document the privacy implications rather than assuming they can.

### Exercise D

A missing or invalid credential usually maps to 401. A valid principal lacking permission usually maps to 403. If the API intentionally conceals resource existence, it may return 404 consistently for both absent and inaccessible resources. A dependency outage must never become an allow decision; it may require a controlled 5xx response and monitoring.

## 13. Practical implementation boundaries

This chapter intentionally does not implement cryptography, password hashing, session management, JWT validation, or OAuth by hand. Those topics require maintained libraries, precise protocol handling, configuration, and tests.

When you reach implementation chapters:
- Use a maintained framework and security libraries.
- Keep secrets out of source control and logs.
- Validate inputs at the boundary.
- Keep authentication and authorization responsibilities separate.
- Add negative tests before declaring a feature done.
- Read the lab's security notes before adapting examples.

## 14. Mastery rubric

Score each dimension from 0 to 2:

- **0:** cannot explain or demonstrate it yet.
- **1:** can explain with notes or complete a guided exercise.
- **2:** can explain from memory, demonstrate it, and justify the decision.

| Skill | Score |
|---|---:|
| Define identification, authentication, principal, and authorization | /2 |
| Explain why a user ID does not authenticate a request | /2 |
| Trace a protected request from browser to database | /2 |
| Identify untrusted values and trust boundaries | /2 |
| Explain why frontend route guards are not access control | /2 |
| Distinguish 401, 403, and a deliberate 404 concealment policy | /2 |
| Identify resource ownership and tenant-isolation checks | /2 |
| Explain safe behavior when verification dependencies fail | /2 |
| Complete exercises and regression tests | /2 |
| Teach the topic without reading the chapter | /2 |
| **Total** | **/20** |

Suggested gate: aim for at least 16/20, with no zero on trust boundaries or authorization. A score is a study aid, not a security certification.

## 15. Teach-back script

Try teaching the topic in this order:

1. “An identifier tells us which account is being referred to; it does not prove control.”
2. Explain how a credential is verified.
3. Explain how a principal is derived from verified evidence.
4. Explain why authorization is a separate decision.
5. Walk through the private-note example.
6. Demonstrate the unsafe client-supplied admin flag.
7. Explain the corrected trust boundary.
8. Show the tests that prove unauthorized access is denied.
9. State what the design still does not guarantee.

Then invite a learner to challenge the design:
- What if the user ID is guessed?
- What if the session is stolen?
- What if the account is suspended?
- What if two requests arrive simultaneously?
- What if the authorization store is unavailable?
- What if the frontend is bypassed?

Answer by tracing the system, not by repeating slogans.

## 16. Retrieval practice

Answer without looking at the text:

1. What is the difference between identification and authentication?
2. Why is a username not a credential?
3. What does a successful password check establish, and what does it not establish?
4. What is a principal?
5. Why is authorization evaluated per action and resource?
6. Why should the backend not trust `req.body.userId` as the caller's identity?
7. Why does a route guard not secure an API?
8. When might a 404 be used instead of a 403?
9. What does fail closed mean?
10. Name three things successful authentication does not guarantee.
11. Which information should be redacted from logs?
12. What test would prove that a user cannot read another user's note?

## 17. Spaced repetition schedule

- **Today:** define the core terms from memory.
- **Tomorrow:** draw the request lifecycle.
- **Day 3:** complete Exercise B without viewing the solution.
- **Day 7:** explain authentication vs. authorization to another person.
- **Day 14:** design a policy for a different application, such as an LMS.
- **Day 30:** repeat the mastery rubric and revisit every weak area.

## 18. Chapter completion checklist

- [ ] I can define the vocabulary precisely.
- [ ] I can explain what authentication does and does not prove.
- [ ] I can draw a protected request lifecycle from memory.
- [ ] I can identify client-controlled inputs.
- [ ] I can explain why identity and privilege cannot be trusted from the request body.
- [ ] I can design a resource-level authorization policy.
- [ ] I can distinguish authentication failure from authorization denial.
- [ ] I can explain safe failure behavior.
- [ ] I completed the exercises and checked my reasoning.
- [ ] I can teach the topic without reading this document.

## 19. References

- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [OWASP Application Security Verification Standard](https://owasp.org/www-project-application-security-verification-standard/)
- [MDN: HTTP overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
- [MDN: HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)

**Next chapter:** [HTTP and Request Lifecycle](../02-HTTP-and-Request-Lifecycle/README.md).

**Completion rule:** do not move on just because you read the material. Move on when you can explain the concepts, draw the lifecycle, complete the exercises, and defend the trust boundaries.
