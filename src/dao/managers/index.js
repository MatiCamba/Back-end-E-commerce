import {config} from "../../config/config.js";
import { ProductManager } from "./fileSystem/productsManager.js";
import { CartManager } from "./fileSystem/cartManager.js";
import { ProductsMongo } from "./mongo/productsMongo.js";
import { CartMongo } from "./mongo/cartMongo.js";
import { connectDB } from '../../config/dbConnection.js';
import { UsersMongo } from "./mongo/usersMongo.js";

//Persistencia de Archivos
//const productsService = new ProductManager(config.fileSystem.prdoductsFile);
//const cartService = new CartManager(config.fileSystem.cartsFile);

//Persistencia de Mongo
connectDB();
const productsService = new ProductsMongo();
const cartService = new CartMongo();
const usersService = new UsersMongo();


export {productsService, cartService, usersService};