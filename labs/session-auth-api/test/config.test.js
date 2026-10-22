const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const labDirectory = path.resolve(__dirname, '..');

function runConfig(overrides = {}) {
  const env = {
    ...process.env,
    NODE_ENV: 'test',
    PORT: '3000',
    MONGODB_URI: 'mongodb://127.0.0.1:27017/authmaster-test',
    SESSION_SECRET: 'a'.repeat(48),
    ...overrides,
  };

  return spawnSync(process.execPath, ['-e', "require('./src/config')"], {
    cwd: labDirectory,
    env,
    encoding: 'utf8',
  });
}

test('accepts valid environment configuration', () => {
  const result = runConfig();
  assert.equal(result.status, 0, result.stderr);
});

test('rejects a short session secret', () => {
  const result = runConfig({ SESSION_SECRET: 'too-short' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /SESSION_SECRET must be at least 32 bytes/);
});

test('rejects a placeholder session secret', () => {
  const result = runConfig({ SESSION_SECRET: 'REPLACE_WITH_RANDOM_OUTPUT_FROM_NODE_CRYPTO' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /SESSION_SECRET must be at least 32 bytes/);
});

test('rejects an invalid port', () => {
  const result = runConfig({ PORT: '70000' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /PORT must be an integer/);
});

test('rejects an unsupported runtime environment', () => {
  const result = runConfig({ NODE_ENV: 'staging-ish' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /NODE_ENV must be development, test, or production/);
});
