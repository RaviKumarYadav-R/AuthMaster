# AuthMaster Mastery System

AuthMaster is a learning-and-teaching curriculum, not a pile of notes. Study by predicting behavior, drawing flows, building small labs, testing failure paths, and explaining the result without notes.

## Learning loop

```text
Question → Mental model → Diagram → Trace → Predict → Implement
         → Negative test → Debug → Teach → Retrieve later
```

## Chapter workflow

1. **Preview:** read objectives and write down your current understanding.
2. **Learn:** define unfamiliar terms and connect them to a real request flow.
3. **Draw:** sketch actors, stores, trust boundaries, and success path from memory.
4. **Predict:** reason about missing, invalid, expired, replayed, unauthorized, and concurrent requests.
5. **Build:** implement one small behavior with maintained libraries.
6. **Test:** cover success, rejection, expiry, races, and dependency failures where applicable.
7. **Debug:** turn meaningful defects into regression tests.
8. **Teach:** explain the concept and ask the learner to predict a modified scenario.
9. **Retrieve later:** revisit after 1, 3, 7, 14, and 30 days.

## Notes format

For each important concept, record **definition**, **problem**, **mechanism**, **trust boundary**, **failure**, **trade-off**, **test**, and **teach-back**.

## Mastery rubric

| Level | Evidence |
|---|---|
| 1 — Recognize | Define terms and identify components |
| 2 — Explain | Draw the flow and explain why each step exists |
| 3 — Implement | Build, debug, and test the core behavior independently |
| 4 — Evaluate and teach | Compare alternatives, threat-model residual risk, and teach clearly |

A topic is not complete because you read it. Demonstrate implementation and testing, then explain the important trade-offs.

## Retrieval practice rules

- Attempt answers before opening notes.
- Correct mistakes and write why the original answer was wrong.
- Mix related concepts: authentication vs authorization; CSRF vs CORS; access vs refresh tokens; OAuth vs OIDC; decoding vs verification.
- Re-test weak answers the next day and one week later.
- Familiarity is not recall: produce the answer without looking.

## Safe lab rules

- Use local-only accounts and disposable test data.
- Never commit secrets, real user data, cookies, access/refresh tokens, or recovery links.
- Test only systems you own or are authorized to assess.
- Use maintained libraries for cryptographic protocols and session management.
- Treat sample code as educational until reviewed, configured, tested, and threat-modeled for its target environment.

## Weekly review

1. Explain a randomly chosen topic without notes.
2. Draw an authentication flow from memory.
3. Run one negative test and name its invariant.
4. Turn one discovered bug into a regression test.
5. Teach one topic to a friend and ask them to explain it back.
6. Update the mastery checklist honestly.

## About chapter length

Some topics deserve thousands of lines across explanations, runnable examples, diagrams, test cases, and exercises. Split large topics into focused subchapters. Do not pad chapters with repetition: judge completeness by learning outcomes, runnable labs, edge-case coverage, and correctness.
