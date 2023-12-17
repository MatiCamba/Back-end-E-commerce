import { TicketsService } from "../services/tickets.service.js";
import { CartsService } from "../services/carts.service.js";
import { ProductsService } from "../services/products.service.js";

export class TicketsController{
    static async createTicket(req,res){
        try {
            const cartId = req.params.cid;
            const cart = await CartsService.getCart(cartId);
            const productsCart = cart.products;
            let purchaseProducts=[];
            let rejectedProducts=[];
            let totalAmount = 0;
            //iteramos por cada producto del carrito
            for(let i=0;i<productsCart.length;i++){
                const product = await ProductsService.getProduct(productsCart[i].productId);
                if(productsCart[i].quantity <= product.stock){
                    // Actualizamos el stock del producto
                    product.stock -= productsCart[i].quantity;
                    await ProductsService.updateProduct(product._id, product);
                    // Agregamos el producto a purchaseProducts
                    purchaseProducts.push(product);
                    totalAmount += product.price * productsCart[i].quantity;
                } else {
                    // Agregamos el id del producto a rejectedProducts
                    rejectedProducts.push(product._id);
                }
            }

            const newTicket = {
                code: Math.floor(Math.random() * 10000000), // Aquí deberías generar un código para el ticket
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