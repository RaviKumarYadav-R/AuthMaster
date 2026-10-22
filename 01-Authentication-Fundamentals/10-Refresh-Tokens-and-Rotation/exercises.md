# Exercises — Refresh Tokens, Rotation, Replay, and Concurrency

Use synthetic identities and data. Attempt every exercise before reading the solutions.

## Level 1 — Recall

1. Explain the core idea in two sentences.
2. Identify the trust boundary and which component makes the decision.

## Level 2 — Predict

1. Read `examples.js` and write the expected output before running it.
2. Change one input and predict the result.

## Level 3 — Apply

1. Test replay, concurrent refresh, expiry, logout, disabled account, and database failure mid-rotation.
2. Write a success contract and at least one failure contract.
3. Add input validation or an explicit policy check appropriate to the topic.

## Level 4 — Debug and threat-model

1. Reproduce one mistake from the chapter using synthetic data.
2. Write expected behavior, observed behavior, root cause, fix, and regression test.
3. Confirm denied operations do not cause forbidden state changes.

## Level 5 — Design

1. Compare this approach with one alternative.
2. List assumptions, operational costs, and user-experience trade-offs.
3. Explain expiry, replay, concurrency, or dependency failure where relevant.

## Level 6 — Teach-back

Teach the topic in five minutes with a diagram, example, failure case, and comprehension question.

## Completion checklist

- [ ] I wrote expected behavior before coding.
- [ ] I drew the flow.
- [ ] I ran and explained the example.
- [ ] I added a negative test.
- [ ] I kept secrets out of logs and commits.
- [ ] I documented remaining limitations.
