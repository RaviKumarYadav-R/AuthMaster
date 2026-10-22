# Teach-Back Rubric

Use this after studying a chapter. Explain without reading the repository.

## Score each dimension from 0 to 3

| Dimension | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Definition | Incorrect | Vague | Mostly correct | Precise; distinguishes adjacent terms |
| Mental model | None | Analogy only | Diagram with gaps | Diagram includes state and trust boundaries |
| Mechanism | Cannot trace | Happy path only | Most branches | Success, failure, expiry, and replay |
| Implementation | Cannot start | Copies code | Builds with help | Builds and debugs independently |
| Security | Misses threat | Generic risks | Maps risks to controls | Explains residual risk and trade-offs |
| Testing | Happy path only | Few assertions | Negative tests | Boundary, race, outage, regression tests |
| Teaching | Reads notes | Fragments | Clear explanation | Checks understanding with predictions |

Maximum: 21. A suggested learning target is 17+, with no zero in security or testing. This is a learning signal, not a formal security certification.

## 10–15 minute teaching format

1. State the problem in one sentence.
2. Define important terms.
3. Draw actors, data, and trust boundaries.
4. Trace the success path.
5. Demonstrate one attack or failure path.
6. Show the test that catches it.
7. Explain a trade-off and residual risk.
8. Ask the learner to predict the result of a modified request.
9. Ask the learner to explain the flow back in their own words.

## Teacher rule

Do not accept “because it is more secure” as an explanation. Ask: secure against which attacker, under which assumptions, using which control, and with what residual risk?
