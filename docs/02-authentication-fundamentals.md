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

## Deep dive: keep the decisions separate

### Identification
Identification tells the system which account is being claimed. An email address or username is an identifier, not proof of control. Identifiers may be changed, recycled, mistyped, or deliberately chosen to impersonate someone.

### Authentication
Authentication verifies evidence associated with the claimed identity. A password, passkey, security key, or identity-provider assertion has different threat properties. Decide what evidence is accepted, how it is verified, and what happens when verification fails.

### Session establishment
Successful authentication must be represented on later requests. The application may create server-side session state or issue a token for a defined audience and purpose. Establishment includes expiry, rotation, storage, and revocation rules; it is not merely setting a frontend boolean.

### Authorization
Authorization is a separate decision for every protected action. Model the subject, action, resource, tenant, resource state, and policy. Do not infer permission merely because a user has authenticated.

### Exercise
Create two synthetic users and two private documents. Authenticate as user A, then request user B's document by changing its ID. The API must deny access and leave data unchanged. Explain which layer made the decision and how the test proves it.

