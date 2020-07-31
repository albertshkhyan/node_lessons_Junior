const { Router } = require("express");
const User = require('../model/user');
const session = require("express-session");

const router = Router();


router.get("/login", (req, res) => {
    res.render("auth/login", {
        isLogin: true,//use this key in navbasr.hbs -> this varible transfer on main.hbs
        title: "Login"
    });
});


router.post("/login", async (req, res) => {
    // console.log('req.body', req.body);
    /* req.session
        {
            cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true }
        }
    */
    try {
        const user = await User.findById("5f1b5dcfe89c8224688e92d3");
        //NOTE -  If  we add in session some data, they data may not have time to fill.
        req.session.isAuthenticated = true;
        //res.session.user = user;//FUCK 😨😨😨😨
        req.session.user = user;
        //we wait before all data sets in session then we do redirect. || We must do redirect only when session will store in database
        req.session.save((err) => {//save session in database
            if (err)
                err;
            res.redirect('/');
        });
    } catch (err) {
        console.log('err', err);
    }
});


router.post("/register", (req, res) => {
    // console.log('req.body', req.body);
    res.redirect('auth/login#login');
});

router.get("/logout", (req, res) => {
    // req.session.isAuthenticated = false;
    ////OR we can use -> destroy
    // console.log('req.session', req.session);
    // console.log('req.session.isAuthenticated-------------', req.session.isAuthenticated);
    console.log('req.session.destroy', req.session.destroy);
    req.session.destroy((err) => {
        console.log('err', err);
        //remove session collectin in db
        if (err) { throw err };
        res.redirect('/auth/login');
    })
    // console.log('req.session.isAuthenticated-------------', req.session.isAuthenticated);

});

module.exports = router;