# Lab Test Plan

The current automated suite covers credential validation, startup configuration, basic HTTP headers, malformed/oversized request bodies, and safe responses for invalid inputs. It does **not** prove the full authentication flow is secure.

## Automated tests currently included

- Email normalization and format validation
- Password minimum and maximum length
- Missing/non-object input
- Rejection of unexpected credential fields such as a client-supplied role
- Session-secret placeholder/length validation
- Port range validation
- Allowed NODE_ENV values

Run the suite from this directory with npm test. The HTTP-level tests use Supertest and do not require a running MongoDB instance because they deliberately avoid valid credential requests.

## Integration tests still needed

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
- denied resource access does not mutate protected state

Use a separate test database and never run destructive tests against a real database. Use synthetic credentials and clean up test data. Add browser tests for behaviors that depend on SameSite, CORS, redirects, and cookie handling; unit tests alone cannot prove those browser policies.
