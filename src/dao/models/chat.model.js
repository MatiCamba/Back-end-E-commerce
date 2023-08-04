import mongoose from "mongoose";

// creamos la coleccion
const chatCollection = "chatMessages";

// creamos el esquema
const chatSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

export const chatModel = mongoose.model(chatCollection, chatSchema);