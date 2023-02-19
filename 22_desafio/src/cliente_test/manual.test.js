import axios from 'axios'

const URLBACK = 'http://localhost:8080/api'

// pide productos
const getProd = async()=>{
    try {
        const response = await axios.get(`${URLBACK}/productos`)
        console.log(response)
    } catch (error) {
        console.log(error);
    }
}
const getProdById = async(id)=>{
    try {
        const response = await axios.get(`${URLBACK}/productos/${id}`)
        console.log(response)
    } catch (error) {
        console.log(error);
    }
}
const saveProd = async(body)=>{
    try {
        const response = await axios.post(`${URLBACK}/productos`,body)
        console.log(response)
    } catch (error) {
        console.log(error);
    }
}
const deleteById = async(id)=>{
    try {
        const response = await axios.delete(`${URLBACK}/productos/${id}`)
        console.log(response)
    } catch (error) {
        console.log(error);
    }
}
const updateProd = async(id,body)=>{
    try {
        const response = await axios.put(`${URLBACK}/productos/${id}`,body)
        console.log(response)
    } catch (error) {
        console.log(error);
    }
}

getProd()
getProdById('6378d9b7b2c76273aad00c76')
saveProd({
    "nombre": "chaleco",
        "precio": 100,
        "stock": 120,
        "url": "https://media.istockphoto.com/photos/horizontal-cropped-image-of-stylish-slim-woman-in-beautiful-yellow-picture-id1089326536?k=20&m=1089326536&s=612x612&w=0&h=rZErz9LROdSBkSC4789ejCS-VSfl5XwwiQIj3dHnI8U="
})
deleteById('63f0fb1918980993f4833c42')
updateProd('6378d9b7b2c76273aad00c76',{
    "_id": "6378d9b7b2c76273aad00c76",
    "nombre": "remera",
    "precio": 100000000,
    "stock": 120,
    "url": "https://media.istockphoto.com/photos/horizontal-cropped-image-of-stylish-slim-woman-in-beautiful-yellow-picture-id1089326536?k=20&m=1089326536&s=612x612&w=0&h=rZErz9LROdSBkSC4789ejCS-VSfl5XwwiQIj3dHnI8U=",
    "__v": 0
})