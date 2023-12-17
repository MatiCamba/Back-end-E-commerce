import { cartDao, productsDao } from '../dao/managers/index.js';

export class CartsService {

  static getCarts = async () => {
    const carts = await cartDao.getCarts();
    return carts;
  }

  static getCartById = async (cid) => {
    const cart = await cartDao.getCartById(cid);
    return cart;
  }

  static addCart = async () => {
    const newCart = await cartDao.addCart( );
    return newCart;
  }

  static addProductToCart = async (cid, pid) => {
    const product = await productsDao.getProductById(pid);
    const cart = await cartDao.getCartById(cid);
    cart.products.push(product);
    await cartDao.updateCart(cid, cart);
    return cart;
  }

  static updateCart = async (cid, cart) => {
    const updatedCart = await cartDao.updateCart(cid, cart);
    return updatedCart;
  }

  static deleteProductFromCart = async (cid, pid) => {
    const cart = await cartDao.getCartById(cid);
    cart.products = cart.products.filter(product => product._id !== pid);
    await cartDao.updateCart(cid, cart);
    return cart;
  }

  static deleteCart = async (cid) => {
    const deletedCart = await cartDao.deleteCart(cid);
    return deletedCart;
  }
  
};