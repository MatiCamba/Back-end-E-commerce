import { Router } from "express";
import { ProductsMongo } from "../dao/managers/mongo/productsMongo.js";
import { productsService } from "../dao/managers/index.js";

const router = Router();

const productManager = new ProductsMongo();

router.get("/", async (req, res) => {
    try {
        const {limit=10, page=1, stock, sort="asc"} = req.query;
        const stockValue = stock === 0 ? undefined : parseInt(stock);
        if(!["asc","desc"].includes(sort)) {
            return res.render("home", { products: products }, {error: "El campo sort debe ser asc o desc"});
        };
        const sortValue = sort === "asc" ? 1 : -1;
        let query = {};
        if(stockValue){
            query = {stock: {$gte:stockValue}};
        }
        const result = await productManager.getProductsByPage(query, {page, limit, sort:{price:sortValue}, lean:true });
        //console.log(result);

        const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`
        const resultProductsView = {
            status:"success",
            payload: result.docs,
            totalPages: result.totalPages,
            page: result.page,
            prevPage: result.prevPage,
            hasPrevPage: result.hasPrevPage,
            prevLink: result.hasPrevPage ? baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`) : null,
            nextPage: result.nextPage,
            hasNextPage: result.hasNextPage,
            nextLink: result.hasNextPage ? baseUrl.includes("page") ? baseUrl.replace(`page=${result.page}`, `page=${result.nextPage}`) : baseUrl.includes("?") ? baseUrl.concat(`&page=${result.nextPage}`) : baseUrl.concat(`?page=${result.nextPage}`) : null
        }
        console.log(resultProductsView);

        res.render("home", resultProductsView );
    } catch (error) {
        const products = await productManager.getProducts();
        res.render("home", { products });
    }
});

router.get("/realTime", (req, res) => {
    res.render("realTimeProducts");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/cart", (req, res) => {
    res.render("cart");
});

export { router as viewRouter };