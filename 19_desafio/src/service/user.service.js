import {UserManager} from "../dbOperations/index.js"



export const getUsers = async ()=>{
    return await UserManager.getAll();
}

export const saveUser = async(body)=>{
    return await UserManager.save(body)
}


export const findUser = async(body)=>{
    return await UserManager.findOne(body)
}
