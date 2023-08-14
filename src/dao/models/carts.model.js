import mongoose from "mongoose";
import { cartCollection } from "../../constants/index.js";


// Creamos el esquema
const cartSchema = new mongoose.Schema({
    products: {
        type:[
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,

                    ref: 'products',
                },
                quantity: {
                    type: Number,
                    default: 1,
                }
            }
        ],
        default: []
    }
});
// middleware de la coleccion
cartSchema.pre('find', function (next) {
    this.populate('products._id');
    next();
});

export const cartModel = mongoose.model(cartCollection, cartSchema);