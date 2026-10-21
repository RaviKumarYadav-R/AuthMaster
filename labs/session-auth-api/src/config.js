require('dotenv').config();

for (const name of ['SESSION_SECRET']) {
  if (!process.env[name]) throw new Error(`Missing required environment variable: ${name}`);
}

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 3000),
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/authmaster',
  sessionSecret: process.env.SESSION_SECRET,
};
