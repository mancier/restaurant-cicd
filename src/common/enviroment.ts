export const enviroment = {
    server: {
        port: process.env.SERVER_PORT || 3000,
        db:{
            url: process.env.DB_URL || "mongodb://db:27017/",
            user: process.env.DB_USER || "admin",
            schema: process.env.DB_SCHEMA || "meat-api",
            password: process.env.DB_PASSWORD || "K1WaMs04sbnNV6sb1ZE7RPTlOm7V4kG",
            authDb: process.env.DB_AUTHENTICATION || 'admin',
        },
        security:{
            saltRounds: process.env.SALT_ROUNDS ||10
        }
    }
}

// db.createUser({
//     user: "admin",
//     pwd: "K1WaMs04sbnNV6sb1ZE7RPTlOm7V4kG",
//     roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
// })