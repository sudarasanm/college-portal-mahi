import mongoose from "mongoose"

const { Schema, model } = mongoose

const ElectiveMetadataSchema = new Schema({
    
    branch: { type: String, required: true },

    regulation: { type: Number, required: true },

    semester: { type: Number, required: true },

    oe: { type: Number, required: true },

    pe: { type: Number, required: true }

}, { collection: "ElectiveMetadata", timestamps: true })


export const ElectiveMetadataModel = model('ElectiveMetadata', ElectiveMetadataSchema)