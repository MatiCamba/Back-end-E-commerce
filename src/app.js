import express from 'express';
import { config } from './config/config.js';
import { connectDB } from './config/dbConnection.js';
import { engine } from 'express-handlebars';
import path from 'path';
import { __dirname } from './utils.js';
import { Server } from 'socket.io';
import { chatModel } from './dao/models/chat.model.js';

import passport from 'passport';
import session from 'express-session';
import { initializePassport } from './config/passport.config.js';
import MongoStore from 'connect-mongo';

import { productsRoute } from './routes/products.routes.js';
import { cartsRoute } from './routes/carts.routes.js';
import { viewRouter } from './routes/view.routes.js';
import { sessionsRouter } from './routes/sessions.routes.js';
import { ProductsMongo } from './dao/managers/mongo/productsMongo.js';
import { usersRouter } from './routes/users.routes.js';
import { CartMongo } from './dao/managers/mongo/cartMongo.js';

import dotenv from 'dotenv';
dotenv.config();

const puerto = config.server.port;
// Crea una aplicación Express
const app = express(); 

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sirve archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, '/public')));

// Configura Handlebars como el motor de vistas
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/views'));

// Configura la sesión
app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongo.url,
    }),
    secret: config.server.secretSession,
    resave: true,
    saveUninitialized: true,
}));

// configuracion de passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Inicia el servidor HTTP
const servidorHttp = app.listen(puerto, () => {
    console.log(`Aplicación de ejemplo escuchando en el puerto ${puerto}`);
});

// Crea un servidor Socket.IO
const servidorSocket = new Server(servidorHttp);

// Crea una instancia de ProductManager
const administradorProductosSocket = new ProductsMongo();

let messages=[];

// Maneja las conexiones de sockets
servidorSocket.on("connection", async (socket) => {
    console.log(`Cliente con ID: ${socket.id} conectado`);

    // Envía la lista de productos al cliente
    const listaProductos = await administradorProductosSocket.getProducts();
    servidorSocket.emit("sendProducts", listaProductos);

    // Maneja el evento 'addProduct'
    socket.on("addProduct", async (product) => {
        await administradorProductosSocket.addProduct(product);
        console.log(administradorProductosSocket.addProduct(product));
        const listaProductosActualizada = await administradorProductosSocket.getProducts();
        servidorSocket.emit("sendProducts", listaProductosActualizada);
    });

    // Maneja el evento 'deleteProduct'
    socket.on("deleteProduct", async (id) => {
        console.log(id);
        await administradorProductosSocket.deleteProduct(id);
        const listaProductosActualizada = await administradorProductosSocket.getProducts({});
        servidorSocket.emit("sendProducts", listaProductosActualizada);
    });

    console.log("nuevo cliente conectado");

    // Maneja el evento 'authenticated'
    socket.on("authenticated", async (msg)=>{
        const messages = await chatModel.find();
        socket.emit("messageHistory", messages);
        socket.broadcast.emit("newUser",msg);
    });

    //recibir el mensaje del cliente
    socket.on("message",async(data)=>{
        console.log("data", data);
        const messageCreated = await chatModel.create(data);
        const messages = await chatModel.find();
        //cada vez que recibamos este mensaje, enviamos todos los mensajes actualizados a todos los clientes conectados
        servidorSocket.emit("messageHistory", messages);
    })
});

//routes
app.use(viewRouter);
app.use("/api/products", productsRoute);
app.use("/api/carts", cartsRoute);
app.use("/api/sessions", sessionsRouter);
app.use("/api/users", usersRouter);





