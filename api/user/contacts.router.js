const express = require('express');
const UserController = require('./contacts.controller');
const userRouter = express.Router();


//Update
userRouter.patch("/contacts/:contactId", UserController.validateUpdateUser, UserController.updateUser);
//Read Users
userRouter.get("/contacts",  UserController.getUsers)
//Create Users
userRouter.post("/contacts", UserController.validateCreateUser,UserController.createUser)
//GET contactId    
userRouter.get("/contacts/:contactId",UserController.getUserId)
//delete user 
userRouter.delete("/contacts/:contactId",UserController.removeUserId)


module.exports = userRouter;