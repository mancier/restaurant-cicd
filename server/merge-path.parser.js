"use strict";
/**
 * This content type isnt supported by restify by default, so we parse this to JSON
 */
Object.defineProperty(exports, "__esModule", { value: true });
const restify_errors_1 = require("restify-errors");
const mpContentType = "application/merge-path+json";
exports.mergePatchBodyParser = (req, resp, next) => {
    if (req.getContentType() === mpContentType && req.method === "PATCH") {
        try {
            req.body = JSON.parse(req.body);
        }
        catch (e) {
            return next(new restify_errors_1.BadRequestError());
        }
    }
    return next();
};
