const express = require('express')

const rutasRouter = require('./routes/rutas')

const app = express()

//configuracion JSON
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.listen(8080, ()=>console.log('server 8080'))


//configuro pug
app.set('views','./views')
app.set('view engine','pug')

app.use('/', rutasRouter)
