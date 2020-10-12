const express = require('express');
const cors = require('cors');
const logger = require('morgan');


require('dotenv').config();

const PORT = process.env.PORT;
const usersRouter = require('./user/user.router')

class UserService {
    constructor(){
        this.server = null;
    };

    start(){
        this.initServer();
        this.initMiddleware();
        this.initRouter();
        this.errorHandler();
        this.startListenig();
    };

    initServer(){
        this.server = express();
    };

    initMiddleware(){
        this.server.use(express.json());
        this.server.use(cors({ origin:'http://localhost:3000'}));
        this.server.use(logger('dev'));
    };
    initRouter(){
        this.server.use('/api', usersRouter)
    };

    errorHandler(){
        this.server.use((err,req,res,next) => {
            if(err){
                const code = err.status ? err.status : 400;
                res.status(code).send({message: err.message});
            };

        });
    }

    startListenig(){
        this.server.listen(PORT, ()=> console.log(`Server was startet, port:${PORT}`))
    }
};


module.exports = UserService;