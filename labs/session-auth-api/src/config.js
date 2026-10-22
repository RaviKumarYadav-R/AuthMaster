require('dotenv').config();

const nodeEnv = process.env.NODE_ENV || 'development';
const sessionSecret = process.env.SESSION_SECRET || '';
const port = Number(process.env.PORT || 3000);

if (Buffer.byteLength(sessionSecret, 'utf8') < 32 || /replace|change-me|generate/i.test(sessionSecret)) {
  throw new Error(
    'SESSION_SECRET must be at least 32 bytes of random data. Generate one with: node -e "console.log(require(\'crypto\').randomBytes(48).toString(\'hex\'))"'
  );
}

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535');
}

if (!['development', 'test', 'production'].includes(nodeEnv)) {
  throw new Error('NODE_ENV must be development, test, or production');
}

module.exports = {
  nodeEnv,
  port,
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/authmaster',
  sessionSecret,
};
