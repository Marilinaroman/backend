const express = require('express')
const router = express.Router()

let productos = []
//Defino Ruta

router.get('/',(req,res)=>{
    res.render('form')
})

router.get('/productos', (req,res)=>{
    res.render('productos',{productos})
})

router.post('/productos', (req,res)=>{
    const {producto, precio, url} = req.body
    productos.push({producto, precio, url})
    res.render('form')
})

module.exports = router