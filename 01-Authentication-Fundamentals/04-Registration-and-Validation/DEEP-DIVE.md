# Deep Dive: Registration, Validation, and Account Creation Races

> **Master question:** What security property must remain true when input is hostile, state expires, requests race, or a dependency fails?

This companion extends the chapter README. Do not treat reading as completion. Draw the flow, implement a small lab, test failure paths, and teach the mechanism without notes.

## 1. Mental model

Schema validation protects the application boundary; semantic validation checks meaning; database constraints preserve integrity under concurrency. A duplicate-check query followed by an insert is not atomic and can race.

### Vocabulary to define precisely

- **Account:** a record representing a subject in an application.
- **Identifier:** a value used to locate an account; not proof of control.
- **Credential:** evidence presented to an authentication mechanism.
- **Authenticator:** a mechanism used to prove control.
- **Principal:** trusted identity context constructed from verified evidence.
- **Trust boundary:** a point where data crosses components with different trust levels.
- **Security invariant:** a property that must remain true under expected inputs and failures.
- **Revocation:** server-recognized invalidation of a previously issued credential or session.
- **Least privilege:** grant only the access needed for a task and duration.

## 2. Trace the lifecycle

Draw the flow specific to this chapter and label every data store, actor, trust boundary, and state transition.

1. Identify the actor, protected asset, and intended action.
2. Mark all client-controlled fields, headers, cookies, URLs, tokens, and callback parameters.
3. Apply request-size limits and parse a narrow schema.
4. Extract credentials only from the documented channel.
5. Verify evidence using trusted configuration and maintained libraries.
6. Construct the principal from verified evidence; never copy identity or privileges from arbitrary request data.
7. Authorize the exact action and resource, including ownership and tenant boundaries.
8. Persist state with the necessary uniqueness, expiry, transaction, and atomicity guarantees.
9. Return a minimal response with deliberate status and cache behavior.
10. Emit redacted security events without credentials or reset links.
11. Define invalid, expired, replayed, concurrent, and dependency-outage behavior.
12. Document rotation, revocation, migration, and incident handling.

### Boundary questions

- Which component is trusted to make this decision?
- What can an attacker choose, modify, or replay?
- Can two requests race between a read and a write?
- Is a database constraint or atomic operation needed?
- Could status, timing, caching, logs, errors, or redirects leak information?
- What happens if a database, cache, mail provider, key service, or identity provider is unavailable?
- Which decisions must fail closed, and what availability trade-off follows?

## 3. Security invariants

Write testable statements before implementation:

- Untrusted request data never becomes trusted identity or privilege state by assignment alone.
- Failed verification cannot continue into a protected operation.
- Authorization is evaluated server-side for the exact action and resource.
- A one-time credential cannot be successfully consumed twice.
- Expiry and revocation are enforced by trusted validation or state.
- Secrets are not returned, logged, or stored reversibly without a documented protocol requirement.
- Failure responses do not expose secrets, stack traces, or internal verifier details.
- Exceptions to these rules are deliberate, documented, and have known residual risk.

## 4. Common failure modes

**Chapter-specific dangerous mistake:** Trusting client-side validation, spreading request.body into a model, inconsistent identifier normalization, or relying on an application-level duplicate check without a unique constraint.

Also look for:
- Implementing the happy path before defining invalid and expired behavior.
- Mixing parsing, cryptography, persistence, authorization, and response formatting in one function.
- Trusting frontend route guards as a security boundary.
- Catching every exception and continuing as if authentication succeeded.
- Assuming a random identifier is an authorization check.
- Treating a passing unit test as proof of real database transaction semantics.
- Copying a tutorial snippet without checking the maintained library and protocol guidance.

For each mistake, write: attacker capability → incorrect assumption → exploit path → violated invariant → corrective control → regression test.

## 5. Guided implementation plan

Accept a narrow registration DTO, validate it server-side, hash the password, and insert under a database unique index. Use concurrent requests to reproduce duplicate-registration races.

Build incrementally:
1. Document request and response contracts, including failures.
2. Define data model constraints, expiry, and revocation state.
3. Implement a small core function with clear inputs and outputs.
4. Use maintained libraries for cryptographic protocols and framework primitives.
5. Put database operations behind a small service/repository boundary.
6. Add structured, redacted logs with correlation IDs.
7. Write negative tests before convenience features.
8. Add integration tests against the storage semantics used in the real design.
9. Test concurrency wherever a credential or unique state can be consumed or created.
10. Document configuration, migration, and operational failure behavior.

## 6. Test matrix

| Scenario | Expected result | Invariant covered |
|---|---|---|
| Valid request | Only the intended action succeeds | Success path is constrained |
| Missing or malformed evidence | Safe rejection | No parser/fallback bypass |
| Expired or revoked state | Rejected according to policy | Lifecycle enforcement |
| Wrong user, tenant, or resource | Denied without protected data leak | Authorization boundary |
| Replayed one-time credential | Rejected or explicit reuse response | Replay handling |
| Two simultaneous requests | Atomic deterministic outcome | Race resistance |
| Dependency unavailable | Protected access fails safely | No accidental fail-open |
| Secret-bearing request | No secret in logs or error response | Disclosure prevention |
| Unexpected extra fields | Explicitly ignored or rejected | No mass assignment ambiguity |
| Regression after refactor | Security invariant remains tested | Durable protection |

### Topic-specific test cases

1. missing, extra, wrong-type, and oversized fields are rejected
2. concurrent registration creates at most one normalized identifier
3. client-supplied role/isAdmin/verified/tenantId is ignored or rejected
4. normalization matches across registration, login, and recovery
5. mail failure does not mark account verified

## 7. Debugging checklist

1. Reproduce with the smallest request and a disposable test account.
2. Record method, path, status, timing, and correlation ID—not credential values.
3. Verify environment, configuration, and clock assumptions.
4. Check middleware order and whether the route should be public or protected.
5. Inspect database constraints and transaction boundaries.
6. Confirm that concurrency tests exercise real storage semantics.
7. Distinguish authentication failure, authorization denial, validation error, and dependency outage.
8. Add a regression test before marking the bug fixed.

## 8. Trade-offs and design decisions

For every important decision, document:
- Security property gained and residual risk.
- Threat model and assumptions.
- Operational complexity and failure modes.
- Credential lifetime, rotation, and revocation behavior.
- Dependency-outage behavior.
- Telemetry that detects misuse.
- Tests that prove the decision.
- Conditions under which an alternative design would be preferable.

Avoid universal claims such as “JWT is always better than sessions” or “CORS makes the API secure.” Compare designs against client type, threat model, revocation needs, deployment topology, and operational capacity.

## 9. Teach-back lesson

Run two parallel requests that both check for an account before either inserts. Explain why the database must arbitrate uniqueness.

Teach in this order:
1. State the problem in one sentence.
2. Define important terms and distinguish neighboring concepts.
3. Draw actors, stores, and trust boundaries.
4. Walk through the success path.
5. Demonstrate one attack or failure path.
6. Explain the defense and residual risk.
7. Ask the learner to predict a test result before running it.
8. Ask the learner to explain the flow back without notes.

### Mastery checklist

- [ ] I can define key terms without notes.
- [ ] I can draw the lifecycle from memory.
- [ ] I can identify attacker-controlled inputs and trust boundaries.
- [ ] I can implement the core behavior using maintained libraries.
- [ ] I can demonstrate at least three failure cases.
- [ ] I can write negative and boundary tests.
- [ ] I can explain relevant races and dependency failures.
- [ ] I can state trade-offs and residual risk.
- [ ] I can teach the topic and answer “why?” precisely.

## 10. Retrieval practice

Answer from memory first:
1. What problem does this mechanism solve?
2. What does it prove, and what does it not prove?
3. Which values are untrusted?
4. Which state transition must be atomic or coordinated?
5. What is the most dangerous beginner misconception?
6. What happens if a dependency is unavailable?
7. Which test catches the highest-impact regression?
8. What may be logged, and what must be redacted?
9. When would an alternative design be preferable?
10. How would you explain this with one diagram?

## 11. Spaced review

- **Same day:** answer retrieval questions without notes.
- **Day 1:** redraw the flow and explain the core invariant.
- **Day 3:** solve a failure scenario and add a regression test.
- **Day 7:** teach the concept to another person.
- **Day 14:** compare the design with an alternative.
- **Day 30:** complete the mastery checklist before reopening the chapter.

## 12. Reference

- https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [OWASP Application Security Verification Standard](https://owasp.org/www-project-application-security-verification-standard/)

**Completion rule:** reading is not mastery. Finish when you can explain the mechanism, implement it, demonstrate a failure, test the invariant, and defend the trade-offs.
