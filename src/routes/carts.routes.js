import { Router } from 'express';
import CartManager from '../dao/cartManager.js';

const cartService = new CartManager('carts.json');

const router = Router();

// Crea un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const newCart = await cartService.createCart();
        res.json({ status: 'success', data: newCart });
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

// Lista los productos del carrito especificado
router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cartItems = await cartService.getCartItems(cid);
        res.json({ status: 'success', data: cartItems });
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

// Agrega un producto al carrito especificado
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        await cartService.addToCart(cid, pid, quantity);

        res.json({ status: 'success', message: 'Producto agregado al carrito' });
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

export { router as cartsRoute };


