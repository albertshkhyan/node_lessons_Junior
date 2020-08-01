const { Router } = require("express");
const User = require('../model/user');
const session = require("express-session");

const router = Router();

const bcrypt = require("bcryptjs");
// console.log('bcrypt', bcrypt);


router.get("/login", (req, res) => {
    res.render("auth/login", {
        isLogin: true,//use this key in navbasr.hbs -> this varible transfer on main.hbs
        title: "Login"
    });
});
//
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const candidate = await User.findOne({ email });

        if (candidate) {
            //compare passwords
            const areSame = await bcrypt.compare(password, candidate.password);//compare enetered password to db password
            // console.log('areSame', areSame);
            if (areSame) {
                req.session.isAuthenticated = true;
                req.session.user = candidate;
                req.session.save((err) => {//save session in database
                    if (err) throw err;
                    res.redirect('/');
                });
            }
            else {
                res.redirect('login#login');
            }
        }
        else {
            //if not find candidate in DB (email not match)
            res.redirect('login#register');//if want to autmat add prefix not set / in first /login
        }
    } catch (err) {
        console.log('err', err);
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        console.log('err', err);
        //remove session collectin in db
        if (err) { throw err };
        res.redirect('login');//if we add / - undersatnd as root
    })
});


router.post("/register", async (req, res) => {
    try {
        //# email must be unque
        const { email, name, password, repeat } = req.body;

        // Store hash in your password DB.
        const hash = await bcrypt.hash(password, 10);//Asynchronously generates a hash for the given string.
       /**
        *  "salt round" - controls how long it takes to compute a single BCrypt hash.
         Default hash round is 10.
        */

        // console.log('hash', hash);// $2a$10$6dppmOUfbTt1sJeBdsRo5.d0RG2iR/zDQHiEDdeuKozIVXO.Wy0w.

        //# check if user with email already exists?
        const candidate = await User.findOne({ "email": email });//if not find email return null
        // console.log('candidate check email ---------', candidate);//null || obj
        if (!candidate) {
            const user = new User({
                name,
                email,
                password: hash,
                cart: { items: [] }
            });
            await user.save();
            res.redirect('login#login');
        } else {
            //⚠ if a user was found, that means the user's email matches the entered email
            // res.status(409).json({
            //     error: "A user with that email has already registered. Please use a different email.."
            // });
            res.redirect('login#register');
        }

    } catch (err) {
        console.log('err', err);

    }
})

module.exports = router;