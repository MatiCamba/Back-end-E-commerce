import { Router } from "express";
import productManager from "../dao/productsManager.js";


const router = Router();

const pManager = new productManager("products.json");
//console.log(pManager);

router.get("/", async (req, res) => {
    const products = await pManager.getProducts();
    //console.log(products);

    res.render("home", { products });
});

router.get("/realTime", (req, res) => {
    res.render("realTimeProducts");
});


export { router as viewRouter };