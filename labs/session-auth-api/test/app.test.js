const test = require('node:test');
const assert = require('node:assert/strict');

// Set configuration before importing the app; the test process never connects to MongoDB.
process.env.NODE_ENV = 'test';
process.env.SESSION_SECRET = 'a'.repeat(48);

const request = require('supertest');
const app = require('../src/app');

test('health endpoint returns a minimal status and Helmet headers', async () => {
  const response = await request(app).get('/health');

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { status: 'ok' });
  assert.equal(response.headers['x-powered-by'], undefined);
  assert.equal(response.headers['x-content-type-options'], 'nosniff');
});

test('authentication responses are marked no-store', async () => {
  const response = await request(app).get('/auth/me');

  assert.equal(response.status, 401);
  assert.equal(response.body.error, 'Unauthenticated');
  assert.match(response.headers['cache-control'], /no-store/);
});

test('registration rejects invalid input before database access', async () => {
  const response = await request(app)
    .post('/auth/register')
    .send({ email: 'not-an-email', password: 'short' });

  assert.equal(response.status, 400);
  assert.deepEqual(response.body, { error: 'Invalid email or password format' });
});

test('login rejects invalid input before database access', async () => {
  const response = await request(app)
    .post('/auth/login')
    .send({ email: 'not-an-email', password: 'short' });

  assert.equal(response.status, 400);
  assert.deepEqual(response.body, { error: 'Invalid email or password format' });
});

test('malformed JSON returns 400 instead of an internal server error', async () => {
  const response = await request(app)
    .post('/auth/login')
    .set('Content-Type', 'application/json')
    .send('{"email":');

  assert.equal(response.status, 400);
  assert.deepEqual(response.body, { error: 'Invalid request body' });
});

test('oversized JSON request returns 413', async () => {
  const response = await request(app)
    .post('/auth/login')
    .send({ email: 'learner@example.com', password: 'x'.repeat(12000) });

  assert.equal(response.status, 413);
  assert.deepEqual(response.body, { error: 'Request body too large' });
});
