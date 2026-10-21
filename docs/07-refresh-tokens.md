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
