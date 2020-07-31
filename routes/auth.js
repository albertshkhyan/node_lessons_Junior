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
//
router.post("/login", async (req, res) => {
    try {
        const user = await User.findById("5f1b5dcfe89c8224688e92d3");
        req.session.user = user;
        req.session.isAuthenticated = true;//authentication - who are you
        //res.session.user = user;//FUCK 😨😨😨😨
        req.session.save((err) => {//save session in database
            if (err) throw  err;
            res.redirect('/');
        });
    } catch (err) {
        console.log('err', err);
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        console.log('err', err);
        //remove session collectin in db
        if (err) { throw err };
        res.redirect('/auth/login');
    })
});


router.post("/register", async (req, res) => {
    try {
        //# email must be unque
        const { email, name, password, repeat } = req.body;
        // console.log('req.body', req.body);
        /**
         * req.body {
            name: 'Alik',
            email: 'alikshkhyan@gmail.com',
            password: '123',
            repeat: '123'
            }
         */
        //# check if user with email already exists?
        const candidate = await User.findOne({ "email": email });//if not find email return null
        // console.log('candidate check email ---------', candidate);//null || obj
        if (!candidate) {
            const user = new User({
                name,
                email,
                password,
                cart: { items: [] }
            });
            await user.save();
            res.redirect('/auth/login#login');
        } else {
            //⚠ if a user was found, that means the user's email matches the entered email
            // res.status(409).json({
            //     error: "A user with that email has already registered. Please use a different email.."
            // });
            res.redirect('/auth/login#register');
        }

    } catch (err) {
        console.log('err', err);

    }
})

module.exports = router;