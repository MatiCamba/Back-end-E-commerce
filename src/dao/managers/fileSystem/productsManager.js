import fs from 'fs/promises';
import path from 'path';
import { __dirname } from '../../../utils.js';

export class ProductManager {
    constructor(filePath) {
        this.path = path.join(__dirname, `/data/${filePath}`);
    }

    // Verifica si el archivo existe
    async fileExist() {
        try {
            await fs.access(this.path);
            return true;
        } catch {
            return false;
        }
    }

    // Valida que todos los campos del producto estén completos
    async validateProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.log("Todos los campos son obligatorios");
        }

        const products = await this.getProducts();
        if (products.some((p) => p.code === product.code && p.id !== product.id)) {
            console.log(`El producto con el código ${product.code} ya existe`);
        }
    }

    // Agrega un producto al archivo
    async addProduct(product) {
        await this.validateProduct(product);
        const products = await this.getProducts();

        const newId = products.length > 0 ? products[products.length - 1].pid + 1 : 1;

        const newProduct = {
            pid: newId,
            ...product
        };

        products.push(newProduct);
        await fs.writeFile(this.path, JSON.stringify(products, null, '\t'));
        return newProduct;
    }

    // Inicializa el archivo si no existe
    async init() {
        if (!(await this.fileExist())) {
            await fs.writeFile(this.path, '[]');
        }
        const products = await this.getProducts();
        const lastProduct = products[products.length - 1];
        const newId = lastProduct ? lastProduct.pid + 1 : 1;
    }

    // Obtiene todos los productos del archivo
    async getProducts() {
        if (!(await this.fileExist())) {
            return [];
        }
        const data = await fs.readFile(this.path, 'utf8');
        return JSON.parse(data);
    }

    // Obtiene un producto por su ID
    async getProductById(pid) {
        const products = await this.getProducts();
        return products.find(product => product.pid === pid);
    }

    // Actualiza un producto existente
    async updateProduct(pid, updatedProduct) {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.pid === product.pid);
        if (index === -1) {
            return null;
        }
        products[index] = { ...products[index], ...updatedProduct, pid };
        await fs.writeFile(this.path, JSON.stringify(products));
        return products[index];
    }

    // Elimina un producto existente
    async deleteProduct(pid) {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.pid === parseInt(pid));
        if (index === -1) {
            return null;
        }
        const deleted = products.splice(index, 1)[0];
        await fs.writeFile(this.path, JSON.stringify(products));
        return deleted;
    }
};

