# 01 — How to Study and Teach Each Topic

Use the same process for every chapter.

1. **Define it:** write a two-sentence definition, one example, and one non-example.
2. **Explain why:** what problem does the mechanism solve?
3. **Draw the flow:** include browser/client, backend, database, and identity provider where relevant. Mark secrets and trust boundaries.
4. **Implement the smallest useful version:** add validation, expiry, revocation, and error handling deliberately.
5. **Break it safely:** test missing/invalid/expired credentials, revoked sessions, unauthorized resource IDs, malformed input, and repeated requests in a local environment.
6. **Teach it:** explain the analogy, request flow/data model/API contract, and threat/mitigation.

## Daily 2–3 hour routine

- 15 min — recall yesterday's concepts without notes
- 35 min — documentation and theory
- 20 min — diagram the flow
- 60 min — implementation
- 20 min — negative tests
- 15 min — teach-back and notes

Never present a security control as magic. Explain what it protects against, what it does not protect against, and its assumptions.
