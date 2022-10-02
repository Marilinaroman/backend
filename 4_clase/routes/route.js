const express = require('express')
const router = express.Router()


// base de datos
const Contenedor = require('../Contenedor.js')
const productos = new Contenedor('./archivo.txt');


//Rutas
//muestra todos los productos
router.get('/', async (req, res) =>{
    const data = await productos.getAll()
    res.send(data)
})

//muestra el producto segun su id
router.get('/:id', async (req,res)=>{
    const {id} =req.params
    const prod = await productos.getById(id)
    res.send(prod)
})

//guarda un elemento
router.post('/',async (req,  res) =>{
    const newProd = (req.body)
    await productos.save(newProd)
    res.send(productos)
})

//actualiza elemento
router.put('/:id', async (req,res) =>{
    const {id} = req.params
    const modificacion = req.body
    const data = await productos.getAll()
    const prod = await data.findIndex(e => e.id === parseInt(id)); 
    
    if(prod >= 0){
        data[prod] = modificacion
        return res.status(200).send(data)
    } else{
        return res.status(404).send('El producto no existe')
    }
})

//elimina el elemento
router.delete('/:id', async (req,res) =>{
    const {id} = req.params
    const prod = await productos.getById(id)
    console.log(prod);
    if(prod.length >= 0){
        const data = await productos.deleteById(id)
        return res.status(200).send(data)
    } else{
        return res.status(404).send('El producto no existe')
    }
})

module.exports = router