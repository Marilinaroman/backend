const Contenedor = require('./Contenedor.js');

const productos = new Contenedor('./archivo.txt');

const test = async () => {
    const data = await productos.getAll()
    console.log(data)
}

test();
