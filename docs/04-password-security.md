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

## Deep dive: password lifecycle and resource controls

### Registration path
Accept bounded input, validate the chosen policy, normalize only the identifier according to a documented rule, hash the password using a maintained password-hashing library, and persist only the hash. Never include passwords in logs, traces, analytics, error messages, or support tickets.

### Verification path
Fetch the stored hash only in the credential-verification path. Use the library's verification function rather than comparing strings or implementing cryptography. Return a generic credential error for unknown account and incorrect password when account enumeration is a concern. If supported, upgrade outdated hash parameters after a successful verification.

### Salts and work factors
A unique salt makes equal passwords produce different stored hashes and prevents reusable precomputed tables from being broadly effective. A work factor increases guessing cost but also consumes server resources. Measure settings against deployment capacity and protect expensive verification paths with rate limits and monitoring.

### Exercises
Confirm the database has no plaintext password field. Register two synthetic users with the same password and inspect that the stored hashes differ. Test a wrong password, maximum input length, and log redaction. Explain why hashing is not encryption and why hashing alone does not prevent credential stuffing.

