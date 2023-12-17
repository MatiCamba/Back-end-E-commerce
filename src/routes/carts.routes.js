import { Router } from 'express';
import { CartsControllers } from '../controllers/carts.controller.js';
import { TicketsController } from "../controllers/tickets.controller.js";

const router = Router();

router.get("/", CartsControllers.getCarts);

router.get("/:cid", CartsControllers.getCartById);

router.post("/", CartsControllers.addCart);

router.post("/:cid/product/:pid", CartsControllers.addProductToCart);

router.put("/:cid", CartsControllers.updateCart);

router.delete("/:cid/product/:pid", CartsControllers.deleteProductFromCart);

router.delete("/:cid", CartsControllers.deleteCart);

router.post("/:cid/purchase", TicketsController.createTicket );

export { router as cartsRoute };


