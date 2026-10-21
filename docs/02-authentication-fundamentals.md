# 02 — Authentication Fundamentals

## Core vocabulary

- **Identity:** the account or principal represented by a system.
- **Credential:** evidence used to prove control of an identity, such as a password, passkey, or security key.
- **Authentication:** verifying a claimed identity or authenticator.
- **Authorization:** deciding whether a principal may perform an action on a resource.
- **Session:** server-recognized state associated with a client across requests.
- **Token:** a value presented to another component; meaning depends on its protocol.
- **MFA:** combining independent authentication factors to increase assurance.

An authenticated user is not automatically allowed to read every record. Authorization must be checked independently.

## Account lifecycle

Registration → verification where required → login → authenticated state → protected actions → renewal/reauthentication → logout/revocation. Other flows include password change, account recovery, email change, MFA enrollment, and account deletion.

## Common methods

- Passwords are familiar but vulnerable to guessing and reuse.
- Server-side sessions provide revocable server state, often represented by an opaque cookie.
- Signed tokens can help across service boundaries but require careful validation and revocation design.
- Passkeys use public-key credentials designed to resist phishing.
- OAuth 2.0 is delegated authorization; OpenID Connect adds an identity layer.
- SSO lets multiple applications rely on one identity system.

## Exercise

Explain how a server recognizes a logged-in user after the original login request has ended. Compare a session cookie with a signed access token.
