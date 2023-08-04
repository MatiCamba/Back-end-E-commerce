import mongoose from "mongoose";

export class CartManager {
    // obtener todos los carritos
    async getCarts() {
        try {
            return await cartModel.find().lean();
        } catch (error) {
            throw new Error("Hubo un error al obtener los carritos", error.message);
            return [];
        }
    };

    // obtener un carrito por su ID
    async getCartById(id) {
        try {
            return await cartModel.findById(id);
        }
        catch (error) {
            throw new Error("Hubo un error al obtener el carrito", error.message);
        }
    };

    // agregar un carrito
    async addCart(cart) {
        try {
            let cartData = {};

            if (cart.products.length > 0) {
                cartData = { $set: cart };
            }

            const cartCreated = await cartModel.create(cartData);
            return cartCreated;
        } catch (error) {
            throw new Error("Hubo un error al agregar el carrito", error.message);
        }
    };

    async addProductInCart (cid, obj) {
        try {
            const filter = { _id: cid, "products._id": obj._id };
            const cart = await cartModel.findOne(filter);

            if(!cart) {
                throw new Error("El carrito no existe");
            } else {
                cart.products.push(obj);
                await cart.save();
                return cart;}
            
        } catch (error) {
            throw new Error("Hubo un error al agregar el producto", error.message);
        }
    };

    // Borrar un carrito
    async deleteCart(id) {
        try {
            return await cartModel.findByIdAndDelete(id);
        }
        catch (error) {
            throw new Error("Hubo un error al eliminar el carrito", error.message);
        }
    };

    // actualizar un carrito
    async updateCart(id, cart) {
        try {
            return await cartModel.findByIdAndUpdate(id, { $set: cart});
        }
        catch (error) {
            throw new Error("Hubo un error al actualizar el carrito", error.message);
        }
    };

};
