# 13 — React Frontend Integration

## UI state is not security

A React auth context can display the current user's state and coordinate loading/logout, but it cannot enforce access control. The backend must authenticate and authorize every protected request.

## Startup flow

1. Show a loading state while checking the server session (for example, `GET /auth/me`).
2. Render anonymous or authenticated UI based on the server response.
3. On `401`, clear stale client state and redirect or show a sign-in prompt.
4. On logout, call the server endpoint so the server-side session is invalidated; then clear local UI state.
5. Handle network errors separately from a definite anonymous response.

## Common mistakes

- Treating a hidden button or route guard as authorization.
- Assuming client state persists truthfully after reload.
- Storing sensitive long-lived credentials in JavaScript-accessible storage without a threat-model justification.
- Failing to handle expired sessions and loading states.
- Redirect loops caused by confusing network failure with `401`.

## Exercise

Build an AuthProvider with `user`, `status`, `refreshUser`, `login`, and `logout`. Test loading, anonymous, authenticated, expired session, and server error states. Ensure server routes independently enforce permissions.

## Deep dive: React client state and trust boundaries

### Model the states
Represent startup/loading, authenticated with a safe user profile, unauthenticated, and request failure separately. On app startup, query the current-user endpoint rather than trusting localStorage as proof of authentication. Handle expired sessions consistently and clear client state after logout.

### Keep authority on the server
A React route guard improves navigation and user experience; it does not protect an API. Every protected API route must authenticate the request and authorize the requested resource. Hiding a button is not an access-control decision.

### Cookie and CORS behavior
For cross-origin cookie requests, the client may need credentials inclusion and the server must allow the exact trusted origin plus credentials. Wildcard origin is not valid for credentialed browser access. CSRF defenses remain necessary where cookies are automatically attached. Confirm same-origin versus cross-origin behavior in the actual deployment.

### Practice
Test app reload, expired session, logout in another tab, network failure, CORS rejection, and direct URL navigation to a protected screen. Then manually construct a request for another user's resource and prove that the API denies it regardless of the UI.

