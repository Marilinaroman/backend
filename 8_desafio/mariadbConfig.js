import {options} from './options/optionMariadb.js'
import knex from 'knex'

//const database = knex(options)

/*const operations = async() =>{

    const tableExiste = await database.schema.hasTable('productos')

        if(tableExiste){
        await database.schema.dropTable('productos')
    }

    await database.schema.createTable('productos', table=>{
        table.increments("id");
        table.integer('timestamp',20).nullable(false);
        table.integer("stock",20).nullable(false);
        table.string('nombre',20).nullable(false);
        table.float('price',20).nullable(false);
        table.string('url',100).nullable(false);
    })

    
    database.destroy()
}

operations()*/


class ContendorMariadb{
    constructor(tableName){
        this.database = knex(options)
        this.table = tableName
    }

    async getById(id){
        const result = await this.database("productos").select("*").where('id','=',id);
        return result
    }

    async getAll(){
        const result = await this.database("productos").select("*");
        const products = result.map(elm=>({...elm}));
        return products
    }

    async deleteById(id){
        this.database.from('productos').where('id','=',id).del()
            .then(()=>console.log("producto eliminado"))
            .catch(err=>console.log(err))
            .finally(()=>this.database.destroy());
    }

    async deleteAll(){
        this.database.from('productos').del()
            .then(()=>console.log("productos eliminados"))
            .catch(err=>console.log(err))
            .finally(()=>this.database.destroy());
    }

    async save(obj){
        this.database('productos').insert(obj)
            .then(()=>{
                console.log("producto agregado")
            })
            .catch(err=>console.log(err))
            .finally(()=>this.database.destroy());
    }

    async putById(id, body){
        await this.database.from("productos").where('id',id).update({
            timestamp: body.timestamp,
            stock: body.stock,
            nombre: body.nombre,
            price: body.price,
            url: body.url
        });
        return this.getById(id)
    }
}

export default ContendorMariadb

