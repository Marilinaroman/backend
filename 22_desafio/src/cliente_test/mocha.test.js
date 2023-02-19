import supertest from 'supertest'
import {expect} from 'chai'
import {app} from '../server.js'

const request = supertest(app)

//Pruebas

describe('Prueba en la ruta de productos',()=>{
    let id = '63f13b89471f53c79affc6c9'
    let cantidadDatos = 0

    beforeEach(async()=>{
        const datos = await request.get('/api/productos')
        cantidadDatos = await datos.body.length
        return cantidadDatos
    })

    it('Trae los productos', async()=>{
        const response = await request.get('/api/productos')
        expect(response.status).equal(200)
        expect(response.body.length).to.eql(cantidadDatos);
    });


    it('Trae un producto segun id', async()=>{
        const response = await request.get(`/api/productos/`).send({id:`${id}`})
        expect(response.status).equal(200)
    });

    it('Actualiza un producto segun id', async()=>{
        const response = await request.put(`/api/productos/${id}`).send({
                nombre: "buzo",
                precio: 1003,
                stock: 120,
                url: "https://media.istockphoto.com/photos/horizontal-cropped-image-of-stylish-slim-woman-in-beautiful-yellow-picture-id1089326536?k=20&m=1089326536&s=612x612&w=0&h=rZErz9LROdSBkSC4789ejCS-VSfl5XwwiQIj3dHnI8U="
        })

        expect(response.status).equal(200)

    });


    it('Elimina un producto segun id', async()=>{
        const response = await request.del(`/api/productos/${id}`)
        const productosActualizados = await request.get('/api/productos')
        expect(response.status).equal(200)
        expect(cantidadDatos-1).to.eql(productosActualizados.body.length)
    });

    

    it('Crear un producto', async()=>{
        const response = await request.post(`/api/productos`).send({
            nombre: "remeron",
            precio: 1003,
            stock: 120,
            url: "https://media.istockphoto.com/photos/horizontal-cropped-image-of-stylish-slim-woman-in-beautiful-yellow-picture-id1089326536?k=20&m=1089326536&s=612x612&w=0&h=rZErz9LROdSBkSC4789ejCS-VSfl5XwwiQIj3dHnI8U="
        })
        expect(response.status).equal(200)
        expect(cantidadDatos+1).to.eql(response.body.length)
    })
})