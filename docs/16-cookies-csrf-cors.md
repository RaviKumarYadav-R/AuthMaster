# 16 — Cookies, CSRF, CORS, and Browser Trust

These mechanisms solve different problems. Treat them separately in architecture and tests.

## Cookie attributes

- **HttpOnly:** JavaScript cannot read the cookie through ordinary browser APIs. It does not stop injected JavaScript from making authenticated requests.
- **Secure:** browser sends the cookie only over HTTPS, subject to browser-specific localhost behavior. Use it in production.
- **SameSite=Lax:** restricts many cross-site cookie sends while allowing some top-level navigations. Useful defense-in-depth, not proof CSRF is impossible.
- **SameSite=Strict:** stricter cross-site behavior, but can disrupt legitimate navigation and sign-in flows.
- **SameSite=None:** permits cross-site sending and requires Secure in modern browsers; use only when necessary.
- **Domain:** broadens which hosts receive the cookie. Avoid unless needed.
- **Path:** scopes where a cookie is sent; it is not a strong security boundary.
- **Max-Age/Expires:** controls browser persistence, not necessarily server-side session validity.

## CSRF threat model

CSRF abuses a browser's automatic credential attachment to trigger an unwanted action. Defenses depend on the application:
1. Use appropriate SameSite cookie settings.
2. Use anti-CSRF tokens for cookie-authenticated state-changing requests where appropriate.
3. Validate Origin/Referer where appropriate and define behavior when headers are absent.
4. Never perform state changes with GET.
5. Require reauthentication or stronger confirmation for high-impact actions.
6. Test the actual browser/client topology.

CORS alone is not a complete CSRF defense. A cross-origin request can sometimes be sent even when the attacker cannot read the response.

## CORS mental model

An origin is the scheme, host, and port tuple. CORS tells browsers whether scripts from one origin may read a response from another. It is not server-side authorization and does not constrain non-browser clients in the same way.

For credentialed cross-origin requests:
- Allow only trusted origins; do not reflect arbitrary Origin values.
- Configure credential allowance deliberately.
- Do not combine credentialed access with a wildcard allowed origin.
- Understand preflight and allowed methods/headers.
- Align CORS policy with cookie SameSite settings and frontend deployment.

## XSS connection

HttpOnly reduces direct cookie extraction but does not make XSS harmless. Script executing in the trusted origin may read page data and invoke authenticated actions. Use safe DOM APIs, context-appropriate output encoding, careful HTML sanitization, dependency hygiene, and Content Security Policy as defense-in-depth.

## Lab questions

1. Why does HttpOnly not stop a script from calling a logout endpoint?
2. Why is CORS not the same as authorization?
3. Which cookie attributes fit a same-site React + Express app?
4. What changes if frontend and API use different sites?
5. Which tests would prove the CSRF defense works in a real browser?
