# Official References and Standards

Read the section relevant to the current phase. Standards and library behavior evolve; verify current guidance before production deployment. Prefer standards, official project documentation, and maintained security guidance over unreviewed snippets.

## Web platform
- MDN HTTP: https://developer.mozilla.org/en-US/docs/Web/HTTP
- MDN Cookies: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
- MDN CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
- MDN Set-Cookie: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
- MDN SameSite cookies: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
- MDN Content Security Policy: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP

## Security guidance
- OWASP Authentication Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
- OWASP Session Management Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
- OWASP Password Storage Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
- OWASP CSRF Prevention Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
- OWASP Cross Site Scripting Prevention Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
- OWASP JSON Web Token Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html
- OWASP REST Security Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html
- OWASP Application Security Verification Standard (ASVS): https://owasp.org/www-project-application-security-verification-standard/
- OWASP API Security Project: https://owasp.org/www-project-api-security/
- NIST Digital Identity Guidelines: https://pages.nist.gov/800-63-4/

## Protocols and browser identity
- JWT — RFC 7519: https://www.rfc-editor.org/rfc/rfc7519
- OAuth 2.0 Security Best Current Practice — RFC 9700: https://www.rfc-editor.org/rfc/rfc9700
- OAuth 2.0 Authorization Framework — RFC 6749: https://www.rfc-editor.org/rfc/rfc6749
- PKCE — RFC 7636: https://www.rfc-editor.org/rfc/rfc7636
- OpenID Connect specifications: https://openid.net/developers/specs/
- Web Authentication (WebAuthn) specification: https://www.w3.org/TR/webauthn-3/
- WebAuthn guide: https://webauthn.guide/

## Implementation documentation
- Node.js: https://nodejs.org/docs/latest/api/
- Express: https://expressjs.com/
- express-session: https://github.com/expressjs/session
- Helmet: https://helmetjs.github.io/
- express-rate-limit: https://express-rate-limit.mintlify.app/overview
- Mongoose: https://mongoosejs.com/docs/
- Argon2 package: https://www.npmjs.com/package/argon2
- Zod: https://zod.dev/
- React: https://react.dev/

## How to evaluate a source

Before adopting a code example, ask:
1. Is it official or maintained?
2. Which library/runtime version does it target?
3. Does it explain assumptions and failure modes?
4. Does it cover expiry, revocation, and authorization?
5. Does it test denied requests and replay?
6. Is the example intended for production or only for learning?
7. Is there newer standard guidance that supersedes it?

A blog post or video can help explain a concept, but use the relevant standard and maintained implementation documentation to verify security-sensitive details.
