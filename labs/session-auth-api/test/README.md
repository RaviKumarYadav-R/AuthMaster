# Lab Test Plan

The current automated test file covers request validation only. It does not prove the full authentication flow is secure.

Add integration tests for:
- account creation and duplicate registration
- correct and incorrect password login
- session ID regeneration on login
- authenticated and anonymous GET /auth/me
- logout and replay of the old session cookie
- expired or missing session
- disabled/deleted account behavior
- rate limiting and abuse responses
- cookie flags in production-like configuration
- CSRF behavior in a real browser
- safe error responses and redacted logs

Use a separate test database and never run destructive tests against a real database. Use synthetic credentials and clean up test data.
