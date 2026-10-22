# Spaced-Repetition Flashcards

Answer before opening the relevant chapter. Add cards when you discover a misconception.

## Fundamentals

- Difference between identification, authentication, and authorization?
- Why is a user ID not an authenticator?
- What is a principal, and who constructs it?
- Why check authorization for every protected resource?
- What does identity proofing establish that ordinary login does not?

## Passwords and registration

- Why prefer password-specific hashing over a fast general-purpose hash?
- What does a salt do, and what does it not do?
- Why is a database uniqueness constraint necessary after an application duplicate check?
- What is mass assignment?
- Offline guessing vs online credential stuffing?

## Sessions and browser security

- Why is a session cookie a bearer credential?
- Why does deleting a cookie not revoke a stolen copy?
- What is session fixation?
- What do HttpOnly, Secure, and SameSite each do?
- Why are CORS and CSRF not interchangeable?
- What is the purpose of Cache-Control: no-store?

## Tokens and protocols

- Why is decoding a JWT not verification?
- Why validate issuer and audience?
- Difference between access token and ID token?
- What does PKCE protect?
- Why must refresh-token rotation be atomic?
- What does refresh-token reuse suggest?

## Recovery and MFA

- Why should recovery tokens be short-lived, single-use, and purpose-bound?
- Why can TOTP still be phished?
- What makes passkeys resistant to common credential-phishing flows?
- Why is factor reset high risk?

## Testing and operations

- What is a security invariant?
- Why test concurrent one-time-token use?
- Why fail safely when the session store is unavailable?
- Which credentials must never appear in logs?
- What are the first priorities after a signing-key leak?

## Review schedule

Review on the same day, then day 1, 3, 7, 14, and 30. Try to recall first, correct mistakes, and re-test weak cards. Familiarity is not recall.
