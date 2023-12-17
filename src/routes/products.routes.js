import { Router } from "express"
import { ProductsController } from "../controllers/products.controller.js";
import { checkRole, checkAuthenticated } from "../middlewares/auth.js";

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

router.post("/", checkAuthenticated, checkRole(["admin", "Premium"]), validateFields, ProductsController.addProduct);

router.put("/:pid", checkAuthenticated, checkRole(["admin", "Premium"]), validateFields, ProductsController.updateProduct);

router.delete("/:pid", checkAuthenticated, checkRole(["admin", "Premium"]), ProductsController.deleteProduct);


export { router as productsRoute };