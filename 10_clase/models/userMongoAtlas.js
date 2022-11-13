import mongoose, { mongo } from 'mongoose'

const usersCollection = "users"

const usersSchema = new mongoose.Schema({
    nombre:String,
    edad:Number
})

export const usersModel = mongoose.model(usersCollection,usersSchema)