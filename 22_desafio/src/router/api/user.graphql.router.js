import express from "express"
import {userGraphqlController} from '../../controllers/user.graphql.controllers.js'

const router = express.Router()

router.get('/', userGraphqlController())

export {router as graphiqlRouter}