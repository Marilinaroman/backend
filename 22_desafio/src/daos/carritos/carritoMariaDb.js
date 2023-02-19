import {ContendorCarritoMariaDb} from '../../dbOperations/managers/ContenedorCarritoMariaDb.js'

class CarritoDaosMariaDb extends ContendorCarritoMariaDb{
    constructor(options,tableName){
        super(options,tableName)
    }
}
export{CarritoDaosMariaDb}