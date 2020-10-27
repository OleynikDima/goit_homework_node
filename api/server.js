const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL || '';
const authRouter = require('./auth/auth.router');

class UserService {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    this.initMiddleware();
    this.initRouter();
    await this.initDataBase();
    this.errorHandler();
    this.startListenig();
  }

  initServer() {
    this.server = express();
  }

  initMiddleware() {
    this.server.use(express.json());
    this.server.use(logger('dev'));
  }
  initRouter() {
    this.server.use('/api', usersRouter)
    this.server.use('/auth', authRouter);
  }
  async initDataBase() {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };

    try {
      await mongoose.connect(MONGODB_URL, options);
    } catch (err) {
      console.log(`Server was closed with connect to db`);
      process.exit(1);
    }

    console.log('DB CONNECTED SUCCESSFULLY!!!');
  }

  errorHandler() {
    this.server.use((err, req, res, next) => {
      if (err) {
        const code = err.status ? err.status : 400;
        res.status(code).send({ message: err.message });
      }
    });
  }

  startListenig() {
    this.server.listen(PORT, () =>
      console.log(`Server was startet, port:${PORT}`),
    );
  }
}

module.exports = UserService;
