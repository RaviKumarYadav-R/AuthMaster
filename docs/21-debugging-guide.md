# 21 — Authentication Debugging Guide

Debug one request across the client, browser, API, session/token store, and database. Never paste real cookies, access tokens, refresh tokens, passwords, or production logs into chat or public issues.

## Login succeeds but /auth/me returns 401
Check whether the browser stored the cookie, whether the next request sends it, cookie Path/Domain/SameSite/Secure settings, frontend credentials mode, proxy HTTPS detection, session-store persistence, and whether the session was regenerated and saved before the response.

## Cookie missing in production
Check HTTPS, Secure, correct domain, reverse-proxy trust configuration, browser third-party-cookie restrictions, SameSite policy, and whether the response contains Set-Cookie. Do not broadly weaken cookie settings without understanding the topology.

## Logout appears to work but an old cookie still works
Verify that server-side session state was destroyed, all app instances use the same store, the old cookie was actually replayed in an isolated test, and no fallback trusts client state. Clearing a browser cookie alone is not equivalent to revoking a copied identifier.

## CORS error
Inspect browser console and network response. Check exact origin (scheme/host/port), OPTIONS preflight, allowed headers/methods, and credential settings. Do not set wildcard origins reflexively or assume CORS protects the API from non-browser clients.

## JWT accepted after expiry
Check that the server verifies rather than merely decodes the token, enforces exp/nbf, uses a trustworthy clock, validates issuer/audience, rejects unexpected algorithms, and has no unsafe fallback path.

## Password verification always fails
Check whether the database field is excluded by default and explicitly selected, whether the stored hash was persisted, whether password bytes are transformed/truncated, and whether library formats changed. Never log raw passwords as a debugging shortcut.

## Safe debugging checklist
1. Reproduce in a non-production environment using synthetic accounts.
2. Capture method, path, status, and relevant redacted headers.
3. Trace state transitions and storage writes.
4. Check negative cases and server-side mutations.
5. Add a regression test before closing the issue.
6. Remove temporary debugging output and confirm no secret is logged.

## Deep dive: debug by following the state

### Create a request timeline
Record the exact sequence of registration, login, cookie receipt, protected request, and logout with timestamps and status codes. Inspect method, URL, headers, JSON shape, Set-Cookie, and whether the next request sends Cookie. Change one variable at a time.

### Symptom map
- 400: inspect JSON syntax, content type, and validation rules.
- 401 on login: verify normalized identifier, stored hash, and password verification; do not weaken checks.
- Login succeeds but current-user returns 401: inspect cookie scope, browser storage, HTTPS/Secure behavior, store persistence, and proxy configuration.
- CORS error: inspect exact origin and credentials policy; do not combine wildcard origins with credentialed requests.
- Old session works after logout: verify server-side invalidation and store semantics.
- Only production cookies fail: inspect TLS termination and trusted-proxy configuration.

### Safe diagnostics
Log request ID, route, status, latency, and non-sensitive error category. Never log passwords, cookie headers, session IDs, bearer tokens, recovery links, or raw request bodies. Write a hypothesis before changing code and add a regression test after finding the root cause.

