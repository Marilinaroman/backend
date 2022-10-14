const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')
const folderViews = path.join(__dirname,'views')

const app = express()



app.listen(8080, ()=>console.log('server 8080'))

// motor de plantillas

app.engine('handlebars',handlebars.engine())

//definir el directorio de templates

app.set('views', folderViews)

//define motor para express

app.set('view engine','handlebars')

//rutas
app.get('/',(req,res)=>{
    res.render('home')
})