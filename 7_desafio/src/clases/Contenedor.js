import knex from "knex";

class ContenedorSql{
    constructor(options,tableName){
        this.database = knex(options)
        this.table=tableName
    }

    async getAll(){
        const db = await this.database('productos').select('*')
        const productos = db.map((e)=>({...e}))
        return productos
    }
}

export default ContenedorSql