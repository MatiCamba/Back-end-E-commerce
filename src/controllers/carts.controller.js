import { CartsService } from '../services/Carts.Service.js';
import { ProductsService } from '../services/products.service.js';

export class CartsControllers {
    static getCarts = async (req, res) => {
        try {
            const carrito = await CartsService.getCarts();
            res.json({ carrito });
        } catch (error) {
            res.status(500).send({ status: 'error', message: error.message });
        }
    };

    static getCartById = async (req, res) => {
        try {
            const { cid } = req.params;
            const cart = await CartsService.getCartById(cid);
            res.json({ status: 'success', cart });
        } catch (error) {
            res.status(500).send({ status: 'error', message: error.message });
        }
    };

    static addCart = async (req, res) => {
        try {
            const { products } = req.body;
            //console.log(products);
            if (!Array.isArray(products)) {
                return res.status(400).send({ error: "El campo products debe ser un array" });
            }
            const validProducts = [];
    
            for (const product of products) {
                const checkId = await ProductsService.getProductById(product._id);
    
                if (!checkId) {
                    return res.status(404).send({ error: `El producto ${product._id} no existe` });
                }
                validProducts.push(checkId);
            }
    
            const newCart = await CartsService.addCart(validProducts);
            res.status(201).send(newCart);
        } catch (error) {
            res.status(500).send(error);
        }
    };

    static addProductToCart = async (req, res) => {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        try {
            const validProduct = await ProductsService.getProductById(pid);

            if(!validProduct){
                return res.status(404).send({error: `El producto ${pid} no existe`});
            }

            const cart = await CartsService.addProductToCart(cid, pid, quantity);
            console.log(cart);
            return res.status(201).send({message: "Producto agregado al carrito", cart});
        } catch (error) {
            console.log(error);
            return res.status(500).send({message: error.message});
        }
    };

    static updateCart = async (req, res) => {
        const { cid } = req.params;
        const { products } = req.body;
        try {
            for( const product of products){
                const checkId = await ProductsService.getProductById(product.id);

            if(!checkId){
                return res.status(404).send({error: `El producto ${product.id} no existe`});
                }
            }

            const updatedCart = await CartsService.updateCart(cid, products);
            return res.status(201).send({ status: 'success', message: "Carrito actualizado", payload: updatedCart });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ status: 'error', message: error.message });
        }
    };

    static deleteProductFromCart = async (req, res) => {
        const { cid, pid } = req.params;
        try {
            const checkIdProduct= await ProductsService.getProductById(pid);
            if(!checkIdProduct){
                return res.status(404).send({error: `El producto ${pid} no existe`});
            }

            const findProduct = checkIdProduct.products.findIndex((product) => product._id.toString() === pid);
            if(findProduct === -1){
                return res.status(404).send({error: `El producto ${pid} no existe`});
            }

            checkIdProduct.products.splice(findProduct, 1);

            const updatedCart = await CartsService.updateOneProduct(cid, checkIdProduct.products);

            return res.status(201).send({ status: 'success', message: "Producto eliminado", cart: updatedCart });
        } catch (error) {
            return res.status(500).send({ status: 'error', message: error.message });
        }
    };

    static deleteCart = async (req, res) => {
        try {
            const { cid } = req.params;
            const cart = await CartsService.getCartById(cid);
    
            if(!cart){
                return res.status(404).send({error: `El carrito ${cid} no existe`});
            }
    
            if(cart.products.length === 0){
                return res.status(404).send({error: `El carrito ${cid} no tiene productos`});
            }
    
            cart.products = [];
    
            await CartsService.updateCart(cid, cart.products);
            return res.status(201).send({ status: 'success', message: "Carrito eliminado", cart: cart });
    
        } catch (error) {
            console.log(error);
            return res.status(500).send({ status: 'error', message: error.message });
        }
    };

}; 