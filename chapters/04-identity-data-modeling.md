# Chapter 04 — Identity Data Modeling

## Why this matters
Authentication bugs often begin as data-model bugs: duplicate accounts, tokens that can be replayed, sessions that cannot be revoked, or user-controlled IDs being treated as trusted ownership. A model should make safe states easy to represent and unsafe states hard to create.

## Learning outcomes
- Separate account identity from credentials and active sessions.
- Explain why internal IDs and normalized login identifiers serve different purposes.
- Model one-time verification and recovery tokens.
- Identify unique indexes and state transitions that need atomicity.

## Core vocabulary
| Concept | Meaning | Design question |
|---|---|---|
| User/principal | Internal identity record | What is the stable internal ID? |
| Identifier | Value used to find an account | Is email normalization consistent? |
| Credential | Evidence used to authenticate | What is stored, and how is it verified? |
| Session | A current authenticated interaction | How can it expire or be revoked? |
| One-time token | Temporary proof for one action | How is replay prevented? |
| Membership | User's relationship to an organization/tenant | Can membership be revoked independently? |
| Audit event | Security-relevant record of an action | What is safe and useful to record? |

## A conceptual data model
```text
User
  |--< Session
  |--< VerificationToken
  |--< RecoveryToken
  |--< Membership >-- Tenant
  |--< AuditEvent (actor reference)
```

This diagram shows relationships, not a complete schema. A document database may embed some fields while a relational database may use separate tables. Choose based on query patterns and consistency requirements.

### Example field responsibilities
- **User:** stable internal ID, normalized identifier, password hash if password login is enabled, verification state, timestamps, and account status.
- **Session:** safe session-ID representation, user reference, creation/expiry times, and revocation metadata.
- **Verification/recovery token:** safe token representation, user reference, expiry, consumption time, and purpose.
- **Membership:** user reference, tenant reference, role or attributes, and status.
- **Audit event:** event type, timestamp, actor reference when known, outcome, and carefully redacted context.

Never return password hashes, raw session identifiers, raw recovery tokens, or MFA shared secrets in ordinary API responses. Avoid logging them.

## Normalize identifiers carefully
If an email is used as a login identifier, define one normalization policy and apply it consistently during registration and login. Do not invent provider-specific transformations such as removing dots from addresses unless the provider explicitly guarantees those semantics. Enforce uniqueness in the database, not only with a pre-insert lookup: two concurrent requests can both pass a prior lookup.

## Model token lifecycle explicitly
A one-time token should have a clear purpose, expiry, and consumption state. Its transition is conceptually:

```text
created -> issued -> consumed
    |         |
    +-------> expired
```

A consumed or expired token must not become valid again. Where concurrent requests are possible, consume it atomically (for example, an update that succeeds only when the token is still unused and unexpired). Store a safe representation rather than a raw bearer secret when the design allows it.

## Model invariants
1. An account's internal ID does not change when its email or username changes.
2. Unique identifiers are protected by a database constraint/index.
3. A token is bound to one purpose and one account.
4. A token can be consumed at most once.
5. Expired or revoked sessions are rejected by the server.
6. Tenant membership and role are verified server-side.
7. Public response DTOs expose only fields the client needs.

## Practice lab
1. Draw a schema for users, sessions, verification tokens, recovery tokens, tenants, and memberships.
2. Mark every field that must be unique, indexed, secret, or returned publicly.
3. Explain what happens if two users register the same email at almost the same time.
4. Write pseudocode for atomically consuming a verification token.
5. Create a test matrix for duplicate registration, expired token, replayed token, revoked session, and cross-tenant access.

## Review questions
- Why should a session usually be modeled separately from a user?
- Why is a unique database constraint necessary even if application code checks first?
- Why should verification and recovery tokens have distinct purposes?
- What information should an audit log exclude?
- How can a membership change affect authorization for an existing session?

## Mastery gate
Submit a data diagram, a list of invariants, and tests for duplicate identifiers, token replay, and revoked sessions. Explain which constraints are enforced by the database and which are enforced by application logic.

## Implementation status
This chapter defines a design exercise. The capstone schema is introduced incrementally; no production schema is implied here.
