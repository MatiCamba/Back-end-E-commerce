import { Router } from "express";
import { ProductsMongo } from "../dao/managers/mongo/productsMongo.js";

const router = Router();

const productManager = new ProductsMongo();

router.get("/", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("home", { products });
});

router.get("/realTime", (req, res) => {
    res.render("realTimeProducts");
});

export { router as viewRouter };
