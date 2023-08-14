import { Router } from 'express';
import { cartService, productsService } from '../dao/managers/index.js';

const router = Router();

router.get("/", async (req, res) => {
    const carrito = await cartService.getCarts();
    res.json({ carrito });
});

router.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    const cartItems = await cartService.getCartById(cid);
    res.json({ status: 'success', cartItems });
});

router.post("/", async (req, res) => {
    try {
        const { products } = req.body;
        console.log(products);

        if (!Array.isArray(products)) {
            return res.status(400).send({ error: "El campo products debe ser un array" });
        }
        const validProducts = [];

        for (const product of products) {
            const checkId = await productsService.getProductById(product._id);

            if (!checkId) {
                return res.status(404).send({ error: `El producto ${product._id} no existe` });
            }
            validProducts.push(checkId);
        }

        const newCart = await cartService.addCart(validProducts);
        res.status(201).send(newCart);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/:cid/product/:pid", async (req, res) => {

    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const validProduct = await productsService.getProductById(pid);

        if(!validProduct){
            return res.status(404).send({error: `El producto ${pid} no existe`});
        }

        const cart = await cartService.addProductToCart(cid, {_id: pid, quantity});
        console.log(cart);
        return res.status(201).send({message: "Producto agregado al carrito", cart});
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: error.message});
    }
});

router.put("/:cid", async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
    try {
        for( const product of products){
            const checkId = await productsService.getProductById(product.id);

            if(!checkId){
                return res.status(404).send({error: `El producto ${product.id} no existe`});
            }
        }

        const updatedCart = await cartService.updateCart(cid, products);
        return res.status(201).send({ status: 'success', message: "Carrito actualizado", payload: updatedCart });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: 'error', message: error.message });
    }
});

router.delete("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const checkIdProduct= await productsService.getProductById(pid);
        if(!checkIdProduct){
            return res.status(404).send({error: `El producto ${pid} no existe`});
        }

        const findProduct = checkIdProduct.products.findIndex((product) => product._id.toString() === pid);
        if(findProduct === -1){
            return res.status(404).send({error: `El producto ${pid} no existe`});
        }

        checkIdProduct.products.splice(findProduct, 1);

        const updatedCart = await cartService.updateCart(cid, checkIdProduct.products);

        return res.status(201).send({ status: 'success', message: "Producto eliminado", cart: updatedCart });
    } catch (error) {
        return res.status(500).send({ status: 'error', message: error.message });
    }
});

router.delete("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartService.getCartById(cid);

        if(!cart){
            return res.status(404).send({error: `El carrito ${cid} no existe`});
        }

        if(cart.products.length === 0){
            return res.status(404).send({error: `El carrito ${cid} no tiene productos`});
        }

        cart.products = [];

        await cartService.updateOneProduct(cid, cart.products);
        return res.status(201).send({ status: 'success', message: "Carrito eliminado", cart: cart });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: 'error', message: error.message });
    }
});

/* ----------------------------------------------- */

/* // Crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const newCart = await cartService.addCart();
        res.json({ status: 'success', data: newCart });
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

// Obtener los productos del carrito especificado
router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cartItems = await cartService.getCartItems(cid);
        res.json({ status: 'success', data: cartItems });
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

// Agregar un producto al carrito especificado
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        await cartService.addProductToCart(cid, pid, quantity);

        res.json({ status: 'success', message: 'Producto agregado al carrito' });
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
}); */

export { router as cartsRoute };


