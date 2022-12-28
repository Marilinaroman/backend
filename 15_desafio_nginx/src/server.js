import express from 'express';
import routerInfo from './router/rutaInfo.js';
import handlebars from 'express-handlebars'
import path from 'path';
import parseArgs from 'minimist';
import cluster from 'cluster'
import os from 'os'

//Captura argumentos
const optionsFork ={alias:{m:'mode'}, default:{mode:'FORK'}}
const objArguments = parseArgs(process.argv.slice(2), optionsFork)
const MODO = objArguments.mode
console.log('objArgu', MODO);

// configuro archivos json
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//app.use(express.static(path.join(__dirname,'/views')))


//motor plantilla
app.engine('handlebars', handlebars.engine())

// defino directorio
app.set('views',path.join(__dirname,'/views'))

//defino motor express
app.set('view engine', 'handlebars')

//normalizacion de datos



// Logica de fork o cluster
if(MODO==='CLUSTER' && cluster.isPrimary){
    const numCPUS = os.cpus().length

    for(let i=0; i<numCPUS; i++){
        cluster.fork()
    }
    cluster.on('exit',(worker)=>{
        console.log(`el subproceso ${worker.process.pid} fallo`);
        cluster.fork()
    })

}else{
    //configuro el puerto
    const PORT = process.env.PORT|| 8080

    app.listen(PORT,()=>console.log(`server ${PORT}`))

}


