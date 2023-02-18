import {ContainerCarritoMongo} from '../../dbOperations/managers/ContenedorCarritoMongo.js'

class CarritoDaosMongo extends ContainerCarritoMongo{
    constructor(carritoCollection, carritoSchema){
        super(carritoCollection, carritoSchema)
    }
}
export{CarritoDaosMongo}