const express = require('express')
const handlebars = require('express-handlebars')
const {Server}= require('socket.io')
const router = require('./router/ruta.js')
const productos = require('./router/ruta.js')

const app = express()

// configuro archivos json
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//configuro el puerto
const PORT = process.env.PORT|| 8080

const server = app.listen(PORT,()=>console.log(`server ${PORT}`))

const io = new Server(server)

app.use(express.static('views'))

//motor plantilla
app.engine('handlebars', handlebars.engine())

// defino directorio
app.set('views', './views')

//defino motor express
app.set('view engine', 'handlebars')

// defino rutas

app.use('/', router);



io.on('connection',(socket)=>{
    console.log('nuevo usuario', socket.id);

    socket.broadcast.emit('newUser')

    socket.on('nuevoProducto', data=>{
        productos.save(data)

        //manda msj a todos los clientes
        io.sockets.emit('historico', msjHistoricos)
    })
})