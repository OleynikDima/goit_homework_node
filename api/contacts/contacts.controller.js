const userModel = require('./contacts.model');
const { ObjectID } = require('mongodb');

class UserController {
  async getUsers(req, res, next) {
    try {
      const users = await userModel.find();
      return res.status(201).json(users);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      const newContact = await userModel.create(req.body);
      return res.status(201).send(newContact);
    } catch (err) {
      next(err);
    }
  }

  async getUserId(req, res, next) {
    try {
      const targetUsersID = req.params.contactId;
      const result = await userModel.findById(targetUsersID);
      if (!result) {
        res.status(400).send({ message: 'Not found' });
      }
      return res.status(200).json(result);
    } catch (error) {}
  }

  async removeUserId(req, res, next) {
    try {
      const id = req.params.contactId;
      const deleteContactByID = await userModel.findByIdAndDelete(id, req.body);

      if (!deleteContactByID) {
        res.status(400).send({ message: 'Not found' });
      }
      return res.status(200).send({ message: 'contact deleted' });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const id = req.params.contactId;

      const updateContact = await userModel.findByIdAndUpdate(id, req.body);

      if (!updateContact) {
        res.status(400).send({ message: 'Not found' });
      }
      res.status(200).send({ message: 'contact updated' });
    } catch (err) {
      next(err);
    }
  }

  validateUpdateUserId(req, res, next) {
    const { contactId } = req.params;
    if (!ObjectID.isValid(contactId)) {
      return res.status(404).send();
    }
    next();
  }
}

module.exports = new UserController();
