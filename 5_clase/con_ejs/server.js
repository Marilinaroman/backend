const express = require('express')
const app = express()

app.listen(8080, ()=> console.log('server 8080'))

//para leer formato json
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.set('views', './views')
app.set('view engine', 'ejs')

const usuarios = []

app.get('/', (req,res)=>{
    res.render('home',{
        users:usuarios
    })
})


app.post('/users', (req,res)=>{
    const newUser = req.body
    usuarios.push(newUser)
    console.log(usuarios);
    res.redirect('/')
})
