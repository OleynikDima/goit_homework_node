const authModel = require('./auth.model');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { promises: fsPromises } = require('fs');
const path = require('path');

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const { generateFromString } = require('generate-avatar');

require('dotenv').config();

class AuthController {
  async getUser(req, res, next) {
    try {
      const user = req.user;

      return res.status(200).send({
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const createNewUser = await authModel.findOne({ email });
      if (createNewUser) {
        return res.status(409).send({ message: 'Email in use' });
      }

      const hashPassword = await bcrypt.hash(password, 5);

      const user = await authModel.create({
        email,
        avatarURL: 'http://localhost:3000/images/' + req.file.filename,
        password: hashPassword,
      });

      console.log();
      return res.status(201).send({
        user: {
          email: user.email,
          subscription: user.subscription,
          avatarURL: user.avatarURL,
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async loginIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await authModel.find({ email });

      if (!user[0]) {
        return res.status(401).send({ message: ' Email or password is wrong' });
      }

      const isPasswordValid = await bcrypt.compare(password, user[0].password);

      if (!isPasswordValid) {
        return res.status(404).send({ message: 'Authorization faild' });
      }

      const token = await jwt.sign(
        {
          id: user[0].id,
          email: user[0].email,
        },
        process.env.SECRET_TOKEN,
        {
          expiresIn: '1h',
        },
      );

      const updateUser = await authModel.findByIdAndUpdate(
        user[0].id,
        { token },
        { new: true },
      );

      return res
        .status(201)
        .send(AuthController.validateUserRespons([updateUser]));
    } catch (error) {
      next(error);
    }
  }

  async logOut(req, res, next) {
    try {
      await authModel.findByIdAndUpdate(
        req.user._id,
        {
          token: null,
        },
        { new: true },
      );

      return res.status(204).send({ message: 'No Content' });
    } catch (error) {
      next(error);
    }
  }

  validateUser(req, res, next) {
    console.log('Valid');
    const result = Joi.object({
      name: Joi.string(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const { error } = result.validate(req.body);
    if (error) {
      return res.status(422).send({ message: error.details[0].message });
    }

    next();
  }

  static validateUserRespons(users) {
    return users.map(user => {
      return {
        token: user.token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      };
    });
  }

  async authorize(req, res, next) {
    try {
      const authHeader = req.get('Authorization');

      let token;
      if (!authHeader) {
        return res
          .status(401, 'Unauthorized')
          .send({ message: 'Not authorized' });
      } else {
        token = authHeader.split(' ')[1];
      }

      let userId;

      try {
        userId = await jwt.verify(token, process.env.SECRET_TOKEN).id;
      } catch (error) {
        return res
          .status(401, 'Unauthorized')
          .send({ message: 'Not authorized' });
      }

      const user = await authModel.findById(userId);
      if (!user) {
        return res.status(401).send({ message: 'Not authorized User' });
      }

      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      next(error);
    }
  }

  async createAvatarURL(req, res, next) {
    if (req.file) {
      return next();
    }
    try {
      const randomAtribut = (Math.random() * (100 - 10) + 100).toString();
      const pathFolderTmp = 'tmp';
      const dataAvatar = await generateFromString(randomAtribut);
      const filename = `avatar-${Date.now()}.svg`;
      await fsPromises.writeFile(pathFolderTmp + '/' + filename, dataAvatar);

      req.file = {
        destination: pathFolderTmp,
        filename,
        path: path.join(pathFolderTmp + '/' + filename),
      };
      next();
    } catch (error) {
      console.log(error);
    }
  }

  async minifyImage(req, res, next) {
    console.log('Mini');
    try {
      console.log('Start processing file...');
      const MINIFIED_DIR = 'public/images';
      await imagemin([req.file.destination], {
        destination: MINIFIED_DIR,
        plugins: [
          imageminJpegtran(),
          imageminPngquant({
            quality: [0.6, 0.8],
          }),
        ],
      });

      const { filename, path: draftPath } = req.file;

      await fsPromises.unlink(draftPath);

      req.file = {
        ...req.file,
        path: path.join(MINIFIED_DIR, filename),
        destination: MINIFIED_DIR,
      };

      next();
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new AuthController();
