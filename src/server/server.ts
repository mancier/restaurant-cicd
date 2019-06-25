import * as restify from "restify"
import { enviroment } from "../common/enviroment"
import { Router } from "../common/router"
import * as mongoose from "mongoose"
import { mergePatchBodyParser } from "./merge-path.parser";
import { handleError } from "./error.handle";

export class Server {

    application: restify.Server

    initializeDb(){
        (<any>mongoose).Promise = global.Promise
        const urlSchema = enviroment.server.db.url + enviroment.server.db.schema
        console.log(`URL: ${urlSchema}`)
        return mongoose.connect(urlSchema, {
            user: enviroment.server.db.user,
            pass: enviroment.server.db.password,
            useNewUrlParser: true 
        } )
    }

    initRoute(routers: Router[]): Promise<any>{
        return new Promise((resolve, rejects) => {
            try {
                this.application = restify.createServer({
                    name: "meat-api",
                    version: "1.0.0"
                });

                //Plugins
                this.application.use(restify.plugins.queryParser())
                this.application.use(restify.plugins.bodyParser())
                this.application.use(mergePatchBodyParser) //using the convertion of Content-Type
                this.application.use(restify.plugins.fullResponse())

                //starting routes
                for(let router of routers){
                    router.applyRouter(this.application)
                }

                this.application.on('restifyError', handleError)
                
                //Starting server
                this.application.listen(enviroment.server.port, () => {
                    resolve(this.application)
                });
                
                //this.application.on("error", (err))

            } catch (error) {
                rejects(error)
            }
        })
    }

    bootstrap(routers: Router[] = []): Promise<Server>{
        return this.initializeDb()
            .then(() => this.initRoute(routers).then(() => this));
    }
}