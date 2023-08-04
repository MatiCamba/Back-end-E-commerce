import mongoose from "mongoose";

// nombre de la coleccion de productos
const productsCollection = "products";

// esquema de productos
const productSchema = new mongoose.Schema({
        title: {
        type: String,
        required: true
        },
        description: {
        type: String,
        required: true
        } ,
        price: {
        type: Number,
        required: true
        } ,
        thumbnail: {
        type: String,
        required: true
        },
        code:  {
        type: String,
        required: true,
        unique: true
        },
        stock:  {
        type: Number,
        required: true
        },
        category: {
        type: String,
        required: true,
        enum: ["Entrenamiento", "Moda", "Accesorios"]
        }
});

export const productsModel = mongoose.model(productsCollection, productSchema);
