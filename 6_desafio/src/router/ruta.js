const express = require('express')
const router = express.Router()

const Contenedor = require('../Contenedor.js')
const productos = new Contenedor('./archivo.txt');

router.get('/', async(req,res)=>{
    const data = await productos.getAll()
    res.render('form',{productos:data})
})

module.exports = {
    router,
    productos
}