import express from 'express';
import dotenv from 'dotenv';

import applyMiddlewares from './middlewares';
import setupDatabase from './config/database';

import AuthenticationRouter from './routes/auth';
import UsersRouter from './routes/users';

dotenv.config();

const app = express();
applyMiddlewares(app);
setupDatabase();

app.use('/api/v1', AuthenticationRouter);
app.use('/api/v1/users', UsersRouter);

app.listen({ port: process.env.PORT || 8000 }, () => {
  console.log(`app listening on port ${process.env.PORT || 8000}!`);
});

export default app;
