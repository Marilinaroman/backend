import {options} from "../options/options.js"
import knex from 'knex'

const database = knex(options)

const operationsDb = async() =>{
    const tableExists = await database.schema.hasTable('mensajes')

    if(tableExists){
        await database.schema.dropTable("mensajes")

    }
    await database.schema.createTable('mensajes', table=>{
        table.increments('id');
        table.string('users',15).nullable(false);
        table.float('date',15).nullable(false);
        table.string('msj',100).nullable(false);
    })

    database.destroy()
}

