# Deep Dive: Account Verification and Recovery

> **Master question:** What security property must remain true when input is hostile, state expires, requests race, or a dependency fails?

This companion extends the chapter README. Reading is not completion: draw the flow, implement a local lab, test failure paths, and teach the mechanism without notes.

## 1. Mental model

Recovery is another authentication pathway and can become the weakest path to account takeover. Tokens should be random, purpose-bound, short-lived, single-use, and handled like temporary passwords.

### Vocabulary

- **Identifier:** locates an account; does not prove control.
- **Credential/authenticator:** evidence and mechanism used to establish control.
- **Principal:** trusted identity context created from verified evidence.
- **Trust boundary:** transition between components with different trust levels.
- **Security invariant:** property that must remain true across inputs and failures.
- **Revocation:** server-recognized invalidation of a credential or session.
- **Least privilege:** grant only access needed for the task and duration.

## 2. Trace the lifecycle

Draw this chapter's actual flow and label actors, state, and trust boundaries.

1. Identify actor, protected asset, and requested action.
2. Mark all client-controlled headers, fields, cookies, URLs, tokens, and callback parameters.
3. Parse a narrow schema and enforce size limits.
4. Extract credentials only from the documented channel.
5. Verify evidence using trusted configuration and maintained libraries.
6. Construct the principal from verified evidence—not arbitrary request data.
7. Authorize the exact action/resource, including ownership and tenant boundaries.
8. Persist state with required constraints and atomicity.
9. Return a minimal response with deliberate status/cache behavior.
10. Record redacted security metadata without credential values.
11. Define invalid, expired, replayed, concurrent, and outage behavior.
12. Document rotation, revocation, migration, and incident handling.

### Boundary questions

- Which component is trusted to make this decision?
- What can an attacker modify or replay?
- Can requests race between a read and write?
- Could status, timing, caching, logs, or redirects leak information?
- What happens if a database, cache, key service, mail provider, or identity provider is unavailable?
- Which decisions must fail closed, and what availability cost follows?

## 3. Security invariants

- Untrusted request data never becomes trusted identity or privilege state by assignment alone.
- Failed verification cannot continue into a protected operation.
- Authorization is checked server-side for the exact action and resource.
- A one-time credential cannot be successfully consumed twice.
- Expiry and revocation are enforced by trusted validation or state.
- Secrets are not returned, logged, or stored reversibly without a documented protocol requirement.
- Errors do not expose secrets, stack traces, or internal verifier details.
- Any exception is deliberate, documented, and has known residual risk.

## 4. Failure patterns

**Chapter-specific dangerous mistake:** Long-lived/reusable reset links, links constructed from untrusted Host headers, tokens in logs, unlimited resend attempts, or no session revocation after recovery.

Also look for mixing cryptography, persistence, authorization, and presentation in one handler; trusting frontend route guards; treating random identifiers as authorization; continuing after verification exceptions; assuming unit tests prove transaction semantics; and copying outdated snippets.

For every bug, write: attacker capability → wrong assumption → exploit path → violated invariant → corrective control → regression test.

## 5. Guided implementation

Create a token record containing subject, purpose, verifier/hash, expiry, and consumed state. Construct links from trusted configuration and consume tokens atomically.

Build in increments:
1. Document request/response contracts and failure outcomes.
2. Define data constraints, expiry, and revocation state.
3. Implement a small core function with clear inputs and outputs.
4. Use maintained libraries for cryptographic protocols and framework primitives.
5. Separate persistence and policy from request parsing.
6. Add structured redacted logs with correlation IDs.
7. Write negative tests before convenience features.
8. Add integration tests using realistic storage semantics.
9. Test concurrency wherever state is consumed or created.
10. Document configuration, migration, and operational failure behavior.

## 6. Test matrix

| Scenario | Expected result | Invariant |
|---|---|---|
| Valid request | Only intended operation succeeds | Success path is constrained |
| Missing/malformed evidence | Safe rejection | No fallback bypass |
| Expired/revoked state | Rejected by documented policy | Lifecycle enforcement |
| Wrong user/tenant/resource | Denied without data leak | Authorization boundary |
| Replayed one-time credential | Rejected or explicit reuse response | Replay handling |
| Concurrent requests | Atomic deterministic outcome | Race resistance |
| Dependency outage | Protected access fails safely | No accidental fail-open |
| Secret-bearing request | No secret in logs/errors | Disclosure prevention |
| Unexpected extra fields | Explicitly ignored or rejected | No mass-assignment ambiguity |
| Regression after refactor | Invariant remains tested | Durable protection |

### Topic-specific tests

1. known and unknown accounts receive equivalent public responses
2. expired/wrong-purpose/consumed tokens fail
3. two concurrent submissions cannot both consume one token
4. token cannot be used for another account or action
5. password reset revokes sessions according to policy
6. mail failure does not falsely mark account verified

## 7. Debugging checklist

1. Reproduce with the smallest request and a disposable account.
2. Record method/path/status/timing/correlation ID—not credential values.
3. Verify environment, configuration, and clock assumptions.
4. Check middleware order and route protection.
5. Inspect database constraints and transaction boundaries.
6. Confirm concurrency tests use realistic storage semantics.
7. Distinguish authentication failure, authorization denial, validation error, and outage.
8. Add a regression test before marking the issue fixed.

## 8. Trade-offs

For each choice, document security property gained, residual risk, threat assumptions, operational complexity, expiry/revocation behavior, dependency-outage behavior, misuse telemetry, tests, and conditions favoring an alternative.

Avoid absolute claims such as “JWT is always better than sessions” or “CORS makes an API secure.” Compare designs against client type, threat model, revocation needs, deployment topology, and operational capacity.

## 9. Teach-back lesson

Threat-model the entire reset flow: URL construction, referrer leakage, token storage, atomic consumption, session revocation, and notifications.

Teach in this order: state the problem; define terms; draw actors/trust boundaries; trace success; demonstrate an attack/failure; explain the defense and residual risk; ask the learner to predict a test; ask them to explain the flow back without notes.

### Mastery checklist

- [ ] Define terms without notes.
- [ ] Draw lifecycle from memory.
- [ ] Identify attacker-controlled inputs and trust boundaries.
- [ ] Implement core behavior using maintained libraries.
- [ ] Demonstrate at least three failure cases.
- [ ] Write negative and boundary tests.
- [ ] Explain races and dependency failures.
- [ ] State trade-offs and residual risk.
- [ ] Teach the topic and answer “why?” precisely.

## 10. Retrieval practice

Answer before opening notes:
1. What problem does this mechanism solve?
2. What does it prove—and not prove?
3. Which values are untrusted?
4. Which transition must be atomic or coordinated?
5. What is the dangerous beginner misconception?
6. What happens when a dependency fails?
7. Which test catches the highest-impact regression?
8. What may be logged and what must be redacted?
9. When is an alternative design preferable?
10. How would you explain it with one diagram?

## 11. Spaced review

- Same day: answer retrieval questions without notes.
- Day 1: redraw the flow and explain the invariant.
- Day 3: solve a failure scenario and add a regression test.
- Day 7: teach the concept to another person.
- Day 14: compare with an alternative.
- Day 30: complete the mastery checklist before reopening the chapter.

## 12. References

- https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [OWASP Application Security Verification Standard](https://owasp.org/www-project-application-security-verification-standard/)

**Completion rule:** reading is not mastery. Finish when you can explain, implement, demonstrate a failure, test the invariant, and defend the trade-offs.
