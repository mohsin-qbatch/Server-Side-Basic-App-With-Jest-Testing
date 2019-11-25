import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';

import Users from '../models/users';

const BCRYPT_SALT_ROUNDS = 12;

export const SignupStrategy = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: false
}, (req, email, password, done) => {
  const { name } = req.body;

  Users.findOne({
    email
  }).then((user) => {
    if (user) {
      done({ message: 'Email already used' });
    }

    Users.create({ email, password })
        .then((user) => {
          done(null, user)
        })
        .catch((err) => {
          done(err);
        });
  }).catch((err) => {
    done(err);
  });
});

export const LoginStrategy = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, (email, password, done) => {
  Users.findOne({
    email
  }).then((user) => {
    if (user === null) {
      return done({ message: 'Invalid Email !' }, false);
    }

    bcrypt.compare(password, user.password).then((response) => {
      if (response !== true) {
        return done({ message: 'Passwords do not match !' }, false);
      }
      return done(null, user);
    });
  }).catch((err) => {
    return done(err);
  });
});

export const JWTStrategy = new JWTstrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: 'secret'
}, (email, done) => {
  Users.findOne({ email })
      .then((user) => {
        if (user) {
          done(null, user);
        } else {
          done({ message: 'User not found !' }, false);
        }
      })
      .catch((err) => done(err));
});

