import {options} from './options/optionsSqlite.js'
import knex from 'knex'

const database = knex(options)

const operationsDb = async() =>{

    const tableExiste = await database.schema.hasTable('mensajes')

    if(tableExiste){
        await database.schema.dropTable('mensajes')
    }

    await database.schema.createTable('mensajes', table=>{
        table.increments("id");
        table.string("emailUsers",20).nullable(false);
        table.string('date',20).nullable(false);
        table.string('msj',100).nullable(false);
    })

    database.destroy()
}

operationsDb()