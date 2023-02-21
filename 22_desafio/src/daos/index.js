import mongoose from 'mongoose';
import { options } from '../config/options.js';
import { config } from '../config/config.js';

let ContenedorDaoProductos
let ContenedorDaoCarrito
let ContenedorDaoUser
let UserModel

let databaseType = 'mongo'

switch(databaseType){
    case "mongo":

        const URL = options.mongo.url
        
        mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, error =>{
            if(error) throw new Error(`conexion fallida ${error}`)
            console.log('conexion exitosa');
        })

        const {ProductosDaosMongo} = await import('./productos/productosMongo.js')
        const {productosSchema} = await import('../dbOperations/model/mongoAtlas.js')
        const {productosCollection} = await import('../dbOperations/model/mongoAtlas.js')
        ContenedorDaoProductos = new ProductosDaosMongo(productosCollection,productosSchema)

        const {CarritoDaosMongo} = await import('./carritos/carritoMongo.js')
        const {carritosSchema} = await import('../dbOperations/model/mongoAtlas.js')
        const {carritosCollection} = await import('../dbOperations/model/mongoAtlas.js')
        ContenedorDaoCarrito = new CarritoDaosMongo(carritosCollection,carritosSchema)

        const{UserMongoDao} = await import('./users/usersMongo.js')
        const {userSchema} = await import('../dbOperations/model/users.js')
        const {usersCollection} = await import('../dbOperations/model/users.js')
        ContenedorDaoUser = new UserMongoDao(usersCollection,userSchema)
        UserModel = mongoose.model(usersCollection,userSchema)
        break;

    case "mariaDb":
        const {CarritoDaosMariaDb} = await import('./carritos/carritoMariaDb.js')
        const {ProductosDaosMariaDb} =await import('./productos/productosMariaDb.js')
        ContenedorDaoProductos = new ProductosDaosMariaDb(options.mariaDb,'productos')
        ContenedorDaoCarrito = new CarritoDaosMariaDb(options.mariaDb,'carrito')
        break;

    
}

export {ContenedorDaoProductos, ContenedorDaoCarrito, ContenedorDaoUser, UserModel}