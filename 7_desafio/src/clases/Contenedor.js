import knex from 'knex'

class ContenedorSql{
    constructor(options,tableName){
        this.database = knex(options)
        this.table = tableName
    }

    
}