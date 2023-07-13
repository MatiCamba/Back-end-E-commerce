import fs from 'fs/promises';
import path from 'path';
import { __dirname } from '../utils.js';

class CartManager {
    constructor(filePath) {
        this.path = path.join(__dirname, `/data/${filePath}`);
    }

    // Verifica si el archivo existe
    async fileExist() {
        try {
            await fs.access(this.path);
            return true;
        } catch {
            return false;
        }
    }

    // Obtiene los elementos del carrito según el cartId proporcionado
    async getCartItems(cartId) {
        const cart = await this.getCart();
        const cartItem = cart.find(item => item.cid === parseInt(cartId));

        if (!cartItem) {
            throw new Error('El carrito no existe');
        }

        return cartItem.products;
    }

    // Crea un nuevo carrito
    async createCart() {
        const cart = await this.getCart();

        // Genera un nuevo ID para el carrito
        const newId = Math.floor(Math.random() * 1000000);

        // Verifica si el ID ya existe en el carrito
        const existingCart = cart.find(item => item.cid === newId);
        if (existingCart) {
            return this.createCart(); // Intenta generar un nuevo ID si el actual ya existe
        }

        // Crea el nuevo carrito con la estructura requerida
        const newCart = {
            cid: newId,
            products: []
        };

        cart.push(newCart);
        await this.saveCart(cart);

        return newCart;
    }

    // Inicializa el archivo si no existe
    async init() {
        if (!(await this.fileExist())) {
            await fs.writeFile(this.path, '[]');
        }
    }

    // Obtiene todos los productos del carrito
    async getCart() {
        if (!(await this.fileExist())) {
            return [];
        }

        const data = await fs.readFile(this.path, 'utf8');
        const cart = JSON.parse(data);

        // Asegura que cada elemento del carrito tenga un arreglo "products"
        cart.forEach(item => {
            if (!item.products) {
                item.products = [];
            }
        });

        return cart;
    }

    // Guarda el carrito en el archivo
    async saveCart(cart) {
        await fs.writeFile(this.path, JSON.stringify(cart, null, '\t'));
    }

    // Agrega un producto al carrito
    async addToCart(pid, productId, quantity) {
        const cart = await this.getCart();
        const productIndex = cart.findIndex(item => item.pid === parseInt(pid));

        if (productIndex === -1) {
            // El carrito no existe, se puede crear uno nuevo
            const newId = cart.length > 0 ? cart[cart.length - 1].pid + 1 : 1;
            const newProduct = {
                pid: newId,
                products: [{ product: productId, quantity }]
            };
            cart.push(newProduct);
        } else {
            // El carrito ya existe, se agrega el producto al arreglo "products"
            const product = cart[productIndex];

            const existingProductIndex = product.products.findIndex(item => item.product === productId);
            if (existingProductIndex === -1) {
                // El producto no existe en el carrito, se agrega como un nuevo objeto
                product.products.push({ product: productId, quantity });
            } else {
                // El producto ya existe en el carrito, se incrementa la cantidad
                product.products[existingProductIndex].quantity += quantity;
            }
        }

        await this.saveCart(cart);
    }
}

export default CartManager;



