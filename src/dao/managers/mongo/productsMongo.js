import mongoose from "mongoose";
import { productsModel } from "../../models/products.model.js";

export class ProductsMongo {
    constructor() {
        this.model = productsModel;
    };

    // obtener todos los productos
    async getProducts() {
        try {
            return await this.model.find().lean();
        } catch (error) {
            throw new Error("Hubo un error al obtener los productos", error.message);
        }
    };

    // obtener un producto por su ID
    async getProductById(id) {
        try {
            return await this.model.findById(id);
        }
        catch (error) {
            throw new Error("Hubo un error al obtener el producto", error.message);
        }
    };

    // agregar un producto
    async addProduct(product) {
        try {
            const productCreated = await this.model.create(product);
            console.log(productCreated);
            return productCreated;
        } catch (error) {
            console.log(error);
        }
    };

    // actualizar un producto
    async updateProduct(id, product) {
        try {
            return await this.model.findByIdAndUpdate(id, { $set: product});
        }
        catch (error) {
            throw new Error("Hubo un error al actualizar el producto", error.message);
        }
    };

    // eliminar un producto
    async deleteProduct(id) {
        try {
            return await this.model.findByIdAndDelete(id);
        }
        catch (error) {
            console.log(error);
        }
    };

};
