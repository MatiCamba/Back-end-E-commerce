import { productsDao } from "../dao/managers/index.js";

export class ProductsService {
    static getProducts = async () => {
        return await productsDao.getProducts();
    }

    static getProduct = async (pid) => {
        return await productsDao.getProduct(pid);
    }

    static getProductById = async (pid) => {
        return await productsDao.getProductById(pid);
    }

    static getProductsByIds = async (pids) => {
        return await productsDao.getProductsByIds(pids);
    }

    static addProduct = async (product) => {
        return await productsDao.addProduct(product);
    }

    static createProduct = async (product) => {
        return await productsDao.createProduct(product);
    }

    static updateProduct = async (pid, product) => {
        return await productsDao.updateProduct(pid, product);
    }

    static deleteProduct = async (pid) => {
        return await productsDao.deleteProduct(pid);
    }
    
};

