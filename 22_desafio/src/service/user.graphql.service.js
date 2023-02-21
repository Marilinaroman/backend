import { ContenedorDaoUser } from "../daos/index.js";

export const root = {
    getUsers : async()=>{
        const data = await ContenedorDaoUser.getAll();
        return data
    },
    getUserById: async({id})=>{
        const data = await ContenedorDaoUser.getById(id);
        return data
    },
    addUser: async({user})=>{
        return await ContenedorDaoUser.save(user)
    },
    deleteUserById: async({id})=>{
        return await ContenedorDaoUser.deleteById(id)
    }
}