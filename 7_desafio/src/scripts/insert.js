import { options } from "../../options/optionsSqlite";
import knex from "knex";

const database = knex(options)

const articulos = [
    {nombre:"libro", codigo:"728xd", precio:103.27,stock:3},
    {nombre:"libreta", codigo:"32000", precio:45.27,stock:12},
    {nombre:"esfero", codigo:"5485", precio:2.5,stock:15},
    {nombre:"escuadra", codigo:"88892", precio:5.17,stock:5},
    {nombre:"borrador", codigo:"8721", precio:1.27,stock:10},
];

database('productos').insert(articulos)
    .then(()=>console.log('producto agregado'))
    .catch((err)=>console.log(err))
    .finally(()=>{
        database.destroy()
    })