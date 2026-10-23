# Chapter 03 — Browser Security Boundaries

## Why this matters
A browser is a useful client, not a trusted security authority. Users can inspect or modify their client and send requests without using your UI.

## Core concepts
- **Origin:** scheme + host + port. `https://app.example.test` and `https://api.example.test` are different origins.
- **Same-origin policy (SOP):** limits how one origin can read data from another.
- **CORS:** a server-controlled mechanism governing permitted cross-origin browser reads; not authentication or authorization.
- **XSS:** attacker-controlled script executes in a page's context.
- **CSRF:** a victim's browser is induced to send an unwanted request using ambient credentials such as cookies.
- **Cookie attributes:** controls including `HttpOnly`, `Secure`, `SameSite`, `Path`, and `Domain`.

## Cookie attributes in plain language
- `HttpOnly`: prevents ordinary page JavaScript from reading the cookie. Malicious JavaScript may still make requests as the user.
- `Secure`: sends the cookie only over secure transport, subject to browser behavior.
- `SameSite`: limits some cross-site cookie sending and can reduce CSRF exposure.
- `Path` and `Domain`: scope where a browser sends the cookie. Avoid unnecessarily broad scope.
- Expiration: limits browser retention; server-side session expiry must also be enforced.

## XSS and CSRF differ
XSS executes script in the page's origin. That script may perform actions with the user's active session even if `HttpOnly` prevents direct cookie reading. Reduce XSS risk with context-appropriate output handling, safe DOM APIs, careful dependency use, and a well-designed Content Security Policy.

CSRF abuses automatic credential sending to trigger an unwanted action. Defenses may include SameSite cookies, anti-CSRF tokens, Origin/Referer validation where appropriate, and avoiding state-changing GET endpoints. Choose based on your authentication design.

## Trust boundaries
```text
Untrusted user input
        |
        v
Browser UI ---- browser policies ---- other origins
        |
        | request (may be handcrafted)
        v
Backend API <---- trusted enforcement point
        |
        +--> authenticate request
        +--> authorize resource action
        +--> validate input
```
CORS does not stop curl, scripts, or non-browser clients from calling an API. It governs browser behavior. Enforce access rules on the backend.

## Practice
1. Explain why `HttpOnly` helps but does not eliminate XSS impact.
2. Explain why CORS is not an API authorization system.
3. List CSRF risks of cookie authentication and defenses your design will use.
4. Inspect cookies in a local test app; never copy real session cookies into notes or screenshots.
5. Call a protected endpoint directly rather than through the UI and record the result.

## Mastery gate
Distinguish XSS, CSRF, SOP, and CORS; explain common cookie attributes and limitations; identify the backend as the final enforcement point.

## Further reading
Consult current primary documentation for browser cookie behavior, Fetch/CORS, and OWASP Cross-Site Scripting and Cross-Site Request Forgery Prevention guidance before deploying.
