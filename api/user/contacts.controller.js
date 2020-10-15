const Joi = require('joi');
const users = require('../../db/contacts.json');
const {listContacts, getContactById, addContact,removeContact,updateContact} = require('../../contacts');

class UserController {

    async getUsers(req,res,next){
            return  res.status(200).send(await listContacts());
    };

    async createUser(req,res,next){
            try {
            const newUser = {
                id: users.length + 1,
                ...req.body};
                await addContact(newUser)
                return res.status(201).send({ "message": "Contact created" })
            } catch (err) {
                next(err)
            }
    };

    async getUserId(req,res,next){
        const targetUsersIndex = Number(req.params.contactId);
        const result = await getContactById(targetUsersIndex)
        if(result === undefined){
            return res.status(404).send({message:"Not found"})
        }
        res.status(200).send(result)
    };

     async removeUserId(req,res,next){
        const id = Number(req.params.contactId)
            const targetUsersId = UserController.findUserIndexById(res,id);
                if(targetUsersId == undefined){
                    return;
                }
            await removeContact(id);
            return  res.status(200).send({message: "contact deleted"}) 
    }

   async updateUser(req,res,next){
        try {
            const id = UserController.findUserIndexById(res, req.params.contactId)
            users[id] = {
                ...users[id],
                ...req.body
            }
            await updateContact(users)
            res.status(200).send({ "message": "contact updated" }) 
        } catch (err) {
            next(err)
        }
    };

    validateUpdateUser(res, req, next){
        const updateUserRules = Joi.object({
                name: Joi.string(),
                email: Joi.string(),
                phone: Joi.string()
            });
        UserController.checkValidationError(updateUserRules, req, res, next);
    };

    validateCreateUser(req, res, next) {
        const updateSchemaValidator = Joi.object({
            name: Joi.string(),
            email: Joi.string(),
            phone: Joi.string()
        })
        UserController.checkValidationError(updateSchemaValidator, req, res, next)
    };

    static checkValidationError(schema, req, res, next) {
        const { error } = schema.validate(req.body);
        if (error) {
            const { message } = error.details[0];
            return res.status(400).send({ message:"missing fields"});
        }
        next();
    };

    static findUserIndexById(res, userId) {
        const id = Number(userId);
        const targetUsersIndex = users.findIndex(user => user.id === id);
        console.log(targetUsersIndex);
        if (targetUsersIndex === -1) {
            res.status(404).send({ message: 'Not found' });
            return;
        }else {
            return targetUsersIndex;
        }
    }
}

module.exports =  new UserController();