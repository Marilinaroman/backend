const Contenedor = require('../2_clase/Contenedor');
const express = require('express')

//Crea servidor
const app = express()

//Configura el servidor

const productos = new Contenedor('../2_clase/archivo.txt');

app.get('/', (request,response)=>{
    response.send('Hola!')
})
app.get('/productos', async (request,response)=>{
    const data = await productos.getAll()
    response.send(data)
})
app.get('/productosRandom', async (request,response)=>{
    const data = productos.getAll()
    let numero = Math.round(Math.random(1,data.length)*10+1)
    console.log(numero)
    const idRandom = await productos.getById(numero)
    response.send(idRandom)
})

// Levanta el servidor
const PORT = 8080
const server = app.listen(PORT, () =>{
    console.log('algo')
})