const express = require('express')
const usuariosRouter = express.Router()

usuariosRouter.get('/',(req,res)=>{
    res.send('Ruta de usuarios')
})

module.exports = usuariosRouter