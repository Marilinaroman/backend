import mongoose, {  mongo } from 'mongoose'

class MongoContainer{
        constructor(dataCollection, dataSchema){
            this.model = mongoose.model(dataCollection, dataSchema)
        }

    async getById(id){
        try {
            const object = await this.model.findById(id);
            if(!object){
                return {message:`Error al buscar: no se encontró el id ${id}`, error:true};
            } else {
                return object;
            }
        } catch (error) {
            return {message:`Hubo un error ${error}`, error:true};
        }
    }

    async getAll(){
        try {
            const objects = await this.model.find();
            return objects
        } catch (error) {
            return console.log(error);;
        }
    }

    async save(body){
        try {
            const object = await this.model.create(body);
            return object
        } catch (error) {
            return {message:`Error al guardar: ${error}`};
        }
    }

    async updateById(body, id){
        try {
            await this.model.findByIdAndUpdate(id, body,{new:true});
            return {message:"Update successfully"}
        } catch (error) {
            return {message:`Error al actualizar: no se encontró el id ${id}`};
        }
    }

    async deleteById(id){
        try {
            await this.model.findByIdAndDelete(id);
            return {message:"delete successfully"};
        } catch (error) {
            return {message:`Error al borrar: no se encontró el id ${id}`};
        }
    }

    async deleteAll(){
        try {
            await this.model.delete({});
            return {message:"delete successfully"}
        } catch (error) {
            return {message:`Error al borrar todo: ${error}`};
        }
    }

    async findOne(datos){
        try{
            const user = await this.model(
                {username: datos.username})
            return user
        }catch(err){
            console.log(err);
        }

    }
}

export {MongoContainer}