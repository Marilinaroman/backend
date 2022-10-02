
const Contenedor = require('./Contenedor')
const express = require('express')

const app = express()

//configuracion JSON
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const productos = new Contenedor('./archivo.txt');

app.listen(8080,()=>console.log(`servidor is listening on port 8080`))

//rutas

//muestra todos los productos
app.get('/productos', async (req, res) =>{
    const data = await productos.getAll()
    res.send(data)
})

//muestra el producto segun su id
app.get('/productos/:id', async (req,res)=>{
    const {id} =req.params
    const prod = await productos.getById(id)
    res.send(prod)
})

//guarda un elemento
app.post('/productos',async (req,  res) =>{
    const newProd = (req.body)
    await productos.save(newProd)
    res.send(productos)
})

//actualiza elemento
app.put('/productos/:id', async (req,res) =>{
    const {id} = req.params
    const modificacion = req.body
    const data = await productos.getAll()
    const prod = await data.findIndex(e => e.id === Number(id)); 
    
    if(prod > 0){
        data[prod] = modificacion
        res.status(200).send(data)
    } else{
        res.status(404).send('El producto no existe')
    }
    res.send('peticion')
})


