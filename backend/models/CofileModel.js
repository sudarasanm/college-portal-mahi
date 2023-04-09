import mongoose from "mongoose"

const { Schema, model } = mongoose

const CofilesSchema = new Schema({
    
    RollNo:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    Co1:{
        type:Number,
        required:true
    },
    Percent1:{
        type:Number,
        required:true
    },
    Co2:{
        type:Number,
        required:true
    },
    Percent2:{
        type:Number,
        required:true
    },
    Co3:{
        type:Number,
        required:true
    },
    Percent3:{
        type:Number,
        required:true
    },
    Co4:{
        type:Number,
        required:true
    },
    Percent4:{
        type:Number,
        required:true
    },
    Co5:{
        type:Number,
        required:true
    },
    Percent5:{
        type:Number,
        required:true
    }
})

export const COAttainment = model('COAttainment', CofilesSchema)