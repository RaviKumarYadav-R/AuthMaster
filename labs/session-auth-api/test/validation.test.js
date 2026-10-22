const test = require('node:test');
const assert = require('node:assert/strict');
const { parseCredentials } = require('../src/validation');

test('normalizes email and accepts a sufficiently long password', () => {
  const result = parseCredentials({ email: '  RAVI@example.com ', password: 'a-very-long-demo-password' });
  assert.equal(result.success, true);
  assert.equal(result.data.email, 'ravi@example.com');
});

test('rejects malformed email', () => {
  assert.equal(parseCredentials({ email: 'not-an-email', password: 'a-very-long-demo-password' }).success, false);
});

test('rejects a short password', () => {
  assert.equal(parseCredentials({ email: 'ravi@example.com', password: 'short' }).success, false);
});

test('rejects a password longer than the configured maximum', () => {
  assert.equal(parseCredentials({ email: 'ravi@example.com', password: 'x'.repeat(129) }).success, false);
});

test('rejects missing or non-object input', () => {
  assert.equal(parseCredentials(undefined).success, false);
  assert.equal(parseCredentials(null).success, false);
  assert.equal(parseCredentials('email=ravi@example.com').success, false);
});

test('rejects unexpected fields such as a client-supplied role', () => {
  const result = parseCredentials({
    email: 'ravi@example.com',
    password: 'a-very-long-demo-password',
    role: 'admin',
  });
  assert.equal(result.success, false);
});
