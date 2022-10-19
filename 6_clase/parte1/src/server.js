const express = require('express')
const {Server} = require('socket.io')
const app = express()

const server = app.listen(8080, ()=>console.log('server 8080'))

// io es el servidor del websocket
const io = new Server(server)

app.use(express.static(__dirname+'/public'))

// crea la conexion del socket con el cliente del servidor
io.on('connection', (socket)=>{
    console.log('cliente conectado', socket.id);

    //enviar informacion
    socket.emit('messageFromServer','se conecto exitosamente')

    //comunicacion con todos los clientes
    socket.on('letras',(data)=>{
        console.log(data);
        io.sockets.emit('message',data)
    })
})

