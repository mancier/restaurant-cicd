import { Router } from "../common/router"
import * as restify from "restify"
import { User } from "./user.model"
import { NotFoundError } from "restify-errors";

class UserRouter extends Router {

    constructor(){
        super()
        this.on('beforeRender', document => {
            document.password = undefined
        })
    }

    applyRouter(application: restify.Server){

        /**
         * Get => When u need to get some information of the database, is highly recommended to use GET.
         */
        application.get("/users", (req, res, next) => {
            User.find()
            .then(this.render(res, next))
            .catch(next)
        })

        application.get('/users/:id', (req, res, next) => {
            User.findById(req.params.id).then(this.render(res, next))
            .catch(next)
        })

        /**
         * Post => Recemended to create something ou to insert some data in database
         */
        application.post("/users", (req, res, next) => {
            let userDocument = new User(req.body)
            userDocument.save().then(this.render(res, next))
            .catch(next)
        })

        /**
         * Put => Used when u wants to change everything in the document
         */
        application.put("/users/:id", (req, res, next) => {
            const options = {
                overwrtite: true
            }
            User.update({"_id": req.params.id}, req.body, options).exec()
            .then((result):any => {
                if(result.n){
                    return User.findById(req.params.id)
                } else {
                    throw new NotFoundError("Document not found")
                }
            }).then(this.render(res, next))
            .catch(next)
        })

        /**
         * Path => Update only one thing
         */
        application.patch("/users/:id", (req, res, next) => {
            User.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(this.render(res, next))
            .catch(next)
        })

        application.del('/user/:id', (req, res, next) => {
            User.remove({_id: req.params.id}).exec().then(cmdResult =>  {
                if(cmdResult.result.n){
                    res.send(204)
                } else {
                    throw new NotFoundError("Document not found")
                }
                return next()
            })
            .catch(next)
            // User.findByIdAndRemove(req.params.id).then(response => {
            //     response ? resp.send(204) : resp.send(404)
            // })
        })

    } //End of applyRouter()
}

export const userRouter = new UserRouter()