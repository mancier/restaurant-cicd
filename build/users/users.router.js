"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const user_model_1 = require("./user.model");
class UserRouter extends model_router_1.ModelRouter {
    constructor() {
        super(user_model_1.User);
        this.findByEmail = (req, res, next) => {
            if (req.query.email) {
                user_model_1.User.findByEmail(req.query.email)
                    .then(user => user ? [user] : [])
                    .then(this.renderAll(res, next))
                    .catch(next);
            }
            else {
                next();
            }
        };
        this.on('beforeRender', document => {
            document.password = undefined;
        });
    }
    applyRouter(application) {
        /**
         * Get => When u need to get some information of the database, is highly recommended to use GET.
         */
        application.get({ path: "/users", version: "2.0.0" }, [this.findByEmail, this.findAll]);
        //application.get({path: "/users", version: "1.0.0"}, [this.findAll])
        application.get('/users/:id', [this.validateId, this.findById]);
        /**
         * Post => Recemended to create something ou to insert some data in database
         */
        application.post("/users", this.save);
        /**
         * Put => Used when u wants to change everything in the document
         */
        application.put("/users/:id", [this.validateId, this.replace]);
        /**
         * Path => Update only one thing
         */
        application.patch("/users/:id", [this.validateId, this.update]);
        application.del('/users/:id', [this.validateId, this.delete]);
    } //End of applyRouter()
}
exports.userRouter = new UserRouter();
