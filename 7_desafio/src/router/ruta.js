import knex from 'knex'
import ContenedorSql from '../clases/Contenedor.js'
import express from 'express'

const router = express.Router()


const data = new ContenedorSql('./db/database.sqlite')

router.get('/', async (req,res)=>{
    const productos = await data.getAll()
    console.log(productos);
    res.render('form',{productos})
})

router.get('/chat', (req,res)=>{
    res.render('chat',{mensajes})
})

export default router