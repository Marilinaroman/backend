import {UserManager} from "../dbOperations/index.js"


export const getUsers = async ()=>{
    return await UserManager.getAll();
}

export const createUser = async(body)=>{
    return await UserManager.save(body)
}


export const findUser = async(username)=>{
    return await UserManager.findOne(username)
}
