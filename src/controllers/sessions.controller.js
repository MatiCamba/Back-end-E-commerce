import { usersDao } from "../dao/managers/index.js";
import passport from "passport";

export class SessionsController {
    static renderRegister = async (req, res) => {
        try {
            const registerForm = req.body;
            console.log(registerForm);
            // verificar si el usuario ya esta registrado
            const user = await usersDao.getUserByEmail(registerForm.email);
            //console.log(user);
            if(user){
                return res.render("register", { error: "El usuario ya esta registrado"});
            }
            const newUser = await usersDao.saveUser(registerForm);
            return res.render("login", { message: "Usuario Creado con exito"});
        } catch (error) {
            return res.render("register", { error: error.message});
        }
    };

    static renderRegisterFail = (req, res) => {
        res.send('<p>No se pudo loguear al usuario, <a href="/login">Regresar</a></p>');
    };

    static renderLogin = async (req, res) => {
        try {
            const loginForm = req.body;
            console.log(loginForm);
            // verificar si el usuario ya esta registrado
            const user = await usersDao.getUserByEmail(loginForm.email);
            //console.log(user);
            if(!user){
                return res.render("login", { error: "El usuario no esta registrado"});
            }
            // si el usuario existe, validar contraseña
            if(user.password === loginForm.password){
                //si la contraseña es correcta, creamos la ssesion
                req.session.userInfo = {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email
                };
                //console.log(req.session.user);
                res.redirect("/");
            } else {
                return res.render("login", { error: "Credenciales Invalidas"});
            }
            
        } catch (error) {
            res.render("register", { error: error.message});
        }
    };

    static renderLoginFail = (req, res) => {
        res.send('<p>No se pudo loguear al usuario, <a href="/login">Regresar</a></p>');
    };

    static renderLogout = (req, res) => {
        req.session.destroy(error=>{
            if(error) return res.render("profile", { user: req.session.user, error });
            res.redirect("/");
        });
    };
};