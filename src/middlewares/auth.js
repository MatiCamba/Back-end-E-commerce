
export const checkUserAuth = (req, res, next) => {
    if (req.session?.userInfo) {
        next();
    } else {
        res.redirect("/login");
    }
};

export const showLoginView = (req, res, next) => {
    if (req.session?.userInfo) {
        res.redirect("/perfil");
    } else {
        next();
    }
};