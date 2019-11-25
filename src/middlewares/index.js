import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import { LoginStrategy, SignupStrategy, JWTStrategy } from './auth';

const applyMiddlewares = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(morgan('dev'));

  app.use(passport.initialize());
  passport.use('login', LoginStrategy);
  passport.use('signup', SignupStrategy);
  passport.use('jwt', JWTStrategy);
};

export default applyMiddlewares;

