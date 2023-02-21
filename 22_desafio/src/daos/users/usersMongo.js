import {MongoContainer} from '../../dbOperations/managers/mongo.manager.js'

class UserMongoDao extends MongoContainer{
    constructor(collection,schema){
        super(collection,schema)
    }
}

export {UserMongoDao}