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
    useNewUrlParser: true,
    useUnifiedTopology:true
}, (err)=>{
    if(err) return console.log(`hubo un error: ${err}`);
    console.log('conexion a base de datos exitosa');
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
    
    //console.log(JSON.stringify(mensajesNormalizados, null,"\t"))
    
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

//crear una funcion para encriptar la contraseñas;
const createHash = (password)=>{
    const hash = bcrypt.hashSync(password,bcrypt.genSaltSync(10));
    return hash;
}
//Validar contraseña
const isValidPassword = (user, password)=>{
    return bcrypt.compareSync(password, user.password);
}

//passport strategy crear usuario
passport.use('signupStrategy', new LocalStrategy({
    passReqToCallback:true,
    usernameField: "email",
},
    (req,username,password,done)=>{
        console.log(username);
        UserModel.findOne({username:username}, (error,userFound)=>{
            if (error) return done(error,null,{message:'hubo un error'})
            if(userFound) return done(null,null,{message:'el usuario existe'}) 
            const newUser = {
                name: req.body.name,
                username:username,
                password:createHash(password)
            }
            console.log(newUser);
            UserModel.create(newUser, (error,userCreated)=>{
                if(error) return done(error,null, {message:'error al registrar'})
                return done(null, userCreated,{message:'usuario creado'})
            })
        })
    }
))

// passport strategy iniciar sesion
passport.use('loginStrategy', new LocalStrategy(
    (username, password, done) => {
        console.log(username);
        UserModel.findOne({ username: username }, (err, user)=> {
            console.log(user);
            if (err) return done(err);
            if (!user) return done(null, false);
            if (!user.password) return done(null, false);
            if (!isValidPassword(user,password)){
                console.log('existen datos')
                return done(null,false,{message:'password invalida'})
            }
            return done(null, user);
        });
    }
));

app.get('/api/registro', async(req,res)=>{
    const errorMessage = req.session.messages ? req.session.messages[0] : '';
    console.log(req.session);
    res.render('signup',{error:errorMessage})
    req.session.messages =[]
})

app.get('/api/inicio-sesion', (req,res)=>{
    res.render('login')
})

app.post('/api/signup',passport.authenticate('signupStrategy',{
    failureRedirect:'/api/registro',
    failureMessage:true
}),(req,res)=>{
    res.redirect('/api/perfil')
})

app.post('/api/login',passport.authenticate('loginStrategy',{
    failureRedirect: '/api/inicio-sesion',
    failureMessage:true
}),
(req,res)=>{
    res.redirect('/api/perfil')
})


app.get('/api/perfil',async(req,res)=>{
    if(req.isAuthenticated()){
        let {name} = req.user
        res.render('form',{user:name})
    }else{
        res.send("<div>Debes <a href='/api/inicio-sesion'>inciar sesion</a> o <a href='/api/registro'>registrarte</a></div>")
    }
})

app.get('/api/logout',(req,res)=>{
    req.session.destroy()
    setTimeout(()=>{
            res.redirect('./inicio-sesion')
    },3000)
})

// defino rutas

app.use('/api', router);

//configuro el puerto
const PORT = process.env.PORT|| 8080

const server = app.listen(PORT,()=>console.log(`server ${PORT}`))

const io = new Server(server);

io.on('connection', async(socket)=>{
    //console.log('nuevo usuario', socket.id)

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

