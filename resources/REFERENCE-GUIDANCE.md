# Reference Guidance

Use primary documentation first and verify that pages match the versions of your runtime and dependencies. Authentication guidance changes over time; a tutorial or video can help explain an idea but should not be the final authority for security-sensitive configuration.

## Core references to consult
- **OWASP Cheat Sheet Series:** Password Storage, Authentication, Session Management, Cross-Site Request Forgery Prevention, Cross-Site Scripting Prevention, Forgot Password, Multifactor Authentication, OAuth 2.0, and Authorization.
- **MDN Web Docs:** HTTP, cookies, CORS, same-origin policy, Fetch, and browser security.
- **Node.js documentation:** cryptographic random generation, environment variables, and supported runtime behavior.
- **Express documentation:** middleware, error handling, and deployment security.
- **MongoDB and Mongoose documentation:** indexes, schema validation, atomic updates, and transaction behavior relevant to your chosen design.
- **OAuth 2.0 Security Best Current Practice (RFC 9700)** and the OpenID Connect Core specification.
- **WebAuthn specifications and platform documentation** when learning passkeys.

## How to evaluate a reference
1. Prefer standards, official vendor documentation, and OWASP guidance for security decisions.
2. Check publication/update dates and the version of the dependency.
3. Identify whether the page describes a toy example or a deployable pattern.
4. Verify configuration defaults instead of assuming them.
5. Record the source and date in your project notes for security-sensitive choices.

## Rules for this repository
- Never implement password hashing, signatures, encryption, or authentication protocols from scratch.
- Do not copy secrets, tokens, real email addresses, or production user data into exercises.
- Treat examples as educational unless they explicitly state tested versions and deployment assumptions.
- A passing test suite does not prove a system secure; combine tests with threat modeling and review.
