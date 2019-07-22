import {ModelRouter} from "../common/model-router";
import * as restify from "restify"
import {NotFoundError} from "restify-errors";
import {Reviews} from "./reviews.model";

class ReviewsRouter extends ModelRouter<Reviews> {
    constructor() {
        super(Reviews)
    }

    findById = (req, res, next) => {
        this.model.findById(req.params.id)
            .populate("user", "name")
            .populate("restaurant")
            .then(this.render(res, next))
            .catch(next)
    }

    applyRouter(application: restify.Server) {
        application.get("/reviews", this.findAll);
        application.get('/reviews/:id', [this.validateId, this.findById]);
        application.post("/reviews", this.save);
    }
}

export const reviewsRouter = new ReviewsRouter()