import {ContainerMongo} from '../../dbOperations/managers/ContenedorProductosMongo.js'

class ProductosDaosMongo extends ContainerMongo{
    constructor(collection,schema){
        super(collection,schema)
    }
}
export{ProductosDaosMongo}