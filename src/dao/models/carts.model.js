import mongoose from "mongoose";
import { cartCollection } from "../../constants/index.js";


// Creamos el esquema
const cartSchema = new mongoose.Schema({
    products:{
        type:[//tipo array
            {
                quantity:{
                    type:Number,
                    default:1
                },
                productId:{//cada elemento es de tipo objeto, y contiene el id de un documento que pertenece a la coleccion "products"
                    type:mongoose.Types.ObjectId,
                    ref:"products"
                }
            }
        ],
        default:[]
    }
});
// middleware de la coleccion
cartSchema.pre('find', function (next) {
    this.populate('products.productId');
    next();
});

export const cartModel = mongoose.model(cartCollection, cartSchema);