import * as mongoose from "mongoose"

export interface MenuItem extends mongoose.Document{
	name: string,
	price: number
}

export interface Restaurant extends mongoose.Document{
	name: string,
	menu: MenuItem[]	
}