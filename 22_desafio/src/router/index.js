import express from "express";
import { ProductosRouter } from "./api/productos.router.js";
import { ProductosTestRouter } from "./api/productosTest.router.js";
import { InfoRouter } from "./api/info.router.js";
import { UserRouter } from "./api/user.router.js"; 

const router = express.Router()

router.use('/productos', ProductosRouter)
router.use('/info', InfoRouter)
router.use('/test',ProductosTestRouter)
router.use('/user', UserRouter)

export {router as apiRouter}