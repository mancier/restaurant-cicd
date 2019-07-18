import * as mongoose from "mongoose"

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
});

const restaurantSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	menu: {
		type: [menuScheme],
		required: false,
		select: true, //Não irá trazer o menu quando selecionado o restaurant
	}
});

restaurantSchema.pre("save", function (next){
    console.log(this);
	next()
});
//export const Menu = mongoose.model<MenuItem>("Menu", menuScheme)
export const Restaurant = mongoose.model<Restaurant>("Restaurant", restaurantSchema);