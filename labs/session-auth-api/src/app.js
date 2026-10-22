const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const { nodeEnv, sessionSecret } = require('./config');
const authRoutes = require('./auth.routes');

const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(express.json({ limit: '10kb' }));

// These in-memory limits are a teaching baseline only. Use a shared store for
// multi-instance production deployments and tune limits to the real threat model.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Try again later.' },
});
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many registration attempts. Try again later.' },
});

app.use(session({
  name: 'authmaster.sid',
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: nodeEnv === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 1000,
  },
}));

// Authentication responses should not be stored by shared or browser caches.
app.use('/auth', (_req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});
app.use('/auth/login', loginLimiter);
app.use('/auth/register', registerLimiter);
app.use('/auth', authRoutes);
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use((err, _req, res, _next) => {
  // Do not log request bodies, credentials, cookies, tokens, or raw error payloads.
  if (err && (err.type === 'entity.parse.failed' || err.status === 400)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }
  if (err && (err.type === 'entity.too.large' || err.status === 413)) {
    return res.status(413).json({ error: 'Request body too large' });
  }
  console.error('Request failed:', err && err.name ? err.name : 'UnknownError');
  return res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
