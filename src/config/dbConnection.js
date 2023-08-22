import mongoose from "mongoose";
import { config } from "./config.js";

export const connectDB = async () => {
    try {
        await mongoose.connect( config.mongo.url );
        console.log("Base de Datos conectada");
    } catch (error) {
        console.error("Hubo un error al conectar a la Base de Datos",error.message);
    }
}