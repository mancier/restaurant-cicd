import * as mongoose from "mongoose"
import { MongoClient, Mongos } from "mongodb";

export interface MenuItem extends mongoose.Document{
	name: string,
	price: number
}

export interface Restaurant extends mongoose.Document{
	name: string,
	menu: MenuItem[]	
}

const menuScheme = new mongoose.Schema({
	name:{
		type: String,
		required: true
	}, 
	price:{
		type: Number,
		required: true
	}
})

const restaurantSchema = new mongoose.Schema({
	neme: {
		type: String,
		menu:{
			type: [menuScheme],
			required: false,
			select: false, //Não irá trazer o menu quando selecionado o restaurant
			default: [] //Valor default no mongoose
		}
	}
})

//export const Menu = mongoose.model<MenuItem>("Menu", menuScheme)
export const Restaurant = mongoose.model<Restaurant>("Restaurant", restaurantSchema)