import express from 'express';
import handlebars from 'express-handlebars'
import path from 'path';
import {fileURLToPath} from 'url';
import { apiRouter } from './router/index.js';
import session from 'express-session'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import {config} from './config/config.js'
import parseArgs from 'minimist';
import cluster from 'cluster'
import os from 'os'
import { options } from './config/options.js';
import {logger, logArchivoError} from './config/logger.js'
import cors from 'cors'

//Captura argumentos
const optionsFork ={alias:{m:'mode'}, default:{mode:'FORK'}}
const objArguments = parseArgs(process.argv.slice(2), optionsFork)
const MODO = objArguments.mode
logger.info('objArgu', MODO);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



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


//Cookies
app.use(cookieParser())

app.use(session({
    store: MongoStore.create({
        mongoUrl:config.MONGO_SESSION
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
app.use(cors({
    origin:'http://localhost:3000',
    methods:['GET','POST','PUT','DELETE']
}))

// defino rutas

app.use('/api', apiRouter);


// Logica de fork o cluster
if(MODO==='CLUSTER' && cluster.isPrimary){
    const numCPUS = os.cpus().length

    for(let i=0; i<numCPUS; i++){
        cluster.fork()
    }
    cluster.on('exit',(worker)=>{
        logger.error(`el subproceso ${worker.process.pid} fallo`);
        cluster.fork()
    })

}else{
    //configuro el puerto
    const PORT = options.server.PORT

    app.listen(PORT,()=>logger.info(`server ${PORT}`))
    
}

export{app}


