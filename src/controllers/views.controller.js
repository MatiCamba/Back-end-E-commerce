import { ProductsMongo } from "../dao/managers/mongo/productsMongo.js";

const productManager = new ProductsMongo();

export class ViewsController {
    static renderHome = async (req, res) => {
        try {
            const {limit=10, page=1, stock, sort="asc"} = req.query;
            const stockValue = stock === 0 ? undefined : parseInt(stock);
            if(!["asc","desc"].includes(sort)) {
                return res.render("home", { error: "El campo sort debe ser asc o desc", user: req.session.userInfo });
            };
            const sortValue = sort === "asc" ? 1 : -1;
            let query = {};
            if(stockValue){
                query = {stock: {$gte:stockValue}};
            }
            const result = await productManager.getProductsByPage(query, {page, limit, sort:{price:sortValue}, lean:true });
    
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
    
            res.render("home", {...resultProductsView, user: req.session.userInfo});
        } catch (error) {
            res.render("home", { error: error.message, user: req.session.userInfo });
        }
    };

    static renderRealTimeProducts = async (req, res) => {
        res.render("realTimeProducts", { user: req.session.userInfo });
    };

    static renderLogin = async (req, res) => {
        res.render("login", { user: req.session.userInfo });
    };

    static renderRegister = async (req, res) => {
        res.render("signup", { user: req.session.userInfo });
    };

    static renderCart = async (req, res) => {
        res.render("cart", { user: req.session.userInfo });
    };

    static renderProfile = async (req, res) => {
        res.render("profile", { user: req.session.userInfo });
    };
};