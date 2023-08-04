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
    // console.log("result", result);
    user = result.value;
    socketClient.emit("authenticated", `usuario ${user} ha iniciado sesión`)
    // console.log("user", user);
});

chatbox.addEventListener("keyup", (e) => {
    console.log(e.key);
    if (e.key === "Enter") {
        if (chatbox.value.trim().length > 0) {//corrobamos que el usuario no envie datos vacios
            socketClient.emit("message", { user: user, message: chatbox.value });
            chatbox.value = "";//borramos el campo
        }
    }
});

socketClient.on("messageHistory", (dataServer) => {
    let messageElmts = "";
    // console.log("dataServer", dataServer);
    dataServer.forEach(item => {
        messageElmts = messageElmts +
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
    });
    chat.innerHTML = messageElmts;
});

socketClient.on("newUser", (data) => {
    if (user) {
        //si ya el usuario esta autenticado, entonces puede recibir notificaciones
        Swal.fire({
            text: data,
            toast: true,
            position: "top-right"
        });
    }
});