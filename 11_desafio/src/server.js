import express from 'express';
import router from './router/ruta.js';

//configuro el puerto
const app = express()

const PORT = process.env.PORT|| 8080

// configuro archivos json
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// defino rutas

app.use('/api', router);

app.listen(PORT,()=>console.log(`server ${PORT}`))

