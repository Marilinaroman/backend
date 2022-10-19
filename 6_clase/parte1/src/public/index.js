const socketCliente = io()

console.log('conectado');

socketCliente.on('messageFromServer',(data)=>{
    console.log(data);
})

const messageField = document.getElementById('messageField')

messageField.addEventListener('keydown',(e)=>{
    console.log(e.key);
    socketCliente.emit('letras', e.key)
})

socketCliente.on('message', (msj)=>{
    console.log(msj);
})