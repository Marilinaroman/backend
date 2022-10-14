const express = require('express')
const app = express()

app.listen(8080, () => console.log('servidor 8080'))

// configuro pug

app.set('views','./views')
app.set('view engine', 'pug')

//rutas
app.get('/', (req,res)=>{
    const {edad} = req.query
    res.render('home',{
        nombre:'marilina',
        edad: edad
    })
})

