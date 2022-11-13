import mongoose from "mongoose";
import {studentModel} from './models/student.js'

//LA URL donde se esta ejcutando nuestra base de datos
const URL ="mongodb://127.0.0.1:27017/colegio";

//conectamos a la base de datos
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, error=>{
    if(error) throw new Error(`Conexion fallida ${error}`);
    console.log("conexion base de datos exitosa!")
})
console.log("base de datos conectada")

const operacionesCRUD = async()=>{
    const newStudents = [
        { nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '31155898', curso: '1A', nota: 7 },
        { nombre: 'Ana', apellido: 'Gonzalez', edad: 32, dni: '27651878', curso: '1A', nota: 8 },
        { nombre: 'José', apellido: 'Picos', edad: 29, dni: '34554398', curso: '2A', nota: 6 },
        { nombre: 'Lucas', apellido: 'Blanco', edad: 22, dni: '30355874', curso: '3A', nota: 10 },
        { nombre: 'María', apellido: 'García', edad: 36, dni: '29575148', curso: '1A', nota: 9 },
        { nombre: 'Federico', apellido: 'Perez', edad: 41, dni: '320118321', curso: '2A', nota: 5 },
        { nombre: 'Tomas', apellido: 'Sierra', edad: 19, dni: '38654790', curso: '2B', nota: 4 },
        { nombre: 'Carlos', apellido: 'Fernández', edad: 33, dni: '26935670', curso: '3B', nota: 2 },
        { nombre: 'Fabio', apellido: 'Pieres', edad: 39, dni: '4315388', curso: '1B', nota: 9 },
        { nombre: 'Daniel', apellido: 'Gallo', edad: 25, dni: '37923460', curso: '3B', nota: 2 }
    ]

    let resultado = await studentModel.create({nombre: 'juan', apellido: 'rom', edad: 21, dni: '1111111', curso: '1A', nota: 7})
    console.log(resultado)
}
operacionesCRUD()