# Authentication Glossary — Practical Definitions

| Term | Definition | Common confusion |
|---|---|---|
| Account | Record representing a subject in an application | It is not proof of current control |
| Identifier | Value used to locate an account | An identifier is not an authenticator |
| Credential | Evidence used by an authentication mechanism | Not every credential is a password |
| Authenticator | Mechanism that proves control, such as password, security key, or passkey | Strength depends on the complete protocol |
| Authentication | Verification of evidence supporting a claimed identity | It does not grant unlimited access |
| Authorization | Decision about permission for an action on a resource | Hiding a UI button is not authorization |
| Principal | Trusted identity context constructed from verified evidence | Never copy it from arbitrary request fields |
| Session | Server-recognized state associated with a client by an identifier | The cookie is not the entire session state |
| Session fixation | Attacker causes a victim to use a known session identifier | Rotation after authentication helps prevent it |
| CSRF | Attacker causes a browser to send an unwanted authenticated action | CORS is not a universal CSRF defense |
| CORS | Browser policy governing JavaScript access to cross-origin responses | It does not replace server authorization |
| XSS | Attacker-controlled script executes in a trusted origin | HttpOnly limits cookie reads but not every malicious action |
| Password hash | Encoded output of a password-hashing scheme and parameters | Fast SHA-256 alone is not a password-storage policy |
| Salt | Per-password random value used in password hashing | It is not a secret or a pepper |
| Pepper | Additional secret stored separately from the password database | Adds key-management and recovery trade-offs |
| Access token | Credential presented to a resource server | It is not necessarily a JWT |
| Refresh token | Credential used to obtain new access tokens | It requires revocation and replay design |
| JWT | Claims serialization format, often signed or encrypted | Decoding is not verification |
| Issuer (`iss`) | Entity that issued a token | Must match a trusted expected issuer |
| Audience (`aud`) | Intended recipient of a token | Helps prevent cross-service token substitution |
| OAuth 2.0 | Delegated authorization framework | Not by itself an authentication protocol |
| OpenID Connect | Identity layer built on OAuth 2.0 | ID and access tokens have different audiences |
| PKCE | Proof Key for Code Exchange | Does not replace redirect URI validation or state |
| TOTP | Time-based one-time password | Codes may still be phished or replayed depending on policy |
| WebAuthn | Web API/protocol for public-key authentication | Verify challenge, origin, and relying-party ID |
| Passkey | User-facing public-key credential, synced or device-bound depending on platform | Account recovery and lifecycle still matter |
| IDOR/BOLA | Broken object-level authorization exposing another object's data | Random IDs do not replace access checks |
| Tenant isolation | Preventing one tenant from accessing another tenant's data | Must cover list, search, export, and nested resources |
| Threat model | Assets, attackers, trust boundaries, threats, and mitigations | A checklist alone is not a threat model |
| Security invariant | Property that must remain true under hostile inputs and failures | It should be testable |
| Fail closed | Deny protected access when a required security decision cannot be made | Must be considered alongside availability |
| Credential stuffing | Automated use of leaked credential pairs against other services | Different from guessing one account's password |
| Account enumeration | Learning whether an account exists through observable behavior | Generic messages alone may not remove timing leaks |
