import {MongoContainer} from '../../dbOperations/managers/mongo.manager.js'

class UserMongoDao extends MongoContainer{
    constructor(model){
        super(model)
    }
}

export {UserMongoDao}