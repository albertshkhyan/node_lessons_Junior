const { Router } = require("express");
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
    req.session.isAuthenticated = true;
    console.log('req.session.isAuthenticated', req.session.isAuthenticated);
    // console.log('req.session', req.session);
    res.redirect('/');
});


router.post("/register", (req, res) => {
    // console.log('req.body', req.body);
    res.redirect('auth/login#login');
});

router.get("/logout", (req, res) => {
    // req.session.isAuthenticated = false;
    ////OR we can use -> destroy
    // console.log('req.session.isAuthenticated-------------', req.session.isAuthenticated);
    req.session.destroy(() => {
        //this callback will invoke when will removed all data in session, remove req.sessoin object (remove all collection of session in database ?)
        // console.log('req.session REMOVE', req.session);//undefined
        res.redirect('/auth/login');
    })

    ////without destroy five error - ?
    // res.redirect('/auth/login');

});

module.exports = router;