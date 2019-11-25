import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import verifyEmail from '../../controllers/auth/get-verify-email';
import verifyEmailToken from '../../controllers/auth/get-verify-email-token';

const AuthRouter = new Router();

AuthRouter.post('/register', (req, res, next) => {
  passport.authenticate('signup', { session: false }, (err, user, info) => {
    console.log('Register: ', {err, user, info});

    if (err || !user) {
      return res.status(400).send(err && err.message);
    }

    req.login(user, {session: false}, (error) => {
      if (error) {
        return res.status(500).send(err && err.message);
      }

      const token = jwt.sign(user.email, 'secret');

      return res.json({ user, token });
    });
  })(req, res, next);
});

AuthRouter.post('/login', (req, res) => {
  passport.authenticate('login', {session: false}, (err, user, info) => {

    if (err || !user) {
      return res.status(400).send(err && err.message);
    }

    req.login(user, { session: false }, (error) => {
      if (error) {
        return res.status(500).send(err && err.message);
      }

      const token = jwt.sign(user.email, 'secret');
      return res.json({ user, token });
    });
  })(req, res);
});

AuthRouter.get('/logout', (req, res, next) => {
  req.logout();
});

// AuthRouter.get('/account/verify', passport.authenticate('jwt'), verifyEmail);

// AuthRouter.get('/account/verify/:token', passport.authenticate('jwt'), verifyEmailToken);

export default AuthRouter;
