const socketClient = io();

const chatbox = document.getElementById("chatbox");
const chat = document.getElementById("messageLogs");

let user;

Swal.fire({
    title: "Bienvenido a Nuestra Chat",
    input: "text",
    text: "Ingresa un nombre de usuario para el chat",
    inputValidator: (value) => {
        if (!value) {
            return "El nombre de usuario es obligatorio"
        }
    },
    allowOutsideClick: false
}).then((result) => {
    user = result.value;
    socketClient.emit("authenticated", `usuario ${user} ha iniciado sesión`)
});

chatbox.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && chatbox.value.trim().length > 0) {
        socketClient.emit("message", { user: user, message: chatbox.value });
        chatbox.value = "";
    }
});

socketClient.on("messageHistory", (dataServer) => {
    const messageElmts = dataServer.map(item => 
        `<div class="toast fade show mb-1" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#007aff"></rect></svg>
                <strong class="me-auto">${item.user}</strong>
                <small>{{time}}</small>
            </div>
            <div class="toast-body">
                ${item.message}
            </div>
        </div>`
    ).join('');
    chat.innerHTML = messageElmts;
});

socketClient.on("newUser", (data) => {
    if (user) {
        Swal.fire({
            text: data,
            toast: true,
            position: "top-right"
        });
    }
});

function addToCart(productId) {
    const product = {
        _id: productId,
        quantity: 1
    };

    fetch('http://localhost:8080/api/carts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ products: [product] })
    })
    .then(response => {
        if (response.ok) {
            Swal.fire({
                position: 'bottom-end',
                icon: 'success',
                title: 'Producto Agregado al Carrito',
                showConfirmButton: false,
                timer: 1500,
                width: 300,
                height: 100
            })
        } else {
            throw new Error('Hubo un error al agregar el producto al carrito');
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
};
