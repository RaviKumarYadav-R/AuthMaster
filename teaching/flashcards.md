# Authentication Flashcards

**Q: Authentication vs authorization?**  
A: Authentication verifies a claimed identity; authorization decides what that principal may do.

**Q: Is a signed JWT encrypted?**  
A: Usually no. Its header and payload are Base64URL encoded and readable; the signature protects integrity when properly verified.

**Q: What does HttpOnly do?**  
A: It prevents JavaScript from reading the cookie; it does not stop XSS from issuing authenticated requests.

**Q: Does CORS authenticate a user?**  
A: No. CORS governs browser access to cross-origin responses.

**Q: Why rotate a session ID after login?**  
A: To reduce session-fixation risk.

**Q: Why hash passwords?**  
A: To make a stolen credential database less useful for recovering original passwords.

**Q: What is OAuth 2.0 for?**  
A: Delegated authorization; OIDC adds an identity layer.

**Q: Can a frontend route guard secure an API?**  
A: No. Authorization must be enforced on the server.

**Q: What is refresh-token rotation?**  
A: Replacing a refresh credential when used and invalidating the old one, with a policy for detecting reuse.
