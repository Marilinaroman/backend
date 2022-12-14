const fs = require("fs");

class Contenedor {
    constructor (data){
        this.data = data
        this.object = this.readData(this.data)  || [];
    }
    
    async getById(id){
        try {
            this.object = await this.getAll()
            const obj = this.object.filter((e)=> e.id === Number(id))
            return obj? obj : null
        } catch(err){
            console.log(err);
        }
    }

    async getAll(){
        try{
            const data = await this.readData(this.data)
            return data
        } catch(err){
            console.log(err);
        }
    }

    async deleteById(id){
        try{
            const data = await this.getAll()
            this.object = data.filter((e)=> e.id !== Number(id))
            this.reWriteData(this.object)
        }catch (err){
            console.log(err);
        }
    }

    async deleteAll(){
        try{
            this.object = []
            this.reWriteData(this.object)
        } catch(err){
            console.log(err);
        }
    }

    async save(obj){
        try{
            const data = await this.getAll()
            const newId = data.at(-1)
            const newData = {...obj, id:(newId["id"] + 1)}
            data.push(newData)
            this.reWriteData(data)
            return newData["id"]
        } catch(err){
            console.log(err);
        }

    }

    async putById(id, body){
        try {
            const data = await this.getAll();
            const prod = data.findIndex(elm=>elm.id === id);
            data[prod] = {
                id:id,
                ...body
            };
            await fs.promises.writeFile(this.data, JSON.stringify(data, null, 2))
            return data;
        } catch (error) {
            console.log(error)
        }
    }
    
    readData(path){
        const obj = JSON.parse(fs.readFileSync(path,'utf-8'))
        return obj
    }
    reWriteData(object){
        fs.writeFileSync(this.data,JSON.stringify(object,null,2))
    }
}

module.exports = Contenedor