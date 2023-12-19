import { TicketsService } from "../services/tickets.service.js";
import { CartsService } from '../services/Carts.Service.js';
import { ProductsService } from "../services/products.service.js";

export class TicketsController{
    static async createTicket(req,res){
        try {
            const cartId = req.params.cid;
            if (!cartId) {
                return res.status(400).json({error: "Se requiere el ID del carrito."});
            }

            const cart = await CartsService.getCart(cartId);
            if (!cart) {
                return res.status(404).json({error: "Carrito no encontrado."});
            }

            const productsCart = cart.products;
            let purchaseProducts=[];
            let rejectedProducts=[];
            let totalAmount = 0;

            for(let i=0;i<productsCart.length;i++){
                const product = await ProductsService.getProduct(productsCart[i].productId);
                if (!product) {
                    rejectedProducts.push(productsCart[i].productId);
                    continue;
                }

                if(productsCart[i].quantity <= product.stock){
                    product.stock -= productsCart[i].quantity;
                    await ProductsService.updateProduct(product._id, product);
                    purchaseProducts.push(product);
                    totalAmount += product.price * productsCart[i].quantity;
                } else {
                    rejectedProducts.push(product._id);
                }
            }

            const newTicket = {
                code: Math.floor(Math.random() * 10000000),
                purchase_datetime:new Date(),
                amount: totalAmount,
                purchaser:req.user.email,
                products: purchaseProducts
            }

            const ticketCreated = await TicketsService.createTicket(newTicket);
            res.json({status:"success", data:ticketCreated, rejectedProducts: rejectedProducts});
        } catch (error) {
            console.log(error);
            res.status(500).json({error:error.message});
        }
    }
};