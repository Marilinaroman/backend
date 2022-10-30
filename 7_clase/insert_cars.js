const {options} = require('./options/mysqlconfig.js')
const knex = require('knex')

//creo db
const database = knex(options)

const cars = [
    {name:'audi', price:12000},
    {name:'ford', price:1000},
    {name:'toyota', price:2000},
]
database('cars').insert(cars)
    .then(()=>console.log("insertado"))
    .catch((err)=> console.log(err))
    .finally(()=>{
        knex.destroy()
    })