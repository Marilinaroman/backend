import {ContendorMariaDb} from '../../dbOperations/managers/mariaDb.managers.js'

class ProductosDaosMariaDb extends ContendorMariaDb{
    constructor(options,tableName){
        super(options,tableName)
    }
}
export{ProductosDaosMariaDb}