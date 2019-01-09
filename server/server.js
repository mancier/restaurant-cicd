"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const enviroment_1 = require("../common/enviroment");
const mongoose = require("mongoose");
const merge_path_parser_1 = require("./merge-path.parser");
const error_handle_1 = require("./error.handle");
class Server {
    initializeDb() {
        mongoose.Promise = global.Promise;
        return mongoose.connect(enviroment_1.enviroment.server.db.url, {
            user: enviroment_1.enviroment.server.db.user,
            pass: enviroment_1.enviroment.server.db.password,
            authdb: enviroment_1.enviroment.server.db.authDb
        });
    }
    initRoute(routers) {
        return new Promise((resolve, rejects) => {
            try {
                this.application = restify.createServer({
                    name: "meat-api",
                    version: "1.0.0"
                });
                //Plugins
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());
                this.application.use(merge_path_parser_1.mergePatchBodyParser); //using the convertion of Content-Type
                this.application.use(restify.plugins.fullResponse());
                //starting routes
                for (let router of routers) {
                    router.applyRouter(this.application);
                }
                this.application.on('restifyError', error_handle_1.handleError);
                //Starting server
                this.application.listen(enviroment_1.enviroment.server.port, () => {
                    resolve(this.application);
                });
                //this.application.on("error", (err))
            }
            catch (error) {
                rejects(error);
            }
        });
    }
    bootstrap(routers = []) {
        return this.initializeDb()
            .then(() => this.initRoute(routers).then(() => this));
    }
}
exports.Server = Server;
