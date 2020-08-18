const User = require("../model/user");


//# NOTE -  resposiblity of this middleware - transform req.user to model, also we check user active or not with help session
//if we will use req.session.user without req.user, in this case we will have bug, because req.session.user not have method of module
module.exports = async (req, res, next) => {
    //req.user - is current active user 1`
    // console.log("call every time - MIDDLEWARE");
    if (!req.session.user) {
        // res.redirect("/auth/login");//give bug when
        return next();
    }
    //if in session we have user, we will transform that user to model user
    const user = await User.findById(req.session.user._id);
    req.user = user;//logged user
    next();
}