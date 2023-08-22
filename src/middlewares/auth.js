
export const checkUserAuth = (req, res, next) => {
    if (req.session?.userInfo) {
        next();
    } else {
        res.redirect("/login");
    }
};