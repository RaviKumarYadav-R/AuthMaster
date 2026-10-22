# 19 — Testing Authentication Correctly

Authentication tests should prove allowed and denied behavior. A successful login test alone gives little confidence.

## Testing layers

1. **Unit tests:** validation, policy decisions, claim checks, pure functions.
2. **Integration tests:** routes with database/session-store behavior and credential lifecycle.
3. **Browser tests:** cookie attributes, redirects, SameSite, CSRF, and cross-origin behavior.
4. **Security tests:** authorization bypass, brute-force controls, replay, expiry, race conditions, malformed inputs.
5. **Operational tests:** store outage, key rotation, deployment configuration, log redaction, and alerting.

## Minimum scenario matrix

| Area | Test | Expected result |
|---|---|---|
| Registration | malformed email/password | reject without creating account |
| Registration | duplicate registration race | no duplicate account; safe response |
| Password | wrong password | no session created |
| Login | successful login | session ID changes |
| Session | anonymous /auth/me | 401 |
| Session | expired/revoked cookie | 401 |
| Logout | replay old cookie | rejected |
| Authorization | user A requests user B resource | denied |
| Recovery | reset token used twice | second use rejected |
| JWT | expired or wrong audience | rejected |
| JWT | unexpected algorithm | rejected |
| Refresh | old rotated token reused | reuse policy executes |
| Rate limit | repeated login attempts | limit activates and is observable |
| CSRF | cross-site state-changing request | rejected by selected defense |
| Operations | secret in telemetry | redaction test fails |

## Avoid misleading tests

- Use isolated test databases and predictable cleanup.
- Never use real accounts, production credentials, or real email delivery.
- Keep secrets out of snapshots and test output.
- Control time where possible to test expiry.
- Test concurrent refreshes and duplicate registrations when races are possible.
- Confirm a denied response did not mutate server state.
- Distinguish network failure from a definite unauthenticated response in frontend tests.

Use Node's built-in test runner for pure logic, Supertest or an equivalent HTTP integration tool for Express, and Playwright or another maintained browser automation tool for browser-specific behavior. Verify current versions and compatibility before installing.

A feature is not complete until success, failure, authorization, expiry/revocation, logging, and documentation have been tested.
