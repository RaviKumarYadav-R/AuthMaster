# Week-by-Week Projects and Deliverables

This plan turns reading into visible progress. Commit small, understandable changes; do not build a large app before you understand its trust boundaries.

## Week 1 — Draw before code
- Create a glossary with your own definitions.
- Draw registration, login, authenticated request, and logout.
- Explain cookie flags, CORS, CSRF, and XSS with examples.
- Deliverable: concept map and five teach-back questions.

## Week 2 — Session lab
- Run the lab with synthetic data.
- Inspect Set-Cookie and verify the cookie is HttpOnly.
- Test session ID rotation, /auth/me, logout, and old-cookie replay.
- Deliverable: demo notes and a list of missing controls.

## Week 3 — Token design
- Draw JWT header/payload/signature and explain what is visible.
- Write a claim-validation checklist.
- Draw refresh rotation and reuse detection.
- Deliverable: token architecture decision record.

## Week 4 — Authorization
- Create a mock resource ownership policy.
- Test owner, non-owner, anonymous, disabled account, and cross-tenant requests.
- Deliverable: authorization matrix and regression tests.

## Week 5 — Recovery and federation
- Design single-use password-reset tokens.
- Draw Authorization Code + PKCE with state and nonce.
- Explain safe external-account linking.
- Deliverable: threat model and sequence diagram.

## Week 6 — Testing
- Write a test matrix for success, denial, expiry, replay, and malformed input.
- Add tests that prove denied requests do not change state.
- Deliverable: test report with evidence and unresolved gaps.

## Week 7 — Operations
- Draft deployment checklist and incident-response playbook.
- Identify secret rotation, monitoring, and revocation owners.
- Deliverable: architecture decision record and readiness review.

## Week 8 — Teach
- Prepare three short lessons: sessions, JWT, and authorization.
- Ask another learner to redraw the diagrams and solve a new scenario.
- Deliverable: lesson notes, quiz, and retrospective.

## Weekly retrospective
- What did I understand better this week?
- Which concept can I explain without notes?
- Which test exposed a mistaken assumption?
- What risk remains unresolved?
- What will I implement next week?
