import knex from "knex";

class ContenedorSql{
    constructor(options,tableName){
        this.database = knex(options)
        this.table=tableName
    }

    async getAll(){
        const db = await this.database('mensajes').select('*')
        const productos = db.map((e)=>({...e}))
        return productos
    }
}