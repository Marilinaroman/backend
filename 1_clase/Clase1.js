class Usuario {
    constructor (nombre,apellido,libros,mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros= libros;
        this.mascotas=mascotas;
    }

    getFullName(){
        return `El nombre completo es: ${this.apellido} ${this.nombre}`
    }

    addMascotas(nombreMascota,tipoMascota){
        const miMascota = {nombreMascota, tipoMascota}
        this.mascotas.push(miMascota)
    }

    countMascotas(){
        const count = this.mascotas.length
        return `El usuario tiene ${count} mascotas`
    }
    addBook(nombre, autor){
        const libro = {nombre, autor}
        this.libros.push(libro)
        return this.libros
    }
    getBookName(){
        const nombresLibros = this.libros.map((e)=> e.nombre)
        return nombresLibros
    }
}

const nuevoUsuario = new Usuario('Marilina','Roman',[{nombre:'Harry Potter',autor:'J.K. Rowling'}], [{nombreMascota:'juanito',tipoMascota:'gato'}, {nombreMascota:'india',tipoMascota:'gato'},{nombreMascota:'catalina', tipoMascota:'perro'}])


console.log(nuevoUsuario)
console.log(nuevoUsuario.getFullName())
nuevoUsuario.addMascotas('walter','conejo')
console.log(nuevoUsuario.countMascotas())
console.log(nuevoUsuario.addBook('el señor de las moscas','william golding'))
console.log(nuevoUsuario.getBookName())