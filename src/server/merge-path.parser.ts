/**
 * This content type isnt supported by restify by default, so we parse this to JSON
 */

import * as restify from 'restify'
import { BadRequestError } from "restify-errors";
const mpContentType = "application/merge-path+json"

export const mergePatchBodyParser = (req: restify.Request, resp: restify.Response, next) => {
    if(req.getContentType() === mpContentType && req.method === "PATCH"){
        try {
            req.body = JSON.parse(req.body)   
        } catch (e) {
            return next(new BadRequestError())
        }
    }
    return next()
}