import { ModelRouter } from "../common/model-router"
import * as restify from "restify"
import { User } from "./user.model"
import { authenticate } from "../security/oauth";

class UserRouter extends ModelRouter<User> {

    constructor(){
        super(User)
        this.on('beforeRender', document => {
            document.password = undefined
        })
    }

    findByEmail = (req, res, next) => {
        if (req.query.email) {
            User.findByEmail(req.query.email)
                .then(user => user ? [user] : [])
                .then(this.renderAll(res, next))
                .catch(next)
        } else {
            next()
        }
    }

    applyRouter(application: restify.Server){

        /**
         * Get => When u need to get some information of the database, is highly recommended to use GET.
         */
        application.get({path: "/users", version: "2.0.0"}, [this.findByEmail, this.findAll])

        //application.get({path: "/users", version: "1.0.0"}, [this.findAll])

        application.get('/users/:id', [this.validateId, this.findById])

        /**
         * Post => Recemended to create something ou to insert some data in database
         */
        application.post("/users", this.save)

        /**
         * Put => Used when u wants to change everything in the document
         */
        application.put("/users/:id", [this.validateId, this.replace])

        /**
         * Path => Update only one thing
         */
        application.patch("/users/:id", [this.validateId, this.update])

        /**
         * Del => Delete a register
         */
        application.del('/users/:id', [this.validateId, this.delete])

        /**
         * Auth => User auth 
         */
        application.post('/oauth', [ authenticate ])

    } //End of applyRouter()
}

export const userRouter = new UserRouter()