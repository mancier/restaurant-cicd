import { ModelRouter } from "../common/model-router"
import * as restify from "restify"
import { User } from "./user.model"
import { NotFoundError } from "restify-errors";

class UserRouter extends ModelRouter<User> {

    constructor(){
        super(User)
        this.on('beforeRender', document => {
            document.password = undefined
        })
    }

    applyRouter(application: restify.Server){

        /**
         * Get => When u need to get some information of the database, is highly recommended to use GET.
         */
        application.get("/users", this.findAll)

        application.get('/users/:id', this.findById)

        /**
         * Post => Recemended to create something ou to insert some data in database
         */
        application.post("/users", this.save)

        /**
         * Put => Used when u wants to change everything in the document
         */
        application.put("/users/:id", this.replace)

        /**
         * Path => Update only one thing
         */
        application.patch("/users/:id", this.update)

        application.del('/user/:id', this.delete)

    } //End of applyRouter()
}

export const userRouter = new UserRouter()