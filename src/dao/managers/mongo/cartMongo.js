import { cartModel } from "../../models/carts.model.js";

export class CartMongo {
    constructor() {
        this.model = cartModel;
    }

    // Obtener todos los carritos
    getCarts = async () => {
        try {
            const carts = await this.model.find().lean();
            return carts;
        } catch (err) {
            console.error('Error al obtener los carritos:', err.message);
            return [];
        }
    };


    // Obtener un carrito por ID
    getCartById = async (cartId) => {
        try {
            const cart = await this.model.findById(cartId)
            return cart;
        } catch (err) {
            console.error('Error al obtener el carrito por ID:', err.message);
            return err;
        }
    };


    // Agregar un carrito
    addCart = async (products) => {
        try {
            let cartData = {};
            if (products && products.length > 0) {
                cartData.products = products;
            }

            const cart = await this.model.create(cartData);
            return cart;
        } catch (err) {
            console.error('Error al crear el carrito:', err.message);
            return err;
        }
    };


    // Agregar un producto a un carrito existente
    addProductInCart = async (cid, obj) => {
        try {
            const filter = { _id: cid, "products._id": obj._id };
            const cart = await this.model.findById(cid);
            const findProduct = cart.products.some((product) => product._id.toString() === obj._id);

            if (findProduct) {
                // Si el producto ya existe en el carrito, se actualiza la cantidad
                const update = { $inc: { "products.$.quantity": obj.quantity } };
                await this.model.updateOne(filter, update);
            } else {
                // Si el producto no existe en el carrito, se agrega
                const update = { $push: { products: { _id: obj._id, quantity: obj.quantity } } };
                await this.model.updateOne({ _id: cid }, update);
            }

            return await this.model.findById(cid);
        } catch (err) {
            console.error('Error al agregar el producto al carrito:', err.message);
            return err;
        }
    };

    // Eliminar un producto de un carrito
    deleteProductInCart = async (cid, products) => {
        try {
            return await this.model.findOneAndUpdate(
                { _id: cid },
                { products },
                { new: true })

        } catch (err) {
            return err
        }

    }

    // Actualizar un producto en un carrito
    updateOneProduct = async (cid, products) => {
        await this.model.updateOne(
            { _id: cid },
            { products })
        return await this.model.findOne({ _id: cid })
    }
}