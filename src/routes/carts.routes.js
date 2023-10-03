import { Router } from 'express';
import { CartsControllers } from '../controllers/carts.controller.js';

const router = Router();

router.get("/", CartsControllers.getCarts);

router.get("/:cid", CartsControllers.getCartById);

router.post("/", CartsControllers.addCart);

router.post("/:cid/product/:pid", CartsControllers.addProductToCart);

router.put("/:cid", CartsControllers.updateCart);

router.delete("/:cid/product/:pid", CartsControllers.deleteProductFromCart);

router.delete("/:cid", CartsControllers.deleteCart);

export { router as cartsRoute };


