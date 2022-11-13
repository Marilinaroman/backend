import mongoose from 'mongoose'
import {usersModel} from '../models/userMongoAtlas.js'

const URL = "mongodb+srv://marilinaroman:marilinaroman@backend.rvxfdqn.mongodb.net/ecommerce?retryWrites=true&w=majority"

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, error =>{
    if(error) throw new Error(`conexion fallida ${error}`)
    console.log('conexion exitosa');
})

const operaciones = async()=>{
 const newUser =[
    {nombre:"mari", edad:29},
    {nombre:"joni", edad:30}
 ]
 let result = await usersModel.insertMany(newUser)
 console.log(result);
}
operaciones()