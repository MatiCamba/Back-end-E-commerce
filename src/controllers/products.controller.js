import { productsDao } from "../dao/managers/index.js";

export class ProductsController {
    static getProducts = async (req, res) => {
        try {
            const result = await productsDao.getProducts();
            if (req.query.limit) {
                result = result.slice(0, req.query.limit);
                return res.send(result);
            } else {
                res.send(result);
            }
        } catch (error) {
            res.send(error.message);
        }
    };

    static getProductById = async (req, res) => {
        try {
            const result = await productsDao.getProductById(parseInt(req.params.pid));
            res.send(result);
        } catch (error) {
            res.send(error.message);
        }
    };

    static addProduct = async (req, res) => {
        try {
            const result = await productsDao.addProduct(req.body);
            res.json({ status: "OK", data: result });
        } catch (error) {
            res.send(error.message);
        }
    };

    static updateProduct = async (req, res) => {
        try {
            let pid = req.params.pid;
            let product = req.body;
            let result = await productsDao.updateProduct(pid, product);
            if (result) {
                result.id = pid;
                res.json({ status: 'success', data: result });
                } else {
                res.status(404).json({ error: 'El producto no existe' });
            };
        } catch (error) {
            res.json({ status: 'error', message: error.message });
        }
    };

    static deleteProduct = async (req, res) => {
        try {
            const deletedProduct = await productsDao.deleteProduct(req.params.pid);
            if (deletedProduct !== null) {
            res.json({ status: "OK", data: deletedProduct });
            } else {
            res.status(404).json({ error: "El producto no existe" });
            };
        } catch (error) {
            res.json({ status: 'error', message: error.message });
        }
    };
};