"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviroment = {
    server: {
        port: process.env.SERVER_PORT || 3000,
        db: {
            url: process.env.DB_URL || "mongodb://localhost:27017/meat-api",
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASSWORD || "password",
            authDb: process.env.DB_AUTHENTICATION || "admin",
        }
    }
};
