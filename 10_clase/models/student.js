import mongoose, { mongo } from 'mongoose'

const studentsCollection = "estudiantes"

const studentsSchema = new mongoose.Schema({
    nombre:{
        type:String,
        require:true
    },
    apellido:{
        type:String,
        require:true
    },
    edad:{
        type:Number,
        require:true
    },
    dni:{
        type:String,
        require:true,
        unique:true
    },
    curso:{
        type:String,
        require:true
    },
    nota:{
        type:Number,
        require:true
    }
})

export const studentModel = mongoose.model(studentsCollection,studentsSchema)