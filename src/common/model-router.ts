import { Router } from "./router";
import * as mongoose from "mongoose";

export abstract class ModelRouter<D extends mongoose.Document> extends Router {
	constructor(protected model: mongoose.Model<D>) {
		super()
	}
	
	findAll = (req, res, next) => {
		this.model.find()
			.then(this.render(res, next))
			.catch(next)
	}
}