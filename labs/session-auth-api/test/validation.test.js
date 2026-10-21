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
