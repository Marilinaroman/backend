import {options} from './options/optionsSqlite.js'
import knex from 'knex'

const database = knex(options)

const operationsDb = async() =>{

    const tableExiste = await database.schema.hasTable('productos')

    if(tableExiste){
        await database.schema.dropTable('productos')
    }

    await database.schema.createTable('productos', table=>{
        table.increments("id");
        table.string("nombre",20).nullable(false);
        table.integer('codigo',20).nullable(false);
        table.float('precio',20).nullable(false);
        table.integer('stock',20).nullable(false);
    })

    //insertar articulos
    const articulos = [
        {nombre:"libro", codigo:"728xd", precio:103.27,stock:3},
        {nombre:"libreta", codigo:"32000", precio:45.27,stock:12},
        {nombre:"esfero", codigo:"5485", precio:2.5,stock:15},
        {nombre:"escuadra", codigo:"88892", precio:5.17,stock:5},
        {nombre:"borrador", codigo:"8721", precio:1.27,stock:10},
    ];
    await database('productos').insert(articulos)
    database.destroy()
}

operationsDb()