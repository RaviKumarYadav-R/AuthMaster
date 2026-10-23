# Start Here

AuthMaster is designed to teach you how authentication works—not just how to copy a login tutorial. You will learn what each mechanism protects, where it can fail, and how to test it.

## Before you begin
Basic JavaScript is enough to start. You do not need to know JWT, cookies, OAuth, or cryptography yet. Use Node.js LTS, npm, Git, a code editor, browser developer tools, and a local database when a lab requires one. Work locally with synthetic test accounts.

## The request model
```text
Human
  |
  v
Browser / React UI
  | HTTPS request + cookie or authorization header
  v
Backend API ---- validate input, authenticate, authorize
  |
  v
Database / identity provider
  |
  v
Backend response -> Browser
```

These parts have different responsibilities. The frontend can improve usability, but it cannot make the final authorization decision. The backend must enforce access rules for every protected operation.

## Five questions for every chapter
1. **Who is the actor?** Visitor, authenticated user, administrator, or identity provider?
2. **What evidence is presented?** Password, cookie-backed session, bearer token, one-time code, or federated assertion?
3. **Who verifies it?** Which trusted server or component makes the decision?
4. **What is allowed?** Authentication identifies the principal; authorization decides whether the principal may act on a resource.
5. **What can fail?** Consider replay, expiry, theft, tampering, brute force, enumeration, CSRF, XSS, and broken object-level authorization.

## A repeatable study session
Review the previous flow, draw the new one, build a small exercise, test one failure path, then explain what you learned in your own words. Do not count a chapter as complete just because the code runs.

## Next
Open [Course Map](COURSE-MAP.md), then begin [Chapter 01 — Identity and Authentication](chapters/01-identity-and-authentication.md).
