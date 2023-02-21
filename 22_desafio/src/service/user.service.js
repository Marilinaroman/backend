import {ContenedorDaoUser} from "../daos/index.js"


export const getUsers = async ()=>{
    return await ContenedorDaoUser.getAll();
}

export const createUser = async(body)=>{
    return await ContenedorDaoUser.save(body)
}


export const findUser = async(username)=>{
    return await ContenedorDaoUser.findOne(username)
}
