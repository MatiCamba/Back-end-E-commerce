import { Router } from "express";
import { ProductsMongo } from "../dao/managers/mongo/productsMongo.js";

import { checkUserAuth, showLoginView } from "../middlewares/auth.js";

import { ViewsController } from "../controllers/views.controller.js";

const router = Router();

router.get("/", ViewsController.renderHome);

router.get("/realTime", ViewsController.renderRealTimeProducts);

router.get("/login", showLoginView , ViewsController.renderLogin);

router.get("/signup", showLoginView, ViewsController.renderRegister);

router.get("/cart", ViewsController.renderCart);

router.get("/perfil", checkUserAuth, ViewsController.renderProfile);

//router.get("/products", ViewsController.renderProducts);

export { router as viewRouter };
