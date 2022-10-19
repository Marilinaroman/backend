console.log('conectado');

const socketCliente = io();

const nombre = document.getElementById('nombre')
const precio = document.getElementById('precio')
const url = document.getElementById('url')

const enviar = document.getElementById('enviar')

enviar.addEventListener('click',(e)=>{
    socketCliente.emit('nuevoProducto',{
        nombre: nombre.value,
        precio: precio.value,
        url:url.value

    })
	location.href = '/';
})