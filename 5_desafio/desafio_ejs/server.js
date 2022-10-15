const express = require('express')
const rutasRouter = require('./routes/rutas.js')


const app = express()
//configuro JSON
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.listen(8080, ()=>console.log('server 8080'))

//configuro ejs
app.set('views','./views')
app.set('view engine', 'ejs')

app.use('/', rutasRouter)

