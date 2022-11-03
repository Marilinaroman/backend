import ContendorMariadb from '../mariadbConfig.js'
import express from 'express'


const router = express.Router()
const productos = new ContendorMariadb('productos')


router.get('/', async (req,res)=>{
    const data = await productos.getAll()
    console.log(data);
    res.send({data})
})

router.get('/chat', (req,res)=>{
    res.render('chat',{mensajes})
})

export default router