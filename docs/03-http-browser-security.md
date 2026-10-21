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
