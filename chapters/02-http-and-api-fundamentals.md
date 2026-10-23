# Chapter 02 — HTTP and API Fundamentals

## Why this matters
Authentication travels through requests and responses. If HTTP feels mysterious, cookies, login endpoints, authorization headers, redirects, and API errors will too.

## Learning outcomes
Identify a method, path, headers, body, status code, and response headers. Explain why HTTPS matters and distinguish client input from server-verified state.

## Vocabulary
- **HTTP method:** intended operation, such as GET or POST.
- **Path:** resource or operation, such as `/api/me`.
- **Header:** metadata in a request or response.
- **Body:** optional payload, often JSON.
- **Status code:** number describing the result category.
- **Cookie:** browser-managed data sent according to cookie policy and scope.
- **Bearer token:** credential whose possession may authorize a request; protect it like a password.
- **HTTPS:** HTTP protected by TLS, providing transport confidentiality and integrity when configured correctly.

## Anatomy of a request
```http
POST /api/login HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{"email":"learner@example.test","password":"example-only"}
```
This is illustrative only. The password is synthetic and must not be reused. The method is POST, path is `/api/login`, content type describes the body, and the JSON contains client-supplied values. Every client value is untrusted until validated.

An illustrative response:
```http
HTTP/1.1 200 OK
Content-Type: application/json
Set-Cookie: session=REDACTED; HttpOnly; Secure; SameSite=Lax; Path=/

{"user":{"id":"usr_demo","email":"learner@example.test"}}
```
The cookie value is redacted. A real session identifier must be unpredictable, protected in transit, configured for the deployment environment, and validated by the server.

## Common status codes
| Code | Meaning | Example |
|---|---|---|
| 200 | Success | Profile returned |
| 201 | Created | Account created |
| 204 | Success without body | Logout completed |
| 400 | Invalid request | Malformed JSON |
| 401 | Authentication missing or invalid | No valid session |
| 403 | Authenticated but not permitted | User lacks permission |
| 404 | Not found or deliberately concealed | Unknown resource |
| 409 | Conflict | Duplicate unique identifier |
| 422 | Semantic validation failed | Field violates a rule |
| 429 | Too many requests | Rate limit reached |
| 500 | Unexpected server error | Unhandled internal failure |

Exact choices depend on API design. Avoid leaking whether an account exists in login and recovery flows when that would help account enumeration.

## HTTPS and secrets in transit
Credentials or bearer tokens sent over plain HTTP can be exposed or modified by an attacker who can observe the network. Use HTTPS in production. Never put passwords or bearer tokens in URLs: URLs can appear in history, logs, analytics, and referrer data.

## Validation and trust
A client can omit fields, send unexpected properties, send wrong types, or bypass the UI entirely. Validate at the server boundary. Validation checks acceptable input shape; authorization checks whether the authenticated actor may perform the operation. Neither replaces the other.

## Practice
1. Label the method, path, headers, and body in the request above.
2. Write a fictional `GET /api/me` request with a cookie placeholder. Explain why the placeholder is not itself proof of identity.
3. Choose plausible responses for missing session, malformed JSON, cross-user access, and rate-limited login. Justify them.
4. Explain why a reset token in a URL may leak.
5. Draw where validation, authentication, and authorization occur.

## Mastery gate
Read a raw request and explain each important field. Distinguish client input from verified state and explain why HTTPS and server-side checks are required.

## Implementation status
This chapter contains illustrative snippets, not a running API. The capstone implements routes progressively.
