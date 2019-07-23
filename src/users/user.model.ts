/*
* This page is creating a model for USER on Mongoose
*/
import * as mongoose from "mongoose";
import { validateCPF } from "../common/validators";
import * as bcrypt from "bcrypt"
import { enviroment } from "../common/enviroment";
 
export interface User extends mongoose.Document {
    name: string,
    email: string,
    password: string,
}

export interface UserModel extends mongoose.Model<User> {
    findByEmail(email: string): Promise<User>
}

//Schema create a Schema on database
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 80,
        minlength: 3,
    },

    email:{
     type: String,
     unique: true,
     match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
     required: true
    },

    password:{
        type: String,
        select: false, //doesnt show the pass when u did a simple request
        required: true
    },

    gender: {
        type: String,
        required: false,
        enum:["Male", "Female"]
    },

    cpf: {
        type: String,
        required: false,
        validate: {
            validator: validateCPF, //Insert the function to valide the code
            //@ts-ignore
            message: "{PATH}: Invalid CPF ({VALUE})"
        }
    }
})

/*
* Mode
*/

userSchema.statics.findByEmail = function (email: string) {
    return this.findOne({email: email}) // EcmaScript15 = {email} == {email: email}
}

const hashPassword = (object, next) =>{
    bcrypt.hash(object.password, enviroment.server.security.saltRounds)
        .then(hash => {
            object.password = hash
            next()
        })
        .catch(next)
}

const saveMiddleware = function (next){
    const user: User = this
    if (!user.isModified('password')) {
        next()
    } else {
        hashPassword(user, next)
    }
}

const updateMiddleware = function (next){
    if (!this.getUpdate().password) {
        next()
    } else {
        hashPassword(this.getUpdate(), next)
    }
}
userSchema.pre('save', saveMiddleware)
userSchema.pre('findOneAndUpdate', updateMiddleware)
userSchema.pre('update', updateMiddleware)
export const User = mongoose.model<User, UserModel>("User", userSchema);