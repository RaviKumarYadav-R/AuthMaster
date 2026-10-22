# 07 — Refresh Tokens and Rotation

Access credentials should generally be short-lived and scoped to resource access. A refresh credential is more powerful because it can mint new access credentials; protect it accordingly and send it only to the refresh endpoint.

## Rotation model

1. Client presents the current refresh credential.
2. Server validates it against stored state and checks expiry, revocation, and client/session context.
3. Server atomically marks the old credential used/revoked and creates a replacement.
4. Server returns a new access credential and replacement refresh credential.
5. If a previously rotated credential is reused, apply a documented reuse-detection policy, often revoking the token family/session and requiring reauthentication.

## Important details

- Store only a hash of high-entropy opaque refresh tokens where feasible.
- Bind tokens to a session/device record where appropriate.
- Use database transactions or equivalent atomic operations to prevent concurrent refresh races.
- Define behavior for retries and parallel tabs.
- Revoke sessions on logout, credential compromise, or relevant account changes.
- Never log tokens.

## Exercise

Draw normal refresh, expired refresh, revoked refresh, and reuse-detection flows. Explain what happens if two refresh requests arrive simultaneously.

## Deep dive: rotation, replay, and race conditions

### Token-family model
Represent each refresh credential with a unique identifier, a stored digest rather than the raw token where appropriate, subject/session binding, creation time, expiry, consumed/revoked state, and family identifier. Define whether one reuse event revokes the current token, the family, or all sessions.

### Atomic consumption
A refresh token must not be consumed twice. Use a transaction or atomic conditional update that succeeds only when the record is active and unexpired. Two concurrent refresh requests are a real race: exactly one should win under the chosen policy. Issuing a replacement before successfully consuming the old token can create replay paths.

### Failure handling
Define what happens if the database fails after consuming the old token but before the replacement is delivered. Design idempotency and recovery deliberately; do not blindly retry a one-time credential operation. Keep tokens out of URLs and logs, use TLS, and choose browser/native storage based on the threat model.

### Tests
Cover expiry, revocation, wrong session, replay, concurrent refresh, interrupted rotation, logout, and disabled accounts. Assert both response and persistent state after each test.

