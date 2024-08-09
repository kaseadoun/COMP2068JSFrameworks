// Middleware to authenticate user and what can be accessed
function AuthenticationMiddleware(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect("/login");
    }
}

module.exports = AuthenticationMiddleware;