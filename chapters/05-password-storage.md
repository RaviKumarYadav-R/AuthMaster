# Chapter 05 — Password Storage

## Why this matters
Passwords are human-chosen and often guessable. If a database is copied, attackers can attempt guesses offline without interacting with your rate limits. Password storage is designed to make each guess expensive while keeping legitimate login practical.

## Learning outcomes
- Distinguish hashing, encryption, and encoding.
- Explain salts and work factors.
- Choose a maintained password-hashing library using current guidance.
- Test password verification without ever storing a plaintext password.

## Hashing vs encryption vs encoding
- **Encoding** changes representation and is reversible without a secret (Base64 is not password protection).
- **Encryption** is reversible with a key and is intended for data that must later be recovered.
- **Password hashing** verifies a candidate without needing to recover the original password. Use a password-specific hashing scheme, not a fast general-purpose digest like plain SHA-256.

A password hash is still sensitive data. A leak can enable offline guessing, so protect database access and avoid exposing hashes in API responses or logs.

## Salt and work factor
A salt is a per-password random value that prevents equal passwords from automatically producing equal stored hashes and frustrates precomputed tables. Modern password-hashing libraries generally manage salts in their encoded output. A work factor makes each guess more expensive; it must be chosen with current recommendations and realistic hardware measurements.

Use a maintained library and follow its current guidance. Argon2id is a common modern choice where supported; scrypt or bcrypt may be appropriate in some established environments. Do not write your own password hashing algorithm, choose parameters from an outdated blog, or treat one algorithm as universally best for every deployment.

## Login verification flow
```text
Candidate password
       |
       v
Password-hashing library verify(candidate, storedHash)
       |
       +--> false: reject login safely
       |
       +--> true: continue authentication flow
```

The application should call the library's verification function. It should not decrypt a password or compare a candidate to a plaintext database field.

## Operational considerations
- Use a current, maintained library and supported runtime.
- Keep hashing parameters configurable and review them periodically.
- Consider a gradual rehash-on-success strategy when parameters change.
- Rate-limit online guesses; password hashing does not replace abuse prevention.
- Never log passwords, raw reset tokens, or stored password hashes.
- Avoid leaking whether an account exists through distinguishable login errors.
- For password changes or resets, require the appropriate proof and consider invalidating existing sessions.

## Practice lab
1. Write a short explanation of why plain SHA-256 is not a suitable password-storage design by itself.
2. Create fake test accounts only. Verify that the correct candidate passes and an incorrect candidate fails.
3. Inspect your library's encoded hash format and identify the algorithm/parameters without trying to reverse it.
4. Define how you will upgrade old hashes when a user next signs in.
5. Write tests ensuring password hashes are never included in user-profile responses.

## Review questions
- What does a salt protect against, and what does it not protect against?
- Why is a password hash not the same as encryption?
- Why are rate limits still needed if hashing is expensive?
- What happens when you need to raise hashing parameters?
- Why should a password hash not be returned to React?

## Mastery gate
Explain the storage design without using the phrase “encrypt the password.” Demonstrate correct/incorrect verification with a maintained library and a test proving the hash is not exposed through the API.

## References
Use current OWASP Password Storage Cheat Sheet guidance and the official documentation for your selected password-hashing library before choosing parameters.

## Implementation status
This is a design and verification lesson. Do not commit real passwords or hashes generated from real user credentials.
