# Chapter 09 — JWT and Access Tokens

## 1. Why this matters
Tokens can carry signed claims, but a token format does not automatically make an application secure or eliminate revocation decisions.

## 2. Learning outcomes
By the end, you should be able to:
- Explain the core vocabulary in plain language.
- Draw the end-to-end flow and identify trust boundaries.
- State the security invariants this design must preserve.
- Propose tests for both successful and rejected requests.

## 3. Vocabulary to learn
- **JWT:** define this term in your own words and connect it to the flow.
- **JWS:** define this term in your own words and connect it to the flow.
- **JWE:** define this term in your own words and connect it to the flow.
- **claims:** define this term in your own words and connect it to the flow.
- **issuer:** define this term in your own words and connect it to the flow.
- **audience:** define this term in your own words and connect it to the flow.
- **expiry:** define this term in your own words and connect it to the flow.
- **signature:** define this term in your own words and connect it to the flow.
- **bearer credential:** define this term in your own words and connect it to the flow.

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
- Verify tokens with a maintained library and explicit algorithm/key policy. Validate issuer, audience, expiry, and required claims. A signed JWT is not necessarily encrypted. Bearer tokens must be protected as secrets..

## 7. Practice
Decode a synthetic JWT and identify its readable payload. Create a validation checklist. Explain what happens when a token is stolen and why audience/issuer checks matter.

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
Concept and test-design chapter; do not build cryptography from scratch.
