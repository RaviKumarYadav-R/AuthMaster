# 30 — Threat Model Template

Use this template before adding a new authentication or account-management feature.

## 1. Scope
- Feature:
- Owner:
- Environments:
- In-scope routes/services:
- Out-of-scope components:

## 2. Assets
List credentials, sessions, tokens, personal data, authorization rules, recovery channels, and business actions that need protection.

## 3. Actors and assumptions
List legitimate users, administrators, unauthenticated attackers, compromised accounts, malicious insiders, third-party providers, and automated bots. State what you assume about browser security, TLS, infrastructure, and provider behavior.

## 4. Trust boundaries
Draw the browser/client, API, database, session/token store, identity provider, email service, reverse proxy, and logging/monitoring systems. Mark where untrusted data crosses each boundary.

## 5. Data flow
For each request, document inputs, authentication, authorization, state changes, outputs, and logging. Identify which component is authoritative for each decision.

## 6. Threat scenarios
For each threat, write:
- **Threat:** what can go wrong?
- **Precondition:** what must the attacker control?
- **Impact:** what data or action is affected?
- **Existing controls:** what already helps?
- **Gap:** what is missing?
- **Mitigation:** what will change?
- **Evidence:** which test or review proves it?
- **Residual risk:** what remains?
- **Owner and due date:**

Consider credential stuffing, session theft/fixation, CSRF, XSS, token replay, weak recovery, account enumeration, broken object-level authorization, privilege escalation, secret leakage, race conditions, and dependency compromise.

## 7. Abuse and failure cases
What happens when the database, session store, email provider, identity provider, rate-limit store, or key service is unavailable? Does the system fail closed for authorization decisions? Can a retry redeem a one-time token twice?

## 8. Verification plan
List unit, integration, browser, operational, and manual-review evidence. Include negative tests and confirm that denied requests do not mutate state.

## 9. Decision and review
Record accepted risks, approver, review date, monitoring plan, and conditions that require the threat model to be revisited.

## How to complete the threat model

### 1. Scope
Record system purpose, included and excluded flows, deployment assumptions, client types, assets, and security objectives.

### 2. Draw data flows
Include browser/mobile client, edge proxy, API, database, session/token store, email provider, identity provider, secrets store, logs, and administrators. Mark trust boundaries and label sensitive data crossing them.

### 3. Enumerate threats
Consider spoofing, tampering, repudiation, information disclosure, denial of service, and elevation of privilege. Add identity-specific cases such as credential stuffing, session replay, recovery takeover, refresh-token race, cross-tenant access, key compromise, and account linking.

### 4. Rank and mitigate
Record likelihood, impact, existing controls, proposed mitigation, owner, due date, and residual risk. Explain assumptions instead of using false precision.

### 5. Verify and revisit
Link each important threat to tests or operational controls. Revisit after new authentication methods, new client origins, multi-tenant features, provider changes, deployment changes, or major incidents.

