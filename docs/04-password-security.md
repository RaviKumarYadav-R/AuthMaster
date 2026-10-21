# 04 — Password Security

## Storage rule

Never store plaintext passwords. Use a dedicated password-hashing algorithm and maintained library. Argon2id is a strong default for new applications when supported; scrypt or bcrypt may fit existing systems and constraints. Do not use a fast general-purpose hash such as SHA-256 alone for password storage.

## Terms

- **Salt:** unique random value incorporated into hashing; modern libraries usually manage it.
- **Work factor:** CPU/memory cost configured for the hash.
- **Verification:** use the library's verify function rather than inventing string comparisons against a re-hash.
- **Upgrade:** rehash after successful login when stored parameters are outdated.

## Policy and abuse prevention

Set sensible length limits; avoid arbitrary composition rules that encourage predictable patterns; encourage password managers and unique passwords; rate-limit login and recovery; consider breached-password checks; use generic responses when account enumeration is a concern; require MFA or stronger checks for high-impact actions.

## Never do this

- Log passwords or hashes.
- Email an existing password.
- Treat encryption as a substitute for password hashing.
- Implement your own password-hashing algorithm.

## Exercise

Write tests for correct password, incorrect password, malformed stored hash, and legacy hash upgrade. Explain why salts and work factors matter.
