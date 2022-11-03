import {options} from './options/optionSqlite.js'
import knex from 'knex'

const database = knex(options)

const operationsDb = async() =>{

    const tableExiste = await database.schema.hasTable('mensajes')

        if(tableExiste){
        await database.schema.dropTable('mensajes')
    }

    await database.schema.createTable('mensajes', table=>{
        table.increments("id");
        table.string("email",20).nullable(false);
        table.string('time',20).nullable(false);
        table.string('mensaje',100).nullable(false);
    })

    
    database.destroy()
}

operationsDb()