//#ensure auth - обеспечить аутентификацию, routes protect

module.exports = (req, res, next) => {
    if(!req.session.isAuthenticated) {
        return res.redirect('/auth/login');
    }
    next();
}