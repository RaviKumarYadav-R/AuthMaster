# Lesson: [Topic]

## Learning objectives
By the end, a learner can define the key terms, draw the request flow, explain trade-offs, and implement/test a minimal example.

## Beginner explanation
Explain the idea without jargon. Add an analogy, then state where the analogy stops being accurate.

## Vocabulary
- Term:
- Meaning:

## Diagram
Add a Mermaid sequence diagram and label trust boundaries and secrets.

## Implementation walkthrough
1. What starts the flow?
2. Which component validates the request?
3. Where is state stored?
4. What does the client receive?
5. How do expiry and logout work?

## Failure cases
- Invalid input:
- Expired credential:
- Revoked credential:
- Unauthorized resource:

## Security notes
What threats does this design address? What does it not address? What assumptions are required?

## Teach-back questions
1.
2.
3.

## Homework
One implementation task and one explanation task.

## Full lesson authoring template

Use this expanded structure for every lesson. Remove a section only when it truly does not apply, and explain why.

### 1. Context and motivation
- What user/system problem does this topic solve?
- What can go wrong if it is implemented incorrectly?
- Where does it fit in the account lifecycle?

### 2. Learning objectives
Write three to seven measurable objectives using verbs such as draw, explain, implement, validate, test, debug, compare, and review.

### 3. Prerequisites
List the exact concepts, files, tools, and setup needed before starting.

### 4. Beginner explanation and precise model
Start without jargon, use an analogy, then explain where the analogy stops being accurate. Define the formal model and key terms.

### 5. Actors and trust boundaries
Identify client, server, database, identity provider, external services, attacker-controlled inputs, and the data that crosses each boundary.

### 6. End-to-end flow
Provide numbered steps and a Mermaid flowchart or sequence diagram. Label where credentials are checked, where state is stored, and what is sent back to the client.

### 7. Data model and invariants
List fields, sensitive values, ownership rules, expiry, uniqueness, revocation, and invariants that must always hold.

### 8. Code walkthrough
For every code block, state the filename, purpose, dependencies, environment variables, and whether it is complete runnable code or an excerpt. Explain the important lines and why they exist.

### 9. HTTP contract
Document method, route, headers, request schema, success status/body, error status/body, cookie/token behavior, cache policy, rate limits, and state changes.

### 10. Failure paths
Cover malformed input, missing credentials, wrong credentials, expiry, revocation, replay, permission denial, dependency failure, and concurrency where relevant.

### 11. Security review
List threats addressed, threats not addressed, assumptions, common mistakes, and controls still needed before production use.

### 12. Tests and evidence
Include unit, integration, browser, and operational tests as appropriate. Assert status, response shape, state change, and absence of forbidden side effects.

### 13. Debugging
Provide symptom → hypotheses → safe observations → root cause → fix → regression test. Never recommend logging credentials or session/token values.

### 14. Trade-offs and alternatives
Compare at least one reasonable alternative. State costs, operational complexity, usability impact, and the conditions that would change the decision.

### 15. Practice ladder
- Beginner: explain or draw the flow.
- Intermediate: implement the smallest feature and a negative test.
- Advanced: handle expiry, replay, race conditions, or failure behavior.
- Challenge: review a design, identify residual risks, and justify a decision.

### 16. Teach-back
Include a five-minute explanation outline, one diagram prompt, three beginner questions, and one code-review scenario.

### 17. Mastery gate
The learner must explain the concept without notes, reproduce the flow, implement the key behavior, test failure cases, and name the remaining limitations.

### 18. References
Prefer standards and official maintained library documentation. State versions or date-sensitive assumptions where relevant.

## Lesson review checklist

- [ ] Learning objectives are measurable.
- [ ] Flow diagram matches the code.
- [ ] Code blocks identify filenames and prerequisites.
- [ ] Every sensitive value has a clear handling rule.
- [ ] Failure behavior is documented.
- [ ] Tests prove the security property, not only the status code.
- [ ] Trade-offs and limitations are explicit.
- [ ] Teach-back and practice tasks are included.
- [ ] Links point to official or maintained references.

