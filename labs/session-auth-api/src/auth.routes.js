const express = require('express');
const argon2 = require('argon2');
const User = require('./models/User');
const { parseCredentials } = require('./validation');
const { nodeEnv } = require('./config');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const parsed = parseCredentials(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Invalid email or password format' });

    const { email, password } = parsed.data;
    const existing = await User.exists({ email });
    if (existing) return res.status(409).json({ error: 'Unable to register with those details' });

    const passwordHash = await argon2.hash(password, { type: argon2.argon2id });
    const user = await User.create({ email, passwordHash });
    return res.status(201).json({ user: { id: user.id, email: user.email } });
  } catch (error) {
    // The unique database index remains the final protection against registration races.
    if (error && error.code === 11000) {
      return res.status(409).json({ error: 'Unable to register with those details' });
    }
    return next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const parsed = parseCredentials(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Invalid email or password format' });

    const { email, password } = parsed.data;
    const user = await User.findOne({ email }).select('+passwordHash');
    if (!user || !(await argon2.verify(user.passwordHash, password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Rotate the identifier after authentication to reduce session-fixation risk.
    req.session.regenerate(error => {
      if (error) return next(error);
      req.session.userId = user.id;
      req.session.save(saveError => {
        if (saveError) return next(saveError);
        return res.json({ user: { id: user.id, email: user.email } });
      });
    });
  } catch (error) {
    return next(error);
  }
});

router.get('/me', async (req, res, next) => {
  try {
    if (!req.session.userId) return res.status(401).json({ error: 'Unauthenticated' });

    const user = await User.findById(req.session.userId).select('email');
    if (!user) {
      return req.session.destroy(() => {
        res.clearCookie('authmaster.sid', {
          httpOnly: true,
          secure: nodeEnv === 'production',
          sameSite: 'lax',
        });
        return res.status(401).json({ error: 'Unauthenticated' });
      });
    }

    return res.json({ user: { id: user.id, email: user.email } });
  } catch (error) {
    return next(error);
  }
});

router.post('/logout', (req, res, next) => {
  req.session.destroy(error => {
    if (error) return next(error);

    res.clearCookie('authmaster.sid', {
      httpOnly: true,
      secure: nodeEnv === 'production',
      sameSite: 'lax',
    });
    return res.status(204).end();
  });
});

module.exports = router;
