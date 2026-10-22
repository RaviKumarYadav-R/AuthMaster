# 25 — OAuth 2.0 and OIDC Flow Walkthrough

Use a maintained provider SDK/client. This chapter teaches protocol concepts so you can configure and review an integration; it is not an instruction to implement a protocol from scratch.

## Actors
- **End user:** owns the identity/account.
- **Client application:** starts the flow.
- **Authorization server / OpenID Provider:** authenticates the user and issues protocol responses.
- **Resource server:** accepts access tokens for an API.
- **Relying party:** OIDC client that consumes an ID token and establishes local application state.

## Authorization Code + PKCE at a high level
1. Client creates a high-entropy code verifier and derives a code challenge.
2. Client creates a random state value; OIDC also uses a nonce for ID-token request/response binding.
3. Client redirects to the provider with client ID, redirect URI, scopes, state, code challenge, and response type.
4. Provider authenticates the user and obtains consent where applicable.
5. Provider redirects to the registered URI with an authorization code and state.
6. Client verifies state before proceeding.
7. Client sends the code and PKCE verifier to the token endpoint using the correct client authentication method.
8. Client validates the ID token if using OIDC: signature, issuer, audience, expiry, nonce, and relevant protocol requirements.
9. Application maps the validated external identity to a local account using issuer + subject, then creates its own session or follows its documented token model.

## State, nonce, and PKCE are not interchangeable
- **State** correlates the authorization response with the initiating request and helps prevent login CSRF.
- **Nonce** binds the ID token to the authentication request.
- **PKCE verifier** proves that the party redeeming the code initiated the flow.

## Redirect URI and account linking
Match redirect URIs strictly according to provider rules. Avoid open redirects. Do not identify an external account solely by email; use a validated issuer/subject pair. Account linking should require authentication to the existing account and proof of control of the external identity.

## Logout
Provider logout and local application logout are different. Document whether local sessions are invalidated, provider sessions remain active, and front-channel/back-channel logout is supported.

## Review questions
Which component validates the ID token? Where is the client secret stored? Which redirect URIs are registered? How are state and nonce checked? How is an external identity mapped to a local user? What happens when the provider is unavailable?

## Deep dive: map protocol artifacts to validators

Draw the browser, client application, authorization server, and resource server separately. Label authorization request, state, nonce, PKCE challenge, authorization code, PKCE verifier, token response, ID token, and access token. State which actor creates, receives, stores, and validates each artifact.

### Protocol invariants
Redirect URIs are registered and matched strictly. State is tied to the initiating browser transaction. PKCE binds code redemption to the initiating client. Nonce binds the ID token to the authentication request. Issuer and audience are validated. External identity mapping uses a stable issuer/subject pair.

### Common mistakes
Avoid accepting a token without validation, confusing ID and access tokens, allowing open redirects, linking accounts based only on unverified email, or assuming provider logout clears local application state. Use a maintained OIDC library.

### Practice
Create a validation checklist for every callback parameter and token claim. Test wrong state, wrong nonce, redirect mismatch, wrong issuer/audience, expired token, and account-linking collision in a non-production provider environment.

