# Chapter 06 — Registration and Verification

## Why this matters
Registration creates a new security principal. It must validate input, prevent duplicate identities, store credentials safely, and—when required—verify control of an email address or other contact channel.

## Learning outcomes
- Design registration as a validated server-side operation.
- Prevent duplicate identifiers under concurrent requests.
- Design an expiring, single-use verification token.
- Separate local development delivery from production delivery.

## Registration flow
```text
Browser -> POST /register
        -> validate request and normalize identifier
        -> check policy and database uniqueness
        -> hash password using maintained library
        -> create unverified account + verification token
        -> deliver verification link through configured channel
Browser <- generic success response
```

This is a conceptual flow. Database uniqueness must still handle races even if the application first checks whether an identifier exists. A real application also needs input limits, abuse controls, error handling, and safe delivery configuration.

## Verification token design
A verification token is a temporary bearer secret. Generate it with a cryptographically secure random API. It should:
- have sufficient unpredictability;
- be bound to a specific account and purpose;
- expire after a defined interval;
- be single-use;
- be stored in a safe representation when practical;
- never be written to ordinary logs;
- be consumed atomically so simultaneous requests cannot both succeed.

Do not use a predictable user ID, timestamp, sequential counter, or ordinary pseudo-random generator as a token.

## Avoid common mistakes
- **Duplicate check only in application code:** concurrent requests can both pass. Use a database uniqueness constraint and handle its conflict cleanly.
- **Verification token never expires:** a leaked old link may remain useful indefinitely.
- **Token can be replayed:** mark it consumed as part of the same atomic state transition that verifies the account.
- **Token appears in logs:** redact query strings and avoid logging full URLs that contain bearer secrets.
- **Public development endpoint reveals tokens:** use a local-only mail sink or test fixture that cannot be exposed in production.
- **Verification is treated as authorization:** verified email does not automatically make the user an administrator or permit access to another user's data.

## Practice lab
1. Write the request/response contract for `POST /register`.
2. Decide how your API responds to a duplicate identifier without leaking unnecessary account details.
3. Draw valid, expired, malformed, and already-consumed token paths.
4. Design a test for two simultaneous registration requests using the same identifier.
5. Create a local-only delivery approach for development and explain how it is disabled in production.

## Review questions
- Why is a database uniqueness constraint required?
- Why should a verification token be single-use?
- Why should verification tokens and password-reset tokens have separate purposes?
- What should happen if a user opens the same verification link twice?
- Which information should never appear in logs?

## Mastery gate
Provide a flow diagram, documented expiry/consumption rules, and tests for valid verification, expiry, replay, and duplicate registration. Explain how local token delivery is prevented from leaking in a public deployment.

## Implementation status
This lesson defines the flow and acceptance tests. The capstone will implement it only after the identity model and password-storage decisions are understood.
