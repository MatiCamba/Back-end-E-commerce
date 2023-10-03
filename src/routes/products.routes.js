import { Router } from "express"
import { ProductsController } from "../controllers/products.controller.js";

const validateFields = (req, res, next) => {
    const { title, description, price, code, thumbnail, stock, category } = req.body;
    if (!title || !description || !price || !code || !thumbnail || !stock || !category) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }
    next();
};

const router = Router();

router.get("/", ProductsController.getProducts);

router.get("/:pid", ProductsController.getProductById);

router.post("/", validateFields, ProductsController.addProduct);

router.put("/:pid", validateFields, ProductsController.updateProduct);

router.delete("/:pid", ProductsController.deleteProduct);


export { router as productsRoute };