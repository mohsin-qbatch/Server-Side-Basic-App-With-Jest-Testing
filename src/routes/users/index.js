import express from 'express';
import getUsersList from '../../controllers/users/get-users';

const Router = express.Router();

Router.post('/test', (req, res, next) => {
  console.log({ res, req});
  res.send('respond with a resource');
});

Router.get('/usersList', (req, res, next) => {
  getUsersList({ skip: 0, limit: 0, filter: {} }).then((response) => {
    res.send(response);
  });
});

export default Router;
