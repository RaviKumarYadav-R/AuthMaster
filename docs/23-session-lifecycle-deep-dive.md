# 23 — Session Lifecycle: Deep Dive

## A session cookie is a bearer credential
Anyone who obtains a valid session identifier may be able to act as that session until it expires or is revoked. Protect it as a secret. Never place session IDs in URLs, analytics, screenshots, or logs.

## Session fixation
An attacker may try to make a victim use an identifier known to the attacker. Regenerate the session identifier after login and relevant privilege changes. Do not carry an attacker-controlled anonymous session ID into an authenticated session without rotation.

## Expiration
Use an idle timeout and an absolute lifetime appropriate to risk. A sliding idle timeout should not let a session live forever. High-impact applications may require reauthentication for sensitive actions even when the session remains active.

## Logout semantics
A robust logout invalidates server-side state and clears the client cookie. If sessions are replicated or cached, ensure invalidation reaches the relevant store. Explain whether logout applies only to the current device or all sessions.

## Session store behavior
Express MemoryStore is for development only. It is not designed for production, does not provide reliable multi-instance persistence, and can leak memory. Select a maintained store compatible with deployment. Protect the store, restrict network access, and monitor availability.

## Proxy and secure cookies
When TLS terminates at a trusted reverse proxy, configure Express proxy trust narrowly if required. Incorrect trust configuration can break secure cookies or create spoofing risks. Never blindly trust arbitrary forwarded headers.

## Privilege changes
Regenerate or revoke sessions when privilege levels change where appropriate. A disabled account must be denied on protected requests even if its cookie is syntactically valid.

## Test plan
1. Login and capture a session ID in a local test client.
2. Confirm a new session ID after authentication.
3. Access a protected route.
4. Logout and replay the old ID.
5. Expire or delete the server-side session and retry.
6. Disable the account and retry.
7. Verify no session ID appears in logs.
