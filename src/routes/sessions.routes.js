import { Router } from "express";
import { usersService } from "../dao/managers/index.js";
import passport from "passport";

const router = Router();

// Registrar usuarios
router.post("/register", passport.authenticate("signupStrategy", {
    failureRedirect: "api/sessions/fail-Register"
}), async (req, res) => {
    
    try {
        const registerForm = req.body;
        console.log(registerForm);
        // verificar si el usuario ya esta registrado
        const user = await usersService.getUserByEmail(registerForm.email);
        //console.log(user);
        if(user){
            return res.render("register", { error: "El usuario ya esta registrado"});
        }
        const newUser = await usersService.saveUser(registerForm);
        return res.render("login", { message: "Usuario Creado con exito"});
    } catch (error) {
        return res.render("register", { error: error.message});
    }
});

router.get("/fail-Register", (req, res) => {
    res.send('<p>No se pudo loguear al usuario, <a href="/login">Regresar</a></p>');
});

// Loguear usuarios
router.post("/login", passport.authenticate("loginStrategy", {
    failureRedirect: "/api/sessions/fail-Login"
}), async (req, res) => {
    try {
        const loginForm = req.body;
        console.log(loginForm);
        // verificar si el usuario ya esta registrado
        const user = await usersService.getUserByEmail(loginForm.email);
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
});

router.get("/fail-Login", (req, res) => {
    res.send('<p>No se pudo loguear al usuario, <a href="/login">Regresar</a></p>');
});

// Cerrar sesion
router.get("/logout", (req, res) => {
    req.session.destroy(error=>{
        if(error) return res.render("profile", { user: req.session.user, error });
        res.redirect("/");
    });
});



export {router as sessionRouter};