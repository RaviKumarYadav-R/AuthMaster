# 28 — Security Headers and Configuration

Security headers are defense-in-depth. They do not replace safe coding, authentication, authorization, or a threat model.

## Helmet and application headers
Helmet configures several HTTP security headers for Express. Review the headers it sets and adapt the policy to the application instead of assuming defaults fit every product. A Content Security Policy can reduce some XSS impact, but a weak policy or unsafe inline scripts can undermine it.

## Cache behavior
Authentication responses containing user-specific data should generally not be stored by shared caches. The lab sets Cache-Control: no-store on /auth routes. This is a useful baseline, but confirm cache behavior through the actual CDN, reverse proxy, and browser in a deployed architecture.

## Configuration validation
Validate required environment variables at startup. Fail fast for missing secrets, invalid ports, or unsupported environment values. Do not silently fall back to weak production defaults.

## Secret management
- Use unique secrets per environment.
- Generate secrets with a cryptographically secure random generator.
- Keep secrets out of Git, logs, client bundles, screenshots, and issue reports.
- Restrict who can read or rotate each secret.
- Document rotation and recovery.
- Rotate any credential that may have leaked.
- Do not use a single application secret for unrelated cryptographic purposes.

## Reverse proxies
When TLS terminates at a reverse proxy, the application must correctly understand whether the original request was HTTPS. Trust only known proxy infrastructure. Incorrect proxy trust can cause secure-cookie failures or spoofed client metadata.

## Deployment verification
Test the final deployed response headers and cookie attributes, not just local configuration. Include HTTPS redirect behavior, CORS, cache behavior, error responses, and proxy settings in release review.
