import knex from "knex";

class ContendorSqlite{
    constructor(options,tableName){
        this.database = knex(options)
        this.table = tableName
    }
    async getAll(){
        const result = await this.database("articulos").select("*");
        const products = result.map(elm=>({...elm}));
        return products
    }
}