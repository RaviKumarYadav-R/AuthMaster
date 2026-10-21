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
