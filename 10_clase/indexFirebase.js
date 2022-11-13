import admin from "firebase-admin";
import {readFileSync} from "fs";
const serviceAccount = JSON.parse(readFileSync("./firebase/firebaseKey.json"));
console.log(serviceAccount);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:"https://proyectobackend2023.firebaseio.com",
});

console.log("base conectada");

const operacionesCRUD = async () =>{
    const db = admin.firestore()

    const userCollection = db.collection('usuarios')

    const doc = userCollection.doc()
    /*await doc.create({nombre:"marilina", edad:28})
    console.log("usuario creado");*/

    let batch = db.batch()
    
    const usuarios = [
        { nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '31155898', curso: '1A', nota: 7 },
        { nombre: 'Ana', apellido: 'Gonzalez', edad: 32, dni: '27651878', curso: '1A', nota: 8 },
        { nombre: 'José', apellido: 'Picos', edad: 29, dni: '34554398', curso: '2A', nota: 6 }
    ]

    usuarios.forEach(users =>{
        const docRef = db.collection('usuarios').doc()
        batch.set(docRef, users)
    })

    await batch.commit()
}

operacionesCRUD()