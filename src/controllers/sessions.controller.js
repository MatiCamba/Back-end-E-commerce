import { usersDao } from "../dao/managers/index.js";

export class SessionsController {
    // Método para manejar el registro de usuarios
    static renderRegister = async (req, res) => {
        try {
            // Recogemos los datos del formulario de registro
            const registerForm = req.body;
            //console.log(registerForm);

            // Verificamos si el usuario ya está registrado
            const user = await usersDao.getUserByEmail(registerForm.email);
            if(user){
                // Si el usuario ya está registrado, mostramos un error
                return res.render("register", { error: "El usuario ya esta registrado"});
            }

            // Si el usuario no está registrado, lo guardamos en la base de datos
            const newUser = await usersDao.saveUser(registerForm);

            // Redirigimos al usuario a la página de inicio de sesión con un mensaje de éxito
            return res.render("login", { message: "Usuario Creado con exito"});
        } catch (error) {
            // Si hay un error, lo mostramos en la página de registro
            return res.render("register", { error: error.message});
        }
    };

    // Método para manejar el fallo en el registro
    static renderRegisterFail = (req, res) => {
        res.send('<p>No se pudo loguear al usuario, <a href="/login">Regresar</a></p>');
    };

    // Método para manejar el inicio de sesión de usuarios
    static renderLogin = async (req, res) => {
        try {
            // Recogemos los datos del formulario de inicio de sesión
            const loginForm = req.body;
            //console.log(loginForm);

            // Verificamos si el usuario está registrado
            const user = await usersDao.getUserByEmail(loginForm.email);
            if(!user){
                // Si el usuario no está registrado, mostramos un error
                return res.render("login", { error: "El usuario no esta registrado"});
            }

            // Si el usuario está registrado, validamos la contraseña
            if(user.password === loginForm.password){
                console.log(user.password, loginForm.password);
                // Si la contraseña es correcta, creamos la sesión
                req.session.userInfo = {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email
                };
                console.log(req.session.userInfo);

                // Redirigimos al usuario a la página principal
                res.redirect("/");
            } else {
                // Si la contraseña no es correcta, mostramos un error
                return res.render("login", { error: "Credenciales Invalidas"});
            }
            
        } catch (error) {
            // Si hay un error, lo mostramos en la página de registro
            res.render("register", { error: error.message});
        }
    };

    // Método para manejar el fallo en el inicio de sesión
    static renderLoginFail = (req, res) => {
        // Mostramos un mensaje de error y un enlace para volver a la página de inicio de sesión
        res.send('<p>No se pudo loguear al usuario, <a href="/login">Regresar</a></p>');
    };

    // Método para manejar el cierre de sesión de usuarios
    static renderLogout = (req, res) => {
        // Destruimos la sesión
        req.session.destroy(error=>{
            // Si hay un error, lo mostramos en la página de perfil
            if(error) return res.render("profile", { user: req.session.user, error });

            // Si no hay errores, redirigimos al usuario a la página principal
            res.redirect("/");
        });
    };
};