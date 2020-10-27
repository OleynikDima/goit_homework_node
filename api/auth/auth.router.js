const express = require('express');
const authRouter = express.Router();
const {
  getUser,
  createUser,
  validateUser,
  loginIn,
  authorize,
  logOut,
} = require('./auth.controller');

authRouter.post('/register', validateUser, createUser);
authRouter.post('/login', validateUser, loginIn);
authRouter.post('/logout', authorize, logOut);
authRouter.get('/users/current', authorize, getUser);
module.exports = authRouter;
