import { RequestHandler } from "restify";
import * as jwt from "jsonwebtoken";
import { User } from "../users/user.model";
import { NotAuthorizedError } from "restify-errors";
import { enviroment as env } from "../common/enviroment";

export const authenticate: RequestHandler = (req, res, next) => {
    const { email, password } = req.body
    User.findByEmail(email, '+password').then(user => {
        if (user && user.matches(password)){
            const jwt_token = jwt.sign({ sub: user.email, iss: env.server.appName }, env.server.security.apiSecret)
            res.json({
                name: user.name,
                email: user.email,
                accessToken: jwt_token
            })
            return next(false)
        } else {
            return next(new NotAuthorizedError('Invalid Credentials'))
        }
    })

    
}