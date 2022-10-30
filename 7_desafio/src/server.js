import express from 'express';
import handlebars from 'express-handlebars';
import { createServer } from "http";
import { Server } from "socket.io";
import router from './router/ruta.js'

const app = express()
const httpServer = createServer();
const io = new Server(httpServer);

// configuro archivos json
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//configuro el puerto
const PORT = process.env.PORT|| 8080

const server = httpServer.listen(PORT,()=>console.log(`server ${PORT}`))

app.use(express.static('views'))

//motor plantilla
app.engine('handlebars', handlebars.engine())

// defino directorio
app.set('views', './views')

//defino motor express
app.set('view engine', 'handlebars')

//defino rutas

app.use('/', router);



io.on('connection',(socket)=>{
    console.log('nuevo usuario', socket.id)

    io.sockets.emit('productos', productos);
	io.sockets.emit('chat', mensajes);

    socket.broadcast.emit('nuevoUsuario')

    socket.on('nuevoProducto', nuevoProducto=>{
        productos.push(nuevoProducto)
        fs.writeFileSync('./archivo.txt', JSON.stringify(productos))
        io.sockets.emit('lista', productos)
    })

    socket.on('nuevoMsj', nuevoMsj =>{
        console.log(nuevoMsj);
        mensajes.push(nuevoMsj)
        fs.writeFileSync('./mensajes.txt', JSON.stringify(mensajes))
        io.sockets.emit('chat', mensajes)
    })
})