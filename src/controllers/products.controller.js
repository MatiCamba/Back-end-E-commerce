import { ProductsService } from "../services/products.service.js";

export class ProductsController {
    static getProducts = async (req, res) => {
        try {
            let result = await ProductsService.getProducts();
            if (req.query.limit) {
                result = result.slice(0, req.query.limit);
            }
            res.send(result);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    static getProduct = async(req,res)=>{
        try {
            const result = await ProductsService.getProduct(req.params.pid);
            res.send(result);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    static getProductById = async (req, res) => {
        try {
            const result = await ProductsService.getProductById(req.params.pid);
            res.send(result);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    static createProduct = async(req,res)=>{
        //Agregar el producto
        try {
            const productInfo = req.body;
            productInfo.owner = req.user._id;
            productInfo.thumbnail = req.file.filename;
            const productCreated = await ProductsService.createProduct(productInfo);
            res.json({status:"success", data:productCreated, message:"producto creado"});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };

    static addProduct = async (req, res) => {
        try {
            const result = await ProductsService.addProduct(req.body);
            res.json({ status: "OK", data: result });
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    static updateProduct = async (req, res) => {
        try {
            let pid = req.params.pid;
            let product = req.body;
            let result = await ProductsService.updateProduct(pid, product);
            if (result) {
                result.id = pid;
                res.json({ status: 'success', data: result });
            } else {
                res.status(404).json({ error: 'El producto no existe' });
            }
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    };

    static deleteProduct = async (req, res) => {
        try {
            const deletedProduct = await ProductsService.deleteProduct(req.params.pid);
            if (deletedProduct !== null) {
                res.json({ status: "OK", data: deletedProduct });
            } else {
                res.status(404).json({ error: "El producto no existe" });
            }
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    };
};