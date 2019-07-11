"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const users_router_1 = require("./users/users.router");
const restaurant_router_1 = require("./restaurant/restaurant.router");
const server = new server_1.Server();
server.bootstrap([users_router_1.userRouter, restaurant_router_1.restaurantsRouter]).then(server => {
    console.log("Server Running on ", server.application.address());
})
    .catch(error => {
    console.log("Server Failed");
    console.error(error);
    process.exit(1);
});
