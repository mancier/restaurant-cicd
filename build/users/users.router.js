"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const user_model_1 = require("./user.model");
class UserRouter extends model_router_1.ModelRouter {
    constructor() {
        super(user_model_1.User);
        this.on('beforeRender', document => {
            document.password = undefined;
        });
    }
    applyRouter(application) {
        /**
         * Get => When u need to get some information of the database, is highly recommended to use GET.
         */
        application.get("/users", this.findAll);
        application.get('/users/:id', this.findById);
        /**
         * Post => Recemended to create something ou to insert some data in database
         */
        application.post("/users", this.insert);
        /**
         * Put => Used when u wants to change everything in the document
         */
        application.put("/users/:id", this.update);
        /**
         * Path => Update only one thing
         */
        application.patch("/users/:id", this.partialUpdate);
        application.del('/user/:id', this.remove);
    } //End of applyRouter()
}
exports.userRouter = new UserRouter();
