import mongoose from "mongoose";
import { productsModel } from "../../models/products.model.js";
import { query } from "express";

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

    async getProducts(query) {
        try {
            return this.model.find(query);
        } catch (error) {
            throw new Error("Hubo un error al obtener los productos", error.message);
        }
    };

    // obtner x productos por paginacion
    async getProductsByPage(query, options) {
        try {
            return await this.model.paginate(query, options);
        } catch (error) {
            throw new Error("Hubo un error al obtener los productos", error.message);
        }
    }

    // obtener un producto por su ID
    async getProductById(id) {
        try {
            return await this.model.findById(id);
        }
        catch (error) {
            throw new Error("Hubo un error al obtener el producto", error.message);
        }
    };

    // obtener varios productos por sus IDs
    async getProductsByIds(ids) {
        try {
            return await this.model.find({ _id: { $in: ids } });
        }
        catch (error) {
            throw new Error("Hubo un error al obtener los productos", error.message);
        }
    };

    // agregar un producto
    async addProduct(product) {
        try {
            const productCreated = await this.model.create(product);
            return productCreated;
        } catch (error) {
            throw new Error("Hubo un error al agregar el producto", error.message);
        }
    };

    async createProduct(product) {
        try {
            return await this.model.create(product);
        }
        catch (error) {
            throw new Error("Hubo un error al crear el producto", error.message);
        }
    }

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
            throw new Error("Hubo un error al eliminar el producto", error.message);
        }
    };

};