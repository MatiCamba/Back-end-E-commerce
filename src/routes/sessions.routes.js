import { Router } from "express";
import passport from "passport";
import { SessionsController } from "../controllers/sessions.controller.js";

const router = Router();

// Registrar usuarios
router.post("/register", passport.authenticate("signupStrategy", {
    failureRedirect: "api/sessions/fail-Register"
}), SessionsController.renderRegister);

router.get("/fail-Register", SessionsController.renderRegisterFail);

// Loguear usuarios
router.post("/login", passport.authenticate("loginStrategy", {
    failureRedirect: "/api/sessions/fail-Login"
}), SessionsController.renderLogin);

router.get("/fail-Login", SessionsController.renderLoginFail);

// Cerrar sesion
router.get("/logout", SessionsController.renderLogout);

export {router as sessionRouter};