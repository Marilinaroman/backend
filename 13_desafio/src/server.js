import express from 'express';
import router from './router/ruta.js';
import handlebars from 'express-handlebars'
import {Server} from 'socket.io';
import path from 'path';
import {fileURLToPath} from 'url';
import { contenedorMsj } from './clases/contenedorMsj.js';
import { options } from './config/configSql.js';
import { normalize, schema } from "normalizr";
import session from 'express-session'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import { UserModel } from './model/users.js';

const mensajes = new contenedorMsj(options.fileSystem.pathMensajes)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Conecto base de datis
const mongoUrl = "mongodb+srv://marilinaroman:marilinaroman@backend.rvxfdqn.mongodb.net/autenticationDb?retryWrites=true&w=majority"

mongoose.connect(mongoUrl, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}, (err)=>{
    if(err) return console.log(`hubo un error: ${err}`);
    console.log('conexion exitosa');
})


// configuro archivos json
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'/views')))


//motor plantilla
app.engine('handlebars', handlebars.engine())

// defino directorio
app.set('views',path.join(__dirname,'/views'))

//defino motor express
app.set('view engine', 'handlebars')

//normalizacion de datos

//autor
const autorSchema = new schema.Entity('autor')
//msj
const msjSchema = new schema.Entity('mensajes',{autor:autorSchema})
//esquema global
const chatSchema = new schema.Entity('chat',{
    mensajes:[msjSchema]
},{idAttribute:'id'})

//aplico normalizacion
const normalizarData = (data)=>{
    const normalizacion = normalize({id:'chatHistorico', mensajes:data},chatSchema)
    return normalizacion
}

const normalizarMsj = async()=>{
    const resultado = await mensajes.getAll()
    const mensajesNormalizados = normalizarData(resultado)
    console.log(JSON.stringify(mensajesNormalizados, null,"\t"))
    return mensajesNormalizados
}
normalizarMsj()

//Cookies
app.use(cookieParser())

app.use(session({
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://marilinaroman:marilinaroman@backend.rvxfdqn.mongodb.net/sessions?retryWrites=true&w=majority'
    }),
    secret:"claveSecreta",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:600000
    }
}))

// Configuro passport

app.use(passport.initialize())
app.use(passport.session())

//serializar
passport.serializeUser((user,done)=>{
    done(null, user.id)
})

passport.deserializeUser((id, done)=>{
    UserModel.findById(id,(error, userFound)=>{
        if(error) return done(error)
        return done(null,userFound)
    })
})

// defino rutas

app.use('/api', router);

//configuro el puerto
const PORT = process.env.PORT|| 8080

const server = app.listen(PORT,()=>console.log(`server ${PORT}`))

const io = new Server(server);

io.on('connection', async(socket)=>{
    console.log('nuevo usuario', socket.id)

    //io.sockets.emit('productos', productos);
	io.sockets.emit('chat', await normalizarMsj());

    socket.broadcast.emit('nuevoUsuario')

    /*socket.on('nuevoProducto', nuevoProducto=>{
        productos.push(nuevoProducto)
        fs.writeFileSync('./archivo.txt', JSON.stringify(productos))
        io.sockets.emit('lista', productos)
    })*/

    socket.on('nuevoMsj', async (nuevoMsj) =>{
        await mensajes.save(nuevoMsj)
        io.sockets.emit('chat', await normalizarMsj())
    })
})

