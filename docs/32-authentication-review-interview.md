# 32 — Authentication Review and Interview Questions

Answer aloud first, then verify against the chapters. Strong answers describe the mechanism, assumptions, failure modes, and trade-offs rather than repeating a definition.

## Foundations
1. What is the difference between authentication and authorization?
2. Why is an email address not proof of identity?
3. What makes a credential a bearer credential?
4. Why must each protected request be authenticated?
5. What is a trust boundary?

## Passwords and sessions
6. Why use Argon2id instead of a fast general-purpose hash?
7. What is a salt, and is it secret?
8. What is session fixation, and how does session rotation help?
9. Why is Express MemoryStore unsuitable for production?
10. What must logout do beyond clearing the browser cookie?
11. What is the difference between idle timeout and absolute lifetime?

## Browser security
12. What does HttpOnly protect against, and what does it not protect against?
13. How are CSRF and XSS different?
14. Why is CORS not an authorization system?
15. What changes when frontend and API are cross-site?
16. Why can a browser send a request even when JavaScript cannot read its response?

## Tokens and protocols
17. Why is a signed JWT not necessarily confidential?
18. Why must a verifier check audience and issuer?
19. What is the difference between an ID token and an access token?
20. What does refresh-token rotation accomplish?
21. What can go wrong if two refresh requests race?
22. How do state, nonce, and PKCE differ?
23. Why is OAuth 2.0 not itself a complete login implementation?

## Authorization and operations
24. How do you prevent IDOR/BOLA?
25. Why is a frontend route guard not security?
26. How should a password reset affect existing sessions?
27. What should happen when a user is disabled?
28. What belongs in an authentication incident response plan?
29. How do you test that a denied request did not mutate state?
30. When is a managed identity provider a better choice than custom auth?

## Scoring rubric
For each answer, score 0–2:
- **0:** incorrect or vague
- **1:** mostly correct but misses assumptions or risks
- **2:** explains flow, security property, limitation, and test

Repeat questions scored 0 or 1 after one day, three days, and one week.

## Deep review and interview method

For every question, answer in this order: define the concept, draw the flow, state the threat model, explain implementation, discuss failure cases, compare alternatives, and describe how you would test it. This demonstrates engineering reasoning rather than memorized vocabulary.

### Core questions
- Why is password hashing different from encryption?
- Why regenerate a session ID after login?
- Why is clearing a cookie alone insufficient for logout?
- What does a JWT signature prove, and what does it not prove?
- Why validate issuer and audience?
- How do CSRF and CORS differ?
- How can a valid session still be denied a resource?
- How do refresh rotation and replay detection behave under concurrency?
- What are state, nonce, and PKCE for in OIDC?
- What should be revoked after account compromise?

### Practice format
Answer each question in 60 seconds, then expand to five minutes with a diagram and example. Mark answers as confident and test-backed, understood but untested, or needs review. Turn every weak answer into a code exercise or negative test.

