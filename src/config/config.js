import dotenv from "dotenv";
dotenv.config();


export const config = {
    server : {
        port: process.env.PORT || 8080,
        secretSession: process.env.SECRET_SESSION,
    },
    fileSystem: {
        prdoductsFile: 'products.json',
        cartsFile: 'carts.json',
    },
    mongo: {
        url: process.env.MONGO_URL,
    },
    gmail:{
        account:process.env.GMAIL_SALES,
        password:process.env.GMAIL_SALES_PASSWORD,
        secretToken:process.env.SECRET_TOKEN_EMAIL
    }
};