import passport from "passport";
import LocalStrategy from "passport-local";
import { createHash, isValidPassword } from "../utils.js";
import { UsersService } from "../services/users.service.js";

export const initializePassport = ()=>{
    // Configurar la estrategia de registro
    passport.use("signupStrategy", new LocalStrategy(
        {
            // Definir los campos para el nombre de usuario y contraseña
            usernameField:"email",
            passReqToCallback:true,
        },
        async (req, username, password, done)=>{
            try {
                const {first_name, Last_name, age} = req.body;
                // Verificar si el usuario ya está registrado
                const user = await UsersService.getUserByEmail(username);
                if(user){
                    return done(null, false)
                }
                let role = "user";
                if(username.endsWith("@coder.com")){
                    role = "admin";
                }
                const newUser = {
                    first_name:first_name,
                    email: username,
                    password:createHash(password),
                    role:role,
                    last_name:Last_name,
                    age:age,
                    avatar:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                const userCreated = await UsersService.saveUser(newUser);
                return done(null,userCreated)// En este punto, passport completa el proceso exitosamente
            } catch (error) {
                return done(error)
            }
        }
    ));

    // Configurar la estrategia de inicio de sesión
    passport.use("loginStrategy", new LocalStrategy(
        {
            usernameField:"email"
        },
        async(username, password, done)=>{
            try {
                // Verificar si el usuario está registrado
                const user = await UsersService.getUserByEmail(username);
                if(!user){
                    return done(null, false)
                }
                // Si el usuario existe, validar la contraseña
                if(isValidPassword(user,password)){
                    user.last_connection = Date.now();
                    await UsersService.updateUser(user._id,user);
                    return done(null,user);
                } else {
                    return done(null, false);
                }
            } catch (error) {
                return done(error);
            }
        }
    ));

    // Serialización y deserialización
    passport.serializeUser((user,done)=>{
        done(null,user._id);
    });

    passport.deserializeUser(async(id,done)=>{
        const user = await UsersService.getUserById(id);
        done(null,user) // req.user ---> sesiones req.sessions.user
    });
};