# 03 — HTTP and Browser Security

## Requests are separate

HTTP is request/response based. A login request does not magically make later requests authenticated. The application must receive a credential (often a cookie) and validate it on each relevant request.

## Cookies

Review `HttpOnly`, `Secure`, `SameSite`, `Path`, `Domain`, and expiry. `HttpOnly` prevents JavaScript from reading a cookie but does not stop injected JavaScript from making authenticated requests. `Secure` restricts transmission to HTTPS. Choose cookie scope narrowly.

## CORS vs CSRF vs XSS

- **CORS** controls whether browser JavaScript from an origin may read a cross-origin response. It is not authentication and does not stop all cross-origin requests.
- **CSRF** abuses a browser's automatic credential sending to trigger unwanted actions. Use appropriate SameSite settings and, where needed, anti-CSRF tokens or origin checks.
- **XSS** runs attacker-controlled script in a trusted origin. Output encoding, safe DOM APIs, and a strong Content Security Policy help reduce risk. HttpOnly does not solve XSS.

## Browser storage

Anything readable by JavaScript is exposed to successful same-origin script injection. Avoid putting long-lived bearer credentials in localStorage by default. Choose a storage design based on threat model and client type.

## HTTPS

Use HTTPS in deployed environments. Do not send passwords or tokens over plaintext HTTP. Configure proxy/TLS termination and secure-cookie behavior deliberately.

## Exercise

Inspect a login response and explain every cookie attribute. Then describe one attack each for CSRF and XSS and the limits of the corresponding defenses.

## Deep dive: browser request lifecycle

### Request and response anatomy
Record the method, path, headers, cookie, content type, body, status, response headers, and response body for each authentication request. HTTPS protects data in transit to the TLS endpoint; it does not make client input trustworthy or prevent an authenticated user from requesting another user's data.

### Origin versus site
An origin is defined by scheme, host, and port. A site is a different browser concept used by cookie policies. Two URLs may be cross-origin but same-site, or cross-site. This distinction matters when choosing SameSite settings, CORS behavior, and CSRF defenses.

### Browser security controls are not interchangeable
CORS primarily controls whether browser JavaScript can read a cross-origin response. CSRF concerns unwanted authenticated requests using ambient credentials. XSS is script execution in a trusted origin. CSP can reduce some XSS impact, but output encoding and safe DOM APIs remain important. HttpOnly limits cookie reads, not all actions malicious script can perform.

### Lab
Use browser DevTools Network to inspect login and current-user requests. Test missing cookies, malformed JSON, an oversized body, a cross-origin fetch, and a state-changing request without the intended CSRF defense. For each case, state whether the browser or server is responsible for rejecting it.

