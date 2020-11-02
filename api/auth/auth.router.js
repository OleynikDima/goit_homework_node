const express = require('express');
const authRouter = express.Router();
const upload = require('../storage');

const {
  getUser,
  createUser,
  validateUser,
  loginIn,
  authorize,
  logOut,
  createAvatarURL,
  minifyImage,
} = require('./auth.controller');

authRouter.post(
  '/register',
  validateUser,
  upload.single('avatar'),
  createAvatarURL,
  minifyImage,
  createUser,
);
authRouter.post('/login', validateUser, loginIn);
authRouter.post('/logout', authorize, logOut);
authRouter.get('/users/current', authorize, getUser);

module.exports = authRouter;
