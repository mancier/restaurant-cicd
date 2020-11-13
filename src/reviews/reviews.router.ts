import {ModelRouter} from "../common/model-router";
import * as restify from "restify"
import {Reviews} from "./reviews.model";

class ReviewsRouter extends ModelRouter<Reviews> {
    constructor() {
        super(Reviews)
    }

    /**
    >> Outro meio de se fazer o findById usando um template
    protected prepareOne(query: mongoose.DocumentQuery<Reviews,Reviews>): mongoose.DocumentQuery<Reviews,Reviews> {
        return query.populate("user", "name")
                    .populate("restaurant", "name")
    }
    */

    findById = (req, res, next) => {
        this.model.findById(req.params.id)
            .populate("user", "name")
            .populate("restaurant", "name")
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