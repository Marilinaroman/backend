const express = require('express')
const productosRouter = require('./routes/route')
const usuariosRouter = require('./routes/users')

const app = express()

//configuracion JSON
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.listen(8080,()=>console.log(`servidor is listening on port 8080`))

//rutas

app.use('/productos', productosRouter)
app.use('/users', usuariosRouter)

