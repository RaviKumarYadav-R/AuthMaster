# Chapter 07 — Login and Abuse Prevention

## Why this matters
A password check alone does not protect an endpoint from automated guessing, credential stuffing, account enumeration, or denial-of-service attacks. Login design must consider how an attacker can repeat requests at scale.

## Learning outcomes
- Trace a login request from validation to session establishment.
- Design rate limiting and generic failure responses.
- Identify trade-offs in account lockout and throttling.
- Build a test matrix for successful and failed login attempts.

## Login flow
```text
POST /login
    |
    v
Validate request shape and size
    |
    v
Apply abuse controls
    |
    v
Find account using normalized identifier
    |
    v
Verify password with maintained hashing library
    |
    +--> failure: safe generic response
    |
    +--> success: rotate/create fresh authenticated session
```

Do not reveal whether the email exists through different user-facing messages or obvious response differences unless there is a deliberate, reviewed reason. Avoid timing behavior that makes account discovery easier.

## Abuse controls
A practical design may combine:
- per-account and per-network rate limits;
- progressive delays or other friction for repeated failures;
- monitoring and alerting for suspicious patterns;
- breached-password checks where appropriate and privacy-conscious;
- safe recovery paths for legitimate users who are blocked;
- limits on request size and concurrent expensive operations.

No single limit fits every application. IP-only limits can punish shared networks and be bypassed with distributed sources; account-only limits can be abused to lock out a victim. Choose controls based on the threat model and monitor their effect.

## Session handling after login
On successful authentication, do not blindly preserve a session identifier that existed before login. Establish or rotate authenticated session state to reduce session-fixation risk. Privilege changes should also trigger the session/token policy defined by your architecture.

## Practice lab
1. Build a matrix: known/unknown account × correct/incorrect password × under/over rate limit.
2. For each case, record response behavior, session behavior, and expected audit event.
3. Test that failed login never creates an authenticated session.
4. Test that a successful login rotates or replaces pre-authentication session state.
5. Explain how a permanent lockout could be abused against a victim.
6. Verify that logs redact passwords, cookies, and bearer tokens.

## Review questions
- What is credential stuffing, and how does it differ from brute force?
- Why can account-specific lockout be a denial-of-service vector?
- Why should login errors be designed to reduce account enumeration?
- Why rotate session state after login?
- Which signals are useful for monitoring without collecting secrets?

## Mastery gate
Demonstrate a correct login, incorrect password, unknown account, and throttled request. Prove that failures do not authenticate the caller and that success establishes fresh session state.

## Implementation status
This chapter defines design and testing requirements. Choose rate-limit settings only after considering deployment topology and the application's risk.
