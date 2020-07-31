//# so as not transfer req.session.isAuthenticated into template on our needed routes, we implement middleware which automaticly will transfer value of req.session.isAuthenticated to our needed templates.
module.exports = (req, res, next) => {
    res.locals.isAuth = req.session.isAuthenticated;
    next();
}//after create middlewate  we must switch this middleware with app.use