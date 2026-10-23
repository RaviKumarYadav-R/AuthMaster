# Chapter 11 — Authorization and Multi-Tenancy

## 1. Why this matters
Authentication identifies the caller; authorization must decide what the caller can do to this specific object in this specific context.

## 2. Learning outcomes
By the end, you should be able to:
- Explain the core vocabulary in plain language.
- Draw the end-to-end flow and identify trust boundaries.
- State the security invariants this design must preserve.
- Propose tests for both successful and rejected requests.

## 3. Vocabulary to learn
- **RBAC:** define this term in your own words and connect it to the flow.
- **ABAC:** define this term in your own words and connect it to the flow.
- **ownership:** define this term in your own words and connect it to the flow.
- **tenant membership:** define this term in your own words and connect it to the flow.
- **IDOR/BOLA:** define this term in your own words and connect it to the flow.
- **least privilege:** define this term in your own words and connect it to the flow.

## 4. Mental model
Treat this feature as a sequence of explicit decisions, not a magic library call. Identify what the browser sends, what the server verifies, what state is stored, and what the server returns. The analogy you choose must not replace the actual protocol and library documentation.

## 5. Flow to draw
```text
Client / Browser
      |
      | request or redirect
      v
Backend / trusted client
      |
      +--> validate inputs and protocol state
      +--> verify credential / identity / policy
      +--> read or update durable state
      |
      v
Response, denial, or safe recovery path
```

Adapt this diagram to the chapter. Label every request, response, trust boundary, stored secret, expiry, and rejection path. It is a starting sketch, not a complete protocol sequence.

## 6. Security invariants
- Enforce policy server-side on every operation. Do not trust user IDs, tenant IDs, roles, or ownership claims supplied by the client without verifying them. Scope database queries by authorized ownership or membership..

## 7. Practice
Create User A and User B fixtures. Test read, update, delete, list, and admin actions across owners and tenants. Confirm negative tests fail even when IDs are guessed.

### Builder exercise
Create a small artifact: a sequence diagram, data model, test matrix, configuration checklist, or local implementation appropriate to this chapter. State its assumptions and do not include real credentials.

### Breaker exercise
Choose at least two failure cases relevant to the chapter. For each, write: input or event, expected server behavior, expected data change (if any), and how the test proves the security invariant.

## 8. Review questions
1. What problem does this mechanism solve, and what does it not solve?
2. Which component is trusted to verify the relevant evidence?
3. What state is stored, and what is the expiry or revocation strategy?
4. What is one realistic failure or abuse case?
5. How would you test that the backend denies the unsafe action?
6. Which decision depends on your framework or deployment, and where will you verify the current guidance?

## 9. Teach-back
Explain the flow in three minutes without reading. Then explain one failure case to a beginner and why the chosen defense works.

## 10. Mastery gate
You are ready to move on when you can draw the flow, define the key terms, defend the invariants, and show at least one positive and two negative tests or a documented test plan.

## 11. Implementation status
Use automated cross-user and cross-tenant tests as a release gate.
