# 27 — Common Authentication Failure Patterns

Use these examples in code reviews and teaching sessions. Each applicable item should become a regression test.

## Identity and login
- **Trusting the frontend:** hiding a button is not server-side authorization.
- **Account enumeration:** response differences or timing may reveal whether an account exists.
- **No rate limit:** attackers can automate guessing or credential stuffing.
- **Password truncation:** silently shortening input causes surprising failures.
- **Plaintext password storage:** database compromise exposes passwords immediately.

## Sessions
- **No session rotation:** authentication can inherit an identifier an attacker knows.
- **Cookie-only logout:** clearing a browser cookie while keeping server-side state does not revoke a copied identifier.
- **MemoryStore in production:** sessions disappear across restarts/instances and memory may grow.
- **Overbroad cookie domain:** more hosts receive the credential.
- **Missing CSRF model:** browser cookies may be sent automatically on cross-site requests.

## Tokens
- **Decode instead of verify:** attacker-controlled claims are trusted.
- **Wrong audience:** a token for another service is accepted.
- **Overlong lifetime:** stolen credentials remain useful longer.
- **No refresh rotation:** copied refresh tokens may be reused without detection.
- **No key-rotation plan:** a leaked signing key can undermine trust until verifiers stop accepting it.

## Authorization and recovery
- **IDOR/BOLA:** a user changes a resource ID and accesses another user's data.
- **Role from request body:** client input grants privileges.
- **Reusable reset link:** a stolen token remains useful after intended use.
- **Weak account linking:** identities are linked using mutable/unverified email alone.
- **Unrevoked sessions after compromise:** an attacker retains access after a password reset or account disablement.

## Operations
- **Secret in logs:** observability becomes a credential-exfiltration path.
- **Unreviewed dependency:** vulnerable authentication code ships unnoticed.
- **No incident playbook:** responders improvise during an incident.
- **Checklist without evidence:** a checked box is not proof that a control works.

## Review exercise
Choose five patterns, explain an attack scenario, identify the trust boundary, propose a mitigation, and write a regression test.

## Deep dive: diagnose the violated invariant

### Common failures
Plaintext password storage; logging credentials; trusting a decoded JWT; skipping session rotation; clearing a cookie without server-side invalidation; using in-memory stores in multi-instance production; treating CORS as authorization; trusting client-supplied role/owner/tenant IDs; reusable reset tokens; stack-trace leakage; happy-path-only testing; UI-only route guards; and external account linking based only on email.

### Root-cause method
For each failure, identify the violated invariant, misunderstood trust boundary, missing test, and operational signal that could detect recurrence. Fix the underlying design rather than only the observed symptom.

### Exercise
Choose five failures. For each, write a bad-versus-corrected example, a negative test, and a short code-review explanation. Use synthetic data and keep deliberately vulnerable examples isolated from public deployment.

