# Advanced Scenario Exercises

Work in a local lab with synthetic users and data. For each scenario, document assumptions, attack path, control, test, and residual risk.

## Scenario 1 — Cross-user note access
User A requests `GET /api/notes/USER_B_NOTE_ID`. Design server-side ownership/sharing checks. Test read, update, delete, export, and bulk endpoints—not only the detail route.

## Scenario 2 — Logout and copied cookies
A test client copies its session cookie, logs out in another client, then replays the old cookie. Define and test the expected behavior.

## Scenario 3 — Concurrent refresh
Two requests submit the same refresh token nearly simultaneously. Design an atomic rotation policy, define which request succeeds, and explain retry handling.

## Scenario 4 — Account recovery
An attacker obtains a reset URL after it has been used. Ensure the token is single-use, expires, and cannot be redeemed twice concurrently.

## Scenario 5 — OIDC account linking
A provider returns an email matching a local account. Design safe linking using validated issuer and subject, proof of control, and reauthentication.

## Scenario 6 — Leaked signing key
A signing key may have leaked. Document containment, verifier key rotation, token invalidation, monitoring, user impact, and regression tests.

## Scenario 7 — Disabled user
An administrator disables a user while their session is active. Decide how quickly access must stop and where the disabled state is checked.

## Scenario 8 — CORS misconfiguration
The API reflects arbitrary origins and allows credentials. Explain the risk, fix the allowlist, and test trusted/untrusted origins in a browser.

## Scenario 9 — Secret in telemetry
A tracing tool records Authorization headers. Remove the secret from telemetry, rotate potentially exposed credentials, and test redaction.

## Scenario 10 — Teach-back
Teach a beginner authentication, authorization, sessions, JWTs, OAuth, and OIDC. Ask them to draw the request flow and identify which component makes each decision.
