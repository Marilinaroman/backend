import { MongoContainer } from "./managers/mongo.manager.js";
import { UserModel } from "./model/users.js";


export const UserManager = new MongoContainer(UserModel);