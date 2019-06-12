import { Server } from "./server/server"
import { userRouter } from "./users/users.router"
import { debug } from "util";

console.log("On");

const server = new Server()
    server.bootstrap([userRouter]).then(server => {
        console.log("Server Running on ", server.application.address());
    })
    .catch(error => {
        console.log("Server Failed")
        console.error(error)
        process.exit(1)
    })
