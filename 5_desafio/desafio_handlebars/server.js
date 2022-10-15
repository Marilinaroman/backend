const express = require('express')
const handlebars = require('express-handlebars')
const rutasRouter = require('./routes/rutas')


const app = express()

//configuracion JSON
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.listen(8080, ()=> console.log('Server 8080'))

//Motor de plantilla
app.engine('handlebars', handlebars.engine())

//Defino directorio

app.set('views', './views')

//Defino motor express

app.set('view engine', 'handlebars')

//Defino rutas
app.use('/', rutasRouter)