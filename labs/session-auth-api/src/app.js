const express = require('express');
const session = require('express-session');
const { nodeEnv, sessionSecret } = require('./config');
const authRoutes = require('./auth.routes');

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '10kb' }));
app.use(session({
  name: 'authmaster.sid',
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: nodeEnv === 'production', sameSite: 'lax', maxAge: 60 * 60 * 1000 },
}));
app.use('/auth', authRoutes);
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use((err, _req, res, _next) => {
  // Never log request credentials or session identifiers.
  console.error('Request failed:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
