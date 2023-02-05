import { MongoContainer } from "./managers/mongo.manager.js";
import { UserModel } from "./model/users.js";
import {ContendorMariaDb} from '../dbOperations/managers/mariaDb.managers.js'
import { options } from '../config/options.js'

export const ProductosManager = new ContendorMariaDb(options.mariaDb,'productos')

export const UserManager = new MongoContainer(UserModel);