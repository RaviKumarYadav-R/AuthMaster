# 04 — Registration, Validation, and Duplicate-Account Races

> **Core idea:** Client validation is for usability; server validation and database constraints protect integrity.

## 1. Why this topic exists

Client validation is for usability; server validation and database constraints protect integrity.

## 2. Learning objectives

After this chapter, you should be able to:

- Explain the concept in plain language and with precise terminology.
- Draw the end-to-end flow and identify the trust boundary.
- Predict the example's behavior before running it.
- Identify failure modes and add a negative test.
- Explain trade-offs, limitations, and what remains before production.

## 3. Mental model

```text
Untrusted body → schema validation → normalization → hash → unique insert
```

This is a learning model, not a substitute for the exact standard or library semantics.

## 4. End-to-end flow

1. Identify the request, actor, and untrusted inputs.
2. Apply the relevant validation and security checks.
3. Make the decision at the correct server-side boundary.
4. Record or return only the minimum necessary safe information.
5. Test success, failure, replay/expiry, and unauthorized cases where relevant.

## 5. Under the hood

A pre-check for an existing email can race. A unique database index is the final uniqueness control.

## 6. Rules and invariants

- Validate untrusted input on the server.
- Keep secrets out of source control, client bundles, logs, and error responses.
- Fail closed when required authentication or policy information is missing.
- Test failure paths, not only the happy path.
- Use maintained libraries for cryptography and security protocols.
- Document expiry, revocation, concurrency, and operational behavior where relevant.

## 7. Common mistakes

- Trusting a client-side check as the security boundary.
- Testing only successful requests.
- Logging credential values while debugging.
- Treating a teaching example as production-ready implementation.
- Ignoring the data store, deployment, and operational lifecycle.

## 8. Code walkthrough

Open [`examples.js`](./examples.js). First read the code and predict its behavior; then run `node examples.js` from this directory and explain the output. The example isolates the topic and is not a complete authentication service.

## 9. Debugging method

1. Reproduce the issue using synthetic data.
2. State the expected invariant and observed behavior.
3. Inspect one boundary at a time: validation, authentication, authorization, persistence, or browser behavior.
4. Never log passwords, cookies, bearer tokens, or recovery links.
5. Fix the root cause and add a regression test.

## 10. Real-world review questions

- Which component makes the security decision?
- What inputs are untrusted?
- What credential or state is stored, and where?
- What happens on expiry, replay, concurrency, or dependency failure?
- What should be logged, and what must never be logged?
- What risks remain after the happy path works?

## 11. Practice ladder

Complete [`exercises.md`](./exercises.md) before reading [`solutions.md`](./solutions.md).

## 12. Mastery checklist

- [ ] I can define the concept without copying this chapter.
- [ ] I can draw the flow and identify trust boundaries.
- [ ] I can predict and explain the example output.
- [ ] I can name at least three failure modes.
- [ ] I can test an invalid or unauthorized case.
- [ ] I can explain one alternative and its trade-offs.
- [ ] I can teach the topic in five minutes.
- [ ] I can state what the example does not make production-safe.

## 13. Teach-back prompt

Teach the topic using one plain-language definition, one diagram, one code example, one common mistake, one negative test, and one limitation.

## References

Start with the [AuthMaster official resource index](../../resources/README.md). Use official standards and maintained library documentation for real implementation details.
