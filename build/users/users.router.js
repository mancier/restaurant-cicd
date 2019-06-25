"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const user_model_1 = require("./user.model");
const restify_errors_1 = require("restify-errors");
class UserRouter extends router_1.Router {
    constructor() {
        super();
        this.on('beforeRender', document => {
            document.password = undefined;
        });
    }
    applyRouter(application) {
        /**
         * Get => When u need to get some information of the database, is highly recommended to use GET.
         */
        application.get("/users", (req, res, next) => {
            user_model_1.User.find()
                .then(this.render(res, next))
                .catch(next);
        });
        application.get('/users/:id', (req, res, next) => {
            user_model_1.User.findById(req.params.id).then(this.render(res, next))
                .catch(next);
        });
        /**
         * Post => Recemended to create something ou to insert some data in database
         */
        application.post("/users", (req, res, next) => {
            let userDocument = new user_model_1.User(req.body);
            userDocument.save().then(this.render(res, next))
                .catch(next);
        });
        /**
         * Put => Used when u wants to change everything in the document
         */
        application.put("/users/:id", (req, res, next) => {
            const options = {
                overwrtite: true,
                runValidators: true
            };
            user_model_1.User.update({ "_id": req.params.id }, req.body, options).exec()
                .then((result) => {
                if (result.n) {
                    return user_model_1.User.findById(req.params.id);
                }
                else {
                    throw new restify_errors_1.NotFoundError("Document not found");
                }
            }).then(this.render(res, next))
                .catch(next);
        });
        /**
         * Path => Update only one thing
         */
        application.patch("/users/:id", (req, res, next) => {
            const options = {
                new: true,
                runValidators: true
            };
            user_model_1.User.findByIdAndUpdate(req.params.id, req.body, options).then(this.render(res, next))
                .catch(next);
        });
        application.del('/user/:id', (req, res, next) => {
            user_model_1.User.remove({ _id: req.params.id }).exec().then(cmdResult => {
                if (cmdResult.result.n) {
                    res.send(204);
                }
                else {
                    throw new restify_errors_1.NotFoundError("Document not found");
                }
                return next();
            })
                .catch(next);
            // User.findByIdAndRemove(req.params.id).then(response => {
            //     response ? resp.send(204) : resp.send(404)
            // })
        });
    } //End of applyRouter()
}
exports.userRouter = new UserRouter();
