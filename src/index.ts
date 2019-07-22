import { Server } from "./server/server"
import { userRouter } from "./users/users.router"
import { restaurantsRouter } from "./restaurant/restaurant.router"
import {reviewsRouter} from "./reviews/reviews.router";

const server = new Server()
server.bootstrap([userRouter, restaurantsRouter, reviewsRouter]).then(server => {
        console.log("Server Running on ", server.application.address());
    })
    .catch(error => {
        console.log("Server Failed")
        console.error(error)
        process.exit(1)
    })
