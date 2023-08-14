import mongoose from "mongoose";
import { productsCollection } from "../../constants/index.js";
import mongoosePaginate from "mongoose-paginate-v2";


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

productSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(productsCollection, productSchema);
