import express from 'express'
import * as ProductosControllers from '../../controllers/productos.controllers.js'
const router = express.Router()

//http://localhost:8080/api/productos

router.get('/', ProductosControllers.getProdsControllers)

router.get('/:id', ProductosControllers.getProdByIdControllers)

router.post('/', ProductosControllers.saveProdController)

router.put('/:id', ProductosControllers.updateProdController)

router.delete('/:id', ProductosControllers.deleteProdController)


export {router as ProductosRouter}