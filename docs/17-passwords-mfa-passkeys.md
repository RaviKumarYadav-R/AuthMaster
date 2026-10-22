# 17 — Passwords, MFA, and Passkeys

Authentication strength depends on the full lifecycle, not only the login form.

## Password handling

Use a maintained password-hashing library with a password-specific algorithm. Argon2id is a strong default for new systems when supported. Configure work factors using current guidance and benchmark on realistic hardware. Never invent cryptography or use a fast general-purpose digest alone for password storage.

Use a unique salt per password; modern libraries handle salt generation and encoding. Keep password input limits compatible with the chosen algorithm and avoid silently truncating passwords. Normalize account identifiers consistently, but do not transform passwords in surprising ways.

## Password policy

- Encourage long, unique passwords and password managers.
- Avoid arbitrary composition rules that push users toward predictable patterns.
- Consider screening against known compromised passwords.
- Rate-limit attempts and detect credential-stuffing patterns.
- Use generic failure messages where account enumeration is a concern.
- Require reauthentication for sensitive changes.
- Respond to compromise rather than forcing periodic changes without a risk-based reason.

## Multi-factor authentication

Factor categories are commonly something you know, have, or are. MFA adds resilience when one factor is compromised, but enrollment, recovery, and reset flows must also be protected.

TOTP codes are time-based shared-secret codes and can be phished. Push prompts can be abused through fatigue attacks. Hardware security keys and passkeys can provide stronger phishing resistance when implemented correctly. Recovery codes should be high entropy, stored safely, and invalidated after use.

## Passkeys and WebAuthn

Passkeys use public-key cryptography and are designed to resist phishing by binding authentication to the relying party. The server stores public credential material and validates signed challenge responses; it does not store the private key. Implementation includes challenges, origin and RP ID checks, user-verification policy, credential lifecycle, and recovery.

Use a maintained library and current platform documentation rather than implementing WebAuthn from scratch.

## Recovery is part of authentication

A system with strong login but weak email-reset recovery is still weak. Threat-model email changes, lost devices, recovery codes, help-desk overrides, and session revocation.

## Teaching exercise

Compare password-only, password + TOTP, and passkey authentication. For each, list phishing resistance, recovery risks, usability constraints, and operational requirements.
