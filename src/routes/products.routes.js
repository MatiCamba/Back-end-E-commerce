import { Router } from "express"
import { productsService } from "../dao/managers/index.js";



const validateFields = (req, res, next) => {
    const { title, description, price, code, thumbnail, stock, category } = req.body;
    if (!title || !description || !price || !code || !thumbnail || !stock || !category) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }
    next();
};

const router = Router();

router.get("/", async (req, res) => {
    try {
        let limit = parseInt(req.query.limit);
        let result = await productsService.getProducts();
        if (limit) {
            result = result.slice(0, limit);
            return res.send(result);
        } else {
            res.send(result);
        }
    } catch (error) {
        res.send(error.message);
    }
});


router.get("/:pid", async (req, res) => {
    try {
        const result = await productsService.getProductById(parseInt(req.params.pid));
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
});

router.post("/", validateFields, async (req, res) => {
    try {
        const newProduct = await productsService.addProduct(req.body);
        res.json({ status: "OK", data: newProduct });
    } catch (error) {
        res.send(error.message);
    }
});


router.put("/:pid", validateFields, async (req, res) => {
    try {
        let pid = req.params.pid;
        let product = req.body;
        let result = await productsService.updateProduct(pid, product);
        if (result) {
            result.id = pid;
            res.json({ status: 'success', data: result });
            } else {
            res.status(404).json({ error: 'El producto no existe' });
        };
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});


router.delete("/:pid", async (req, res) => {
    const deletedProduct = await productsService.deleteProduct(req.params.pid);
    if (deletedProduct !== null) {
        res.json({ status: "OK", data: deletedProduct });
    } else {
        res.status(404).json({ error: "El producto no existe" });
    }
});




export { router as productsRoute };