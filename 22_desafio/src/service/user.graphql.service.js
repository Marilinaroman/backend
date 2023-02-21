import {ContenedorDaoUser} from "../daos/index.js"


export const root = {
    getUsers : async()=>{
        return await ContenedorDaoUser.getAll();
    },
    getUserById:({id})=>{
        const userFound = users.find(u=>u.id === id);
        if(!userFound){
            return null
        } else {
            return userFound
        }
    },
    addUser: async({user})=>{
        return await ContenedorDaoUser.save(body)
    }
}