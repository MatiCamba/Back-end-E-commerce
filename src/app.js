import express from 'express';
import { productsRoute } from './routes/products.routes.js';
import { cartsRoute } from './routes/carts.routes.js';
import { viewRouter } from './routes/view.routes.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import { __dirname } from './utils.js';
import path from 'path';
import ProductManager from './dao/productsManager.js';

const puerto = 8080;

// Crea una aplicación Express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sirve archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configura Handlebars como el motor de vistas
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));

// Inicia el servidor HTTP
const servidorHttp = app.listen(puerto, () => {
    console.log(`Aplicación de ejemplo escuchando en el puerto ${puerto}`);
});

// Crea un servidor Socket.IO
const servidorSocket = new Server(servidorHttp);

// Crea una instancia de ProductManager
const administradorProductosSocket = new ProductManager('products.json');

// Maneja las conexiones de sockets
servidorSocket.on("connection", async (socket) => {
    console.log(`Cliente con ID: ${socket.id} conectado`);

    // Envía la lista de productos al cliente
    const listaProductos = await administradorProductosSocket.getProducts();
    socket.emit("sendProducts", listaProductos);

    // Maneja el evento 'addProduct'
    socket.on("addProduct", async (producto) => {
        await administradorProductosSocket.addProduct(producto);
        socket.emit("sendProducts", await administradorProductosSocket.getProducts());
    });

    // Maneja el evento 'deleteProduct'
    socket.on("deleteProduct", async (pid) => {
        await administradorProductosSocket.deleteProduct(pid);
        socket.emit("sendProducts", await administradorProductosSocket.getProducts());
    });
});

// Rutas
app.use("/api/productos", productsRoute);
app.use("/api/carritos", cartsRoute);
app.use("/", viewRouter);




