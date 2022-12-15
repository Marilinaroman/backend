import express, { application } from 'express'
import {fork} from 'child_process'

const routerInfo = express.Router()

routerInfo.get('/',(req,res)=>{
    const version = `Version de Node JS : ${process.version}`
    const nombrePlataforma = `Nombre de la plataforma: ${process.platform}`
    const pathEjecucion = `Path de ejecución : ${process.execPath}`
    const processId = `Proceso ID : ${process.pid}`
    const memoria = `Memoria en uso: ${process.memoryUsage().rss}`
    const directorio = `Directorio : ${process.cwd()}`
    res.send({version,nombrePlataforma,pathEjecucion,processId, memoria,directorio})
})

routerInfo.get('/randoms',(req,res)=>{

    const child = fork("src/child/child.js");
    const {cantidad} = req.query
    
    let obj = {};
    cantidad
            ? child.send({ cantidad, obj })
            : child.send({ cantidad: 500000000, obj });
            child.on('message', msg => res.json(msg))
    
})

export default routerInfo