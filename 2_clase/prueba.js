const Contenedor = require('./archivos-sync.js');

const productos = new Contenedor('./archivo.txt');

const test = async () => {
    const data = await productos.save({"producto":"guantes", "precio":200, "thumbnail": "url de la foto del producto"})
    console.log(data);

}

test();
