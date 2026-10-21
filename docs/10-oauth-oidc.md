# 10 — OAuth 2.0 and OpenID Connect

OAuth 2.0 is an authorization framework. OpenID Connect (OIDC) adds an identity layer. Do not casually treat every OAuth access token as proof of a user's identity.

## Key terms

- **Authorization Code + PKCE:** common modern flow for browser/mobile public clients.
- **State:** correlates the authorization response with the initiating request and helps defend against request forgery.
- **Nonce:** binds an OIDC ID token to an authentication request.
- **Redirect URI:** must be registered and matched according to provider rules.
- **Issuer/audience:** claims that must be validated as required by the protocol.

Do not treat an ID token as an API access token. Do not implement protocols from scratch when a maintained provider SDK is appropriate.

## Integration checklist

Use a maintained OIDC client/provider SDK; use Authorization Code with PKCE where appropriate; validate state and nonce; validate issuer, audience, signature, and time claims; match redirect URIs strictly; keep confidential client secrets on the server; define external-identity mapping and account-linking rules; document local and provider logout behavior.

## Exercise

Draw the provider redirect flow. Mark where state, code, PKCE verifier, ID token, and local application session are created, sent, and validated.
