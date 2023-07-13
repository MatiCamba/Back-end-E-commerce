import express from 'express';
import { productsRoute } from './routes/products.routes.js';
import { cartsRoute } from './routes/carts.routes.js';

const port = 8080;
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

//routes    
app.use("/api/products", productsRoute);
app.use("/api/carts", cartsRoute);

