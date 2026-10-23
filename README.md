# AuthMaster — Learn Authentication by Understanding It

A beginner-friendly, hands-on curriculum for web authentication, sessions, tokens, authorization, browser security, and modern identity protocols.

> **Learning rule:** understand the security property first, draw the request flow second, implement a small version third, and test failure cases before moving on.

## Start here
1. Read [START-HERE.md](START-HERE.md).
2. Follow the ordered [COURSE-MAP.md](COURSE-MAP.md).
3. Complete the exercises and mastery gate in every chapter.
4. Build progressively using [the capstone plan](projects/CAPSTONE.md).
5. Track your progress in [the mastery checklist](teaching/MASTERY-CHECKLIST.md).

## The 20-chapter curriculum

| Phase | Chapters | Outcome |
|---|---|---|
| Foundations | 01–04 | Identity, HTTP, browser boundaries, data modeling |
| Credentials and login | 05–07 | Password storage, registration, verification, login |
| Sessions and tokens | 08–10 | Server sessions, JWT/access tokens, refresh/revocation |
| Access and recovery | 11–13 | Authorization, account recovery, MFA/passkeys |
| Federated identity | 14–15 | OAuth 2.0, OpenID Connect, PKCE |
| Application engineering | 16–20 | React state, testing, threat modeling, operations, capstone |

## Repository map
- `chapters/` — ordered lessons, flows, exercises, and mastery gates.
- `teaching/` — lesson template and progress tracking.
- `projects/` — progressive capstone requirements.
- `resources/` — reference guidance.

## How to study
1. Define each term in your own words.
2. Draw the browser → API → trusted verifier/database flow.
3. Trace one success path and one rejection path.
4. Build the narrow lesson exercise.
5. Test malformed, expired, replayed, and unauthorized inputs where relevant.
6. Teach the flow back without reading your notes.

## Security note
This repository is educational material, not a claim that a sample application is production-ready. Prefer actively maintained libraries and framework-supported mechanisms for password hashing, cryptography, session management, validation, and OAuth/OIDC. Never commit passwords, real tokens, private keys, or personal data. Use local development accounts and synthetic data.

## Rebuild status
The new learning structure is being assembled on the `rebuild-authmaster` branch. The existing `main` branch is being kept unchanged while the rebuild is reviewed.
