const {options} = require('./options/mysqlconfig.js')
const knex = require('knex')

//creo db
const database = knex(options)

//crea tabla
database.schema.createTable('cars',table =>{
    table.increments("id")
    table.string("name",20)
    table.integer("price")
}).then(()=>console.log("tabla creada"))
.catch(err=>console.log(err))