# HTTP Examples for the Session Lab

Use a local development instance and a REST client that preserves cookies. Never test with real user credentials.

## Register
~~~http
POST http://localhost:3000/auth/register
Content-Type: application/json

{
  "email": "learner@example.com",
  "password": "a-long-unique-demo-password"
}
~~~

## Login
~~~http
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "learner@example.com",
  "password": "a-long-unique-demo-password"
}
~~~

Keep the Set-Cookie value inside the local test client; do not paste it into an issue or commit it.

## Current user
~~~http
GET http://localhost:3000/auth/me
~~~
Expected: safe user profile with the current session, or 401 without a valid session.

## Logout
~~~http
POST http://localhost:3000/auth/logout
~~~
After logout, repeat the current-user request and confirm it returns 401. For a stronger test, replay the old cookie in an isolated test client and confirm server-side invalidation.

## Health check
~~~http
GET http://localhost:3000/health
~~~
