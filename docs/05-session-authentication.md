# 05 — Session-Based Authentication

## Mental model

The browser holds an opaque session identifier. The server stores session state and validates the identifier on protected requests. The cookie is a reference, not a trusted user profile.

## Lifecycle

1. Validate login input.
2. Find the account using a normalized identifier.
3. Verify the password hash.
4. Regenerate the session identifier after authentication to reduce session-fixation risk.
5. Store the authenticated user ID in server-side session state.
6. Set a cookie with appropriate flags.
7. Load and validate the session on protected requests.
8. On logout, invalidate server-side state and clear the cookie using matching settings.

## Expiration and storage

Consider idle timeout and absolute lifetime. A development memory store is not suitable for production. Use a supported persistent/distributed store, configure cleanup, and consider multiple application instances.

## Trade-offs

Advantages: server-side revocation and familiar browser cookie model. Costs: session storage, cleanup, and distributed coordination.

## Common mistakes

Leaving the memory store in production; not regenerating IDs after login; clearing a cookie without invalidating the server session; logging session IDs; ignoring CSRF; trusting client-provided user IDs.

## Lab

Run `labs/session-auth-api`, inspect the session cookie, and test login, `/auth/me`, logout, and reuse of the old cookie.

## Deep dive: session state machine

### Login transition
Before login, the browser may have an anonymous session. After successful credential verification, regenerate the identifier, assign the authenticated user ID to the new server-side session, save it, and only then return success. Regeneration helps prevent session fixation when an attacker knows or influences the prior identifier.

### Session validation
A cookie's presence is not enough. The server must resolve the session, check expiry and revocation state, and apply current account policy. If the account is disabled or deleted, the application needs a defined way to reject or invalidate existing sessions.

### Expiry and revocation
Define idle timeout, absolute lifetime, store TTL, logout behavior, password-change behavior, and all-device revocation. Browser cookie lifetime and server-side session lifetime are related but distinct. A persistent shared store is needed for reliable multi-instance deployments; the default in-memory store is a development convenience only.

### Failure tests
Test missing cookie, unknown session, expired session, store outage, login ID rotation, logout, replay of the old cookie, and disabled account. Do not print cookie values during debugging. Record the expected status and state transition before running each test.

