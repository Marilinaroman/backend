import {ProductosManager} from "../dbOperations/index.js"

export const getProd = async()=>{
    return await ProductosManager.getAll()
}
export const getProdById = async(id)=>{
    return await ProductosManager.getById(id)
}
export const saveProd = async(body)=>{
    return await ProductosManager.save(body)
}
export const deleteProd = async(id)=>{
    return await ProductosManager.deleteById(id)
}
export const updateProd = async(id, body)=>{
    return await ProductosManager.putById(id, body)
}