import {config} from "../../config/config.js";
import { ProductManager } from "./fileSystem/productsManager.js";
import { CartManager } from "./fileSystem/cartManager.js";
import { ProductsMongo } from "./mongo/productsMongo.js";
import { CartMongo } from "./mongo/cartMongo.js";
import { connectDB } from '../../config/dbConnection.js';

//Persistencia de Archivos
//const productsService = new ProductManager(config.fileSystem.prdoductsFile);
//const cartService = new CartManager(config.fileSystem.cartsFile);

//Persistencia de Mongo
const productsService = new ProductsMongo();
const cartService = new CartMongo();
connectDB();


export {productsService, cartService};