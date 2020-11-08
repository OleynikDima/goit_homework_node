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
  updateUser,
  verificationUrlToken,
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

authRouter.patch(
  '/user/avatar',
  authorize,
  upload.single('avatar'),
  minifyImage,
  updateUser,
);

authRouter.get('/verify/:verificationToken', verificationUrlToken);
module.exports = authRouter;
