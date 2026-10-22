# 24 — JWT Validation: Deep Dive

JWT is a format, not a complete authentication system. The application must decide which tokens it accepts and what their claims mean.

## Signed does not mean secret
A typical signed JWT has header and payload parts that are Base64URL-encoded. Anyone with the token can usually decode them. Signing protects integrity only when a trusted verifier validates the signature correctly.

## Validation checklist
- Restrict algorithms to the explicitly intended set.
- Verify the signature with the correct trusted key.
- Validate expiration and not-before claims where required.
- Validate issuer and audience against configured values.
- Validate subject and token purpose.
- Do not accept an ID token where an API access token is expected.
- Treat key identifiers as untrusted input; resolve keys only through trusted configuration/JWKS policy.
- Define clock-skew handling explicitly.
- Fail closed on malformed tokens, key errors, or unexpected claims.
- Avoid logging raw tokens.

## Key management
Use a maintained library and a documented key-rotation process. With asymmetric signing, the private key signs and trusted public keys verify. With symmetric signing, every verifier holding the shared secret may also be able to mint tokens. Protect keys accordingly.

## Audience separation
A token minted for one API should not be accepted by another merely because the signature is valid. Validate audience and purpose so credentials cannot be replayed across unintended contexts.

## Revocation choices
Short expiry reduces the exposure window but does not provide immediate revocation. A denylist, token version, session lookup, or opaque-token introspection may provide stronger revocation at the cost of state and availability dependencies.

## Common anti-patterns
- Decode-only validation
- Overly broad algorithm acceptance
- Missing audience validation
- Treating payload as private
- Accepting tokens from arbitrary issuers
- Using a long-lived access token as a refresh token
- Storing tokens in logs or URLs
- Assuming a signed token replaces authorization checks

## Exercise
Write pseudocode for a verifier and annotate every check. Add tests for expired, wrong issuer, wrong audience, malformed signature, unexpected algorithm, and valid token.
