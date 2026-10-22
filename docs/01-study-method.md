# 01 — How to Study and Teach Each Topic

Use the same repeatable method for every chapter. The goal is not to finish reading; the goal is to explain a mechanism, implement it safely in a lab, test failure cases, and understand its limits.

## The six-pass learning loop

### Pass 1 — Define
Write a plain-language definition in two sentences. Add:
- one realistic example
- one non-example
- the problem this mechanism solves
- one misconception a beginner might have

### Pass 2 — Trace
Draw a sequence diagram. Include the browser/client, API, database/session store, and identity provider when relevant. Label:
- who initiates each request
- what data is sent
- where validation occurs
- what state changes
- which component makes the security decision
- where trust boundaries exist

Never put real credentials or token values in diagrams.

### Pass 3 — Implement
Build the smallest useful example using maintained libraries. For every line that handles a credential, ask:
- Is the input untrusted?
- Is the value secret?
- Where is it stored?
- How long is it valid?
- Can it be replayed?
- How is it revoked?
- What happens if the dependency or store fails?

### Pass 4 — Break
In a local environment with synthetic users, test:
- missing and malformed input
- incorrect credentials
- expired or revoked credentials
- replay of an old credential
- unauthorized resource IDs
- repeated requests and rate limits
- concurrency/race conditions where applicable
- database/session-store failures
- safe error responses and logs

For each test, verify not only the HTTP status but also whether server-side state changed unexpectedly.

### Pass 5 — Explain
Close the documentation and explain the mechanism aloud in simple English. Use this order:
1. Problem
2. Actors and data
3. Request flow
4. Validation and state changes
5. Failure cases
6. Trade-offs and residual risks

If you get stuck, identify the exact missing concept and revisit only that part.

### Pass 6 — Teach
Teach a friend or record a short explanation. Ask the learner to draw the flow themselves and identify the trust boundaries. Teaching is successful when they can reason through a new scenario, not merely repeat definitions.

## Daily 2–3 hour routine

| Time | Activity | Output |
|---:|---|---|
| 15 min | Recall yesterday without notes | List of concepts you can explain |
| 35 min | Read one chapter and official references | Short notes in your own words |
| 20 min | Draw the flow/data model | Mermaid diagram |
| 60 min | Implement one focused task | Small commit |
| 20 min | Test negative cases | Test evidence |
| 15 min | Teach-back and reflection | Three questions + one gap |

If you have only 45 minutes, use 5 minutes recall, 15 minutes reading, 15 minutes coding, and 10 minutes testing/teach-back. Consistency matters more than marathon sessions.

## Notes template

For every topic, fill in:
- **Definition:**
- **Why it exists:**
- **Actors and trust boundaries:**
- **Request flow:**
- **Data stored and lifetime:**
- **What it protects against:**
- **What it does not protect against:**
- **Failure cases:**
- **Tests and evidence:**
- **Common misconceptions:**
- **My own example:**
- **How I would teach it:**
- **Open questions:**

## Spaced review schedule

Revisit each topic after 1 day, 3 days, 7 days, and 14 days. Do not reread passively: answer questions from memory, redraw the diagram, and solve a different scenario.

## Definition of done

A chapter is complete only when you can:
- define the concept without copying
- draw the flow correctly
- explain which component enforces the control
- implement a small example using maintained libraries
- demonstrate at least three failure cases
- explain limitations and trade-offs
- answer a beginner's follow-up question

## Safety rule

Never present a security control as magic. Explain its assumptions and residual risks. Keep all experiments local, use synthetic accounts, and never commit secrets. AuthMaster's sample API is a teaching lab, not proof that a production authentication system is secure.
