import * as mongoose from "mongoose";
import {Restaurant} from "../restaurant/restaurant.model";
import {User} from "../users/user.model";

export interface Reviews extends mongoose.Document {
    date: Date,
    rating: number,
    comments: string,
    restaurant: mongoose.Types.ObjectId | Restaurant,
    user: mongoose.Types.ObjectId | User
}

const reviewSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comments: {
        type: String,
        required: true,
        maxlength: 500
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId, //Usado para relaccionar documentos de schemas diferentes
        required: true,
        ref: "Restaurant"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, //Usado para relaccionar documentos de schemas diferentes
        required: true,
        ref: "User"
    }
})

export const Reviews = mongoose.model<Reviews>("Reviews", reviewSchema)