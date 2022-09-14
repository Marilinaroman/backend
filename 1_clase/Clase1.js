class Usuario {
    constructor (nombre,apellido,libros,mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros= libros;
        this.mascotas=mascotas;
    }

    getFullName(){
        console.log(`El nombre completo es: ${this.apellido} ${this.nombre}`)
    }

    addMascotas(nombreMascota,tipoMascota){
        const miMascota = {nombreMascota, tipoMascota}
        this.mascotas.push(miMascota)
        console.log(this.mascotas)
    }

    countMascotas(){
        const count = this.mascotas.filter(u => u.nombreMascota).length
        console.log(`El usuario tiene ${count} mascotas`)
    }
    addBook(nombre, autor){
        const libro = {nombre, autor}
        this.libros.push(libro)
        console.log(this.libros)
    }
    getBookName(){
        const nombresLibros = this.libros.map((e)=> e.nombre)
        console.log(nombresLibros)
    }
}

const nuevoUsuario = new Usuario('Marilina','Roman',[{nombre:'Harry Potter',autor:'J.K. Rowling'}], [{nombreMascota:'juanito',tipoMascota:'gato'}, {nombreMascota:'india',tipoMascota:'gato'},{nombreMascota:'catalina', tipoMascota:'perro'}])


console.log(nuevoUsuario)
nuevoUsuario.getFullName()
nuevoUsuario.addMascotas('pepito','conejo')
nuevoUsuario.countMascotas()
nuevoUsuario.addBook('el señor de las moscas','william golding')
nuevoUsuario.getBookName()