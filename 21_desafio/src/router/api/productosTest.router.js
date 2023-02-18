import express from "express"
import { productosTest } from '../../test/testFaker.js'

const router = express.Router()

//http://localhost:8080/api/test/productos-test

router.get('/productos-test', async(req,res)=>{
    res.send(productosTest)
})

export {router as ProductosTestRouter}
