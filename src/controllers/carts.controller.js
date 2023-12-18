import { CartsService } from '../services/Carts.Service.js';
import { ProductsService } from '../services/products.service.js';

export class CartsControllers {
    // Obtener todos los carritos
    static getCarts = async (req, res) => {
        try {
            const carrito = await CartsService.getCarts();
            res.render('cart', { carrito });
        } catch (error) {
            res.status(500).send({ status: 'error', message: 'Error interno del servidor' });
        }
    };

    // Obtener un carrito por ID
    static getCartById = async (req, res) => {
        try {
            const { cid } = req.params;
            const cart = await CartsService.getCartById(cid);
            res.json({ status: 'success', cart });
        } catch (error) {
            res.status(500).send({ status: 'error', message: 'Error interno del servidor' });
        }
    };

    // Agregar un carrito
    static addCart = async (req, res) => {
        try {
            const { products } = req.body;
            if (!Array.isArray(products)) {
                return res.status(400).send({ error: "El campo products debe ser un array" });
            }
            const validProducts = await ProductsService.getProductsByIds(products.map(product => product._id));
            const newCart = await CartsService.addCart(validProducts);
            res.status(201).send(newCart);
        } catch (error) {
            res.status(500).send({ status: 'error', message: 'Error interno del servidor' });
        }
    };

    // Agregar un producto a un carrito
    static addProductToCart = async (req, res) => {
        const { cid, pid } = req.params;
        try {
            const validProduct = await ProductsService.getProductById(pid);
            if(!validProduct){
                return res.status(404).send({error: `El producto ${pid} no existe`});
            }
            const cart = await CartsService.addProductToCart(cid, pid);
            return res.status(201).send({message: "Producto agregado al carrito", cart});
        } catch (error) {
            return res.status(500).send({message: 'Error interno del servidor'});
        }
    };

    // Actualizar un carrito
    static updateCart = async (req, res) => {
        const { cid } = req.params;
        const { products } = req.body;
        try {
            const validProducts = await ProductsService.getProductsByIds(products.map(product => product.id));
            const updatedCart = await CartsService.updateCart(cid, validProducts);
            return res.status(201).send({ status: 'success', message: "Carrito actualizado", payload: updatedCart });
        } catch (error) {
            return res.status(500).send({ status: 'error', message: 'Error interno del servidor' });
        }
    };

    // Eliminar un producto de un carrito
    static deleteProductFromCart = async (req, res) => {
        const { cid, pid } = req.params;
        try {
            const cart = await CartsService.getCartById(cid);
            if(!cart){
                return res.status(404).send({error: `El carrito ${cid} no existe`});
            }
            const productIndex = cart.products.findIndex((product) => product._id.toString() === pid);
            if(productIndex === -1){
                return res.status(404).send({error: `El producto ${pid} no existe en el carrito`});
            }
            cart.products.splice(productIndex, 1);
            const updatedCart = await CartsService.updateCart(cid, cart.products);
            return res.status(201).send({ status: 'success', message: "Producto eliminado", cart: updatedCart });
        } catch (error) {
            return res.status(500).send({ status: 'error', message: 'Error interno del servidor' });
        }
    };

    // Eliminar un carrito
    static deleteCart = async (req, res) => {
        try {
            const { cid } = req.params;
            const cart = await CartsService.getCartById(cid);
            if(!cart){
                return res.status(404).send({error: `El carrito ${cid} no existe`});
            }
            await CartsService.deleteCart(cid);
            return res.status(201).send({ status: 'success', message: "Carrito eliminado" });
        } catch (error) {
            return res.status(500).send({ status: 'error', message: 'Error interno del servidor' });
        }
    };
};